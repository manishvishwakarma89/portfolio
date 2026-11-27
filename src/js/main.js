// Main Application Entry Point
import { config } from './config.js';
import { isWebGLAvailable, getFromStorage, setToStorage, isMobile } from './utils.js';
import { initHero3D, destroyHero3D } from './hero-3d.js';
import { initInteractions, initGSAPAnimations, initCounters } from './animations.js';
import { fetchGitHubProjects, getLanguageIcon, getLanguageColor } from './projects.js';

/**
 * Initialize the entire application
 */
async function init() {
  console.log('🚀 Initializing Portfolio...');

  try {
    // Initialize theme
    initTheme();

    // Initialize interactions (smooth scroll, hover effects)
    initInteractions();

    // Initialize 3D hero section
    if (isWebGLAvailable() && !isMobile()) {
      initHero3D();
    }

    // Load and render projects from GitHub
    await loadProjects();

    // Load and render skills
    loadSkills();

    // Load and render experience
    loadExperience();

    // Initialize GSAP scroll animations
    await initGSAPAnimations();

    // Initialize stat counters
    await initCounters();

    // Initialize navigation
    initNavigation();

    console.log('✅ Portfolio initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing portfolio:', error);
  }
}

/**
 * Initialize theme switcher
 */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Get saved theme or use system preference
  const savedTheme = getFromStorage(config.theme.storageKey);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  htmlElement.setAttribute('data-theme', initialTheme);
  updateThemeIcon(initialTheme);

  // Theme toggle listener
  themeToggle?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    setToStorage(config.theme.storageKey, newTheme);
    updateThemeIcon(newTheme);
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const theme = e.matches ? 'dark' : 'light';
    if (!getFromStorage(config.theme.storageKey)) {
      htmlElement.setAttribute('data-theme', theme);
      updateThemeIcon(theme);
    }
  });
}

/**
 * Update theme icon
 */
