// Configuration
export const config = {
  // GitHub
  github: {
    username: 'manishvishwakarma89',
    apiUrl: 'https://api.github.com'
  },

  // Social Links
  social: {
    github: 'https://github.com/manishvishwakarma89',
    linkedin: 'https://linkedin.com/in/mkkumar88',
    email: 'manish@example.com'
  },

  // Animation
  animation: {
    scrollTriggerOffset: '100px 100%',
    parallaxIntensity: 0.5,
    scrollScrub: 0.6
  },

  // Theme
  theme: {
    default: 'light', // 'light' or 'dark'
    storageKey: 'portfolio-theme'
  },

  // Performance
  performance: {
    lazyLoadThreshold: '50px',
    debounceDelay: 100,
    throttleDelay: 100
  },

  // Cache
  cache: {
    projectsTtl: 3600000 // 1 hour in milliseconds
  }
};

export default config;
