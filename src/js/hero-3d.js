// Three.js Hero 3D Setup
import * as THREE from 'three';
import { isMobile, prefersReducedMotion, throttle } from './utils.js';

let scene, camera, renderer, particles;
let mouse = { x: 0, y: 0 };
let targetMouse = { x: 0, y: 0 };
let animationFrameId;

/**
 * Initialize Three.js scene
 */
export function initHero3D() {
  const container = document.getElementById('heroCanvas');
  if (!container) return;

  // Scene setup
  scene = new THREE.Scene();
  scene.background = null; // Transparent background
  scene.fog = new THREE.Fog(0x000000, 1000, 3000);

  // Camera setup
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 100;

  // Renderer setup
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  container.appendChild(renderer.domElement);

  // Create particle system
  createParticleSystem();

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x007bff, 1, 500);
  pointLight.position.set(50, 50, 50);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // Event listeners
  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onWindowResize);

  // Start animation
  animate();
}

/**
 * Create particle system
 */
function createParticleSystem() {
  const particleCount = isMobile() ? 300 : 800;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 400;
    positions[i + 1] = (Math.random() - 0.5) * 400;
    positions[i + 2] = (Math.random() - 0.5) * 400;

    // Color gradient from primary to accent
    const hue = Math.random() * 0.3 + 0.4; // 40-70% hue range
    const color = new THREE.Color().setHSL(hue, 1, 0.5);
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;

    scales[i / 3] = Math.random() * 2 + 1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8
  });

  particles = new THREE.Points(geometry, material);
  particles.castShadow = true;
  scene.add(particles);
}

/**
 * Animation loop
 */
function animate() {
  animationFrameId = requestAnimationFrame(animate);

  // Smooth mouse follow
  targetMouse.x += (mouse.x - targetMouse.x) * 0.1;
  targetMouse.y += (mouse.y - targetMouse.y) * 0.1;

  // Rotate particles
  if (particles) {
    particles.rotation.x += 0.0001;
    particles.rotation.y += 0.0003;

    // Mouse interaction
    particles.rotation.y += (targetMouse.x - particles.rotation.y) * 0.001;
    particles.rotation.x += (targetMouse.y - particles.rotation.x) * 0.001;

    // Update particle positions for subtle floating effect
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(Date.now() * 0.0001 + i) * 0.1;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }

  renderer.render(scene, camera);
}

/**
 * Handle mouse move
 */
function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

/**
 * Handle window resize
 */
const onWindowResize = throttle(() => {
  const container = document.getElementById('heroCanvas');
  if (!container || !camera || !renderer) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}, 300);

/**
 * Destroy Three.js scene
 */
export function destroyHero3D() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  document.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('resize', onWindowResize);

  if (renderer) {
    renderer.dispose();
    const container = document.getElementById('heroCanvas');
    if (container && renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement);
    }
  }

  if (scene) {
    scene.traverse(child => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }
}

export default {
  initHero3D,
  destroyHero3D
};
