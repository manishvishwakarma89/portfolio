// Utility Functions

/**
 * Debounce function - delays execution until after wait time
 * @param {Function} func - Function to debounce
 * @param {Number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function - limits execution frequency
 * @param {Function} func - Function to throttle
 * @param {Number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Lazy load images
 * @param {String} selector - CSS selector for images
 */
export function lazyLoadImages(selector = 'img[data-src]') {
  const images = document.querySelectorAll(selector);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    });

    images.forEach(img => observer.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element
 * @returns {Boolean} True if element is visible
 */
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.bottom >= 0 &&
    rect.right >= 0
  );
}

/**
 * Format number with commas
 * @param {Number} num - Number to format
 * @returns {String} Formatted number
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Get element offset from top
 * @param {Element} element - DOM element
 * @returns {Number} Offset in pixels
 */
export function getOffsetTop(element) {
  let offsetTop = 0;
  do {
    if (!isNaN(element.offsetTop)) {
      offsetTop += element.offsetTop;
    }
    element = element.offsetParent;
  } while (element);
  return offsetTop;
}

/**
 * Smooth scroll to element
 * @param {String|Element} target - Element or selector
 * @param {Number} offset - Offset in pixels
 */
export function smoothScrollTo(target, offset = 70) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;

  const targetPosition = getOffsetTop(element) - offset;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

/**
 * Clone a deep object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if device prefers reduced motion
 * @returns {Boolean} True if reduced motion is preferred
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if device is mobile
 * @returns {Boolean} True if device is mobile/touch
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.matchMedia('(max-width: 768px)').matches;
}

/**
 * Check if WebGL is available
 * @returns {Boolean} True if WebGL is supported
 */
export function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
              (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

/**
 * Wait for specific time
 * @param {Number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
export function wait(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get local storage with fallback
 * @param {String} key - Storage key
 * @param {*} defaultValue - Default value if key not found
 * @returns {*} Stored value or default
 */
export function getFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Error reading from localStorage: ${key}`, e);
    return defaultValue;
  }
}

/**
 * Set local storage with fallback
 * @param {String} key - Storage key
 * @param {*} value - Value to store
 * @returns {Boolean} True if successful
 */
export function setToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`Error writing to localStorage: ${key}`, e);
    return false;
  }
}

/**
 * Remove item from local storage
 * @param {String} key - Storage key
 */
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`Error removing from localStorage: ${key}`, e);
  }
}

export default {
  debounce,
  throttle,
  lazyLoadImages,
  isInViewport,
  formatNumber,
  getOffsetTop,
  smoothScrollTo,
  deepClone,
  prefersReducedMotion,
  isMobile,
  isWebGLAvailable,
  wait,
  getFromStorage,
  setToStorage,
  removeFromStorage
};