function updateThemeIcon(theme) {
  const icon = document.querySelector('.theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/**
 * Load and render GitHub projects
 */
async function loadProjects() {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;

  projectsGrid.innerHTML = '<div class="loading-skeleton">Loading repositories...</div>';

  try {
    const projects = await fetchGitHubProjects();

    projectsGrid.innerHTML = '';

    if (projects.length === 0) {
      projectsGrid.innerHTML = '<div class="loading-skeleton">No projects found</div>';
      return;
    }

    projects.forEach((project, index) => {
      const card = createProjectCard(project, index);
      projectsGrid.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading projects:', error);
    projectsGrid.innerHTML = '<div class="loading-skeleton">Error loading projects</div>';
  }
}

/**
 * Create a project card element with premium animations
 */
function createProjectCard(project, index) {
  const card = document.createElement('div');
  card.className = 'project-card premium-card stagger-item-premium glass-effect';
  card.style.setProperty('--stagger-index', index);

  const languageIcon = getLanguageIcon(project.language);
  const languageColor = getLanguageColor(project.language);

  card.innerHTML = `
    <div class="project-header" style="background: linear-gradient(135deg, ${languageColor}dd, ${languageColor}99)">
      <h3 class="project-name animate-reveal-text">${escapeHtml(project.name)}</h3>
      <p class="project-language">${languageIcon} ${project.language}</p>
    </div>
    <div class="project-body">
      <p class="project-description">${escapeHtml(project.description)}</p>
      <div class="project-stats">
        <div class="project-stat">
          <span class="project-stat-icon">⭐</span>
          <span>${project.stars}</span>
        </div>
        <div class="project-stat">
          <span class="project-stat-icon">🍴</span>
          <span>${project.forks}</span>
        </div>
        <div class="project-stat">
          <span class="project-stat-icon">📅</span>
          <span>${project.updated}</span>
        </div>
      </div>
      <a href="${project.url}" class="project-link premium-link" target="_blank" rel="noopener noreferrer">
        View on GitHub
        <span class="project-link-icon">→</span>
      </a>
    </div>
  `;

  return card;
}

/**
 * Load and render skills
 */
function loadSkills() {
  const skillsGrid = document.getElementById('skillsGrid');
  if (!skillsGrid) return;

  const skills = {
    'Cloud Platforms': ['AWS', 'Azure', 'Google Cloud', 'DigitalOcean'],
    'DevOps Tools': ['Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins'],
    'Languages': ['Python', 'Bash', 'JavaScript', 'Go', 'Java'],
    'Databases': ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
    'CI/CD': ['GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI'],
    'Monitoring': ['Prometheus', 'Grafana', 'ELK Stack', 'New Relic']
  };

  skillsGrid.innerHTML = '';

  Object.entries(skills).forEach(([ category, items ], index) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skill-category stagger-item-premium premium-card glass-effect';
    categoryDiv.style.setProperty('--stagger-index', index);

    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'skill-category-title premium-text-gradient';
    categoryTitle.textContent = `${getCategoryIcon(category)} ${category}`;

    const tagContainer = document.createElement('div');
    tagContainer.className = 'skill-tags';

    items.forEach((skill, skillIndex) => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag premium-hover-lift';
      tag.style.setProperty('--skill-index', skillIndex);
      tag.style.animationDelay = `${skillIndex * 0.05}s`;
      tag.textContent = skill;
      tagContainer.appendChild(tag);
    });

    categoryDiv.appendChild(categoryTitle);
    categoryDiv.appendChild(tagContainer);
    skillsGrid.appendChild(categoryDiv);
  });
}

/**
 * Load and render experience
 */
function loadExperience() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  const experiences = [
    {
      title: 'DevOps Engineer',
      company: 'Tech Company XYZ',
      period: '2023 - Present',
      description: 'Leading cloud infrastructure initiatives, managing Kubernetes clusters, and implementing CI/CD pipelines'
    },
    {
      title: 'Cloud Engineer',
      company: 'Cloud Solutions Ltd',
      period: '2022 - 2023',
      description: 'Architected and deployed scalable cloud solutions on AWS, managed infrastructure as code using Terraform'
    },
    {
      title: 'Systems Administrator',
      company: 'IT Services Inc',
      period: '2021 - 2022',
      description: 'Managed on-premises and cloud infrastructure, automated deployment processes, improved system reliability'
    },
    {
      title: 'Junior IT Support',
      company: 'Tech Startup',
      period: '2020 - 2021',
      description: 'Provided technical support, managed servers, and contributed to infrastructure improvements'
    }
  ];

  timeline.innerHTML = '';

  experiences.forEach((exp, index) => {
    const item = document.createElement('div');
    item.className = 'timeline-item scroll-reveal';
    if (index % 2 === 0) {
      item.classList.add('scroll-reveal-left');
    } else {
      item.classList.add('scroll-reveal-right');
    }

    item.innerHTML = `
      <div class="timeline-marker"></div>
      <div class="timeline-content premium-card glass-effect">
        <div class="timeline-date">${exp.period}</div>
        <h3 class="timeline-title premium-text-gradient">${exp.title}</h3>
        <p class="timeline-company">${exp.company}</p>
        <p class="timeline-description">${exp.description}</p>
      </div>
    `;

    timeline.appendChild(item);
  });
}

/**
 * Initialize navigation
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      link.classList.add('active');
    });
  });

  // Update active link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Get category icon
 */
function getCategoryIcon(category) {
  const icons = {
    'Cloud Platforms': '☁️',
    'DevOps Tools': '⚙️',
    'Languages': '💻',
    'Databases': '🗄️',
    'CI/CD': '🚀',
    'Monitoring': '📊'
  };
  return icons[category] || '📌';
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Handle page unload
 */
window.addEventListener('beforeunload', () => {
  destroyHero3D();
});

/**
 * Initialize app when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export default init;
