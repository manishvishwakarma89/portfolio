# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Portfolio Website for Manish Kumar** — A stunning, high-performance portfolio showcasing a Cloud & DevOps Engineer with 3+ years of IT experience and 1.5+ years in Cloud/DevOps. The site features:
- Interactive 3D particle hero section (Three.js)
- Real-time GitHub project showcase (GitHub API)
- Smooth scroll animations (GSAP)
- Fully responsive design optimized for mobile
- GitHub Pages deployment with CI/CD automation
- Lighthouse performance target: 90+

**Key Goal:** Demonstrate technical excellence through a performant, beautiful, and interactive web presence.

## Development Setup

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+ or yarn
- Git
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone repository
git clone https://github.com/manishvishwakarma89/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Common Commands

### Development
```bash
npm run dev          # Start local dev server (Vite) at http://localhost:5173
npm run dev:open     # Dev server + auto-open in browser
```

### Build & Deploy
```bash
npm run build        # Create optimized production build in dist/
npm run preview      # Preview production build locally
npm run deploy       # Manual: build + push to gh-pages (usually automated via GitHub Actions)
```

### Code Quality
```bash
npm run lint         # Check for code issues (future: add ESLint)
npm run format       # Format code (future: add Prettier)
```

### Testing
```bash
npm run test         # Run tests (future: add Vitest)
npm run test:watch   # Watch mode
```

## Project Architecture

### High-Level Structure

**Technology Stack:**
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Build:** Vite (fast builds, optimized output)
- **Animations:** GSAP (scroll effects), Three.js (3D hero), CSS animations
- **Data:** JSON (projects, skills, experience)
- **Deployment:** GitHub Pages via GitHub Actions
- **Performance:** Lazy-load heavy libraries, optimize images, minify bundles

**Core Sections:**
1. **Hero** — Full-viewport 3D particle system (Three.js) + intro text
2. **About** — Professional summary, key stats, highlights
3. **Experience** — Timeline of roles and achievements
4. **Skills** — Organized by category (Cloud, DevOps, Languages, etc.)
5. **Projects** — All GitHub repositories fetched via GitHub API, sortable
6. **Resume** — Downloadable PDF link
7. **Footer** — Social links (GitHub, LinkedIn) + contact info

**Animation Strategy:**
- Three.js: Hero section only (particle system responding to mouse)
- GSAP ScrollTrigger: Scroll-based reveals (About, Skills, Projects sections)
- CSS animations: Micro-interactions (button hover, card effects, transitions)
- Lazy load GSAP/Three.js to avoid blocking initial page load

### Directory Organization

```
portfolio/
├── src/
│   ├── index.html              # Main HTML entry point
│   ├── styles/
│   │   ├── main.css            # Global styles, CSS variables, theme
│   │   ├── hero.css            # Hero section (3D background)
│   │   ├── sections.css        # About, Skills, Projects, Experience sections
│   │   ├── animations.css      # Animation classes and keyframes
│   │   ├── responsive.css      # Mobile-first media queries
│   │   └── variables.css       # CSS custom properties (colors, spacing, timing)
│   ├── js/
│   │   ├── main.js             # App initialization, event listeners
│   │   ├── hero-3d.js          # Three.js setup and particle system
│   │   ├── animations.js       # GSAP ScrollTrigger instances
│   │   ├── projects.js         # GitHub API fetch and render
│   │   ├── interactions.js     # Hover effects, cursor tracking, gestures
│   │   ├── utils.js            # Helpers (debounce, throttle, viewport detection)
│   │   └── config.js           # Configuration (GitHub username, colors, etc.)
│   └── assets/
│       ├── resume.pdf          # Downloadable resume
│       └── data.json           # Static content (About, Skills, Experience)
├── public/                      # Static files (copied to dist/)
│   ├── favicon.ico
│   └── robots.txt
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions: build + deploy to gh-pages
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies and scripts
├── CLAUDE.md                    # This file
├── README.md                    # User-facing project info
└── .claude/
    └── settings.json           # Claude Code preferences
```

## Key Files & Concepts

### Critical Entry Points

**src/index.html**
- Semantic HTML5 structure (`<header>`, `<main>`, `<section>`, `<footer>`)
- Meta tags for SEO and social sharing
- Minimal initial JS (async loading of GSAP/Three.js)
- Link to `main.css` and `main.js` at end of body

**src/js/main.js**
- Initialization on DOM ready
- Lazy-load animation libraries when needed
- Register scroll/resize listeners
- Handle mobile detection and reduced-motion preferences

**src/styles/main.css**
- CSS custom properties (`:root`) for theming
- Normalize/reset styles
- Base typography and spacing
- Mobile-first responsive design

### Key Patterns & Design Decisions

**Three.js Hero Section** (`src/js/hero-3d.js`)
- Initialize scene on page load, NOT immediately (defer until visible)
- Throttle resize/mouse events for performance
- Provide fallback for WebGL-unavailable browsers (show static image/SVG)
- Keep particle count reasonable (~500-1000) for mobile
- Target 60 FPS with RAF loop

**GSAP ScrollTrigger** (`src/js/animations.js`)
- Register triggers for each section (About, Skills, Projects)
- Use `autoAlpha` for opacity + visibility combo
- Stagger animations for visual hierarchy
- Use `scrub` sparingly (CPU intensive)
- Clean up on page unload to prevent memory leaks

**GitHub API Integration** (`src/js/projects.js`)
- Fetch `/users/manishvishwakarma89/repos` on page load
- Sort by stars descending
- Cache result in `localStorage` with 1-hour TTL to avoid rate limits
- Fallback: show hardcoded projects if API fails
- Display: name, description, language, stars, forks, GitHub link

**CSS Variables System** (`src/styles/variables.css`)
- Color palette: primary, secondary, accent, background, text
- Spacing scale: `--space-xs` to `--space-xl`
- Timing: `--transition-fast`, `--transition-normal`, `--transition-slow`
- Dark/light mode via `data-theme` attribute on `<html>`

### Performance Considerations

**Bundle Size Targets:**
- HTML: < 50kb
- CSS: < 150kb (critical path inlined, rest deferred)
- JS (before lazy load): < 100kb
- Three.js: ~150kb (lazy-loaded)
- GSAP: ~40kb (lazy-loaded)
- Images: Optimized, WebP with fallback, lazy-loaded
- **Total initial load: < 300kb gzipped**

**Optimization Techniques:**
- Vite handles minification and tree-shaking
- CSS split: critical (hero + above-fold) inlined, rest in separate file
- JS modules: only load animations when needed (IntersectionObserver)
- Images: responsive sizes, lazy loading attribute
- Fonts: Web-safe or Google Fonts with `font-display: swap`

**Monitoring:**
- Use Lighthouse CI in GitHub Actions
- Monitor Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
- Test locally: `npm run preview` + Chrome DevTools Lighthouse

## Important Notes

### Mobile-First Development
- Write mobile styles first, then `@media (min-width: ...)` for larger screens
- Touch-friendly targets: minimum 44px × 44px
- Test on real devices, not just Chrome DevTools emulation
- Disable heavy 3D effects on mobile if performance degrades

### Accessibility & UX
- Semantic HTML for screen readers
- Respect `prefers-reduced-motion` media query (disable animations)
- Sufficient color contrast (WCAG AA minimum)
- Keyboard navigation support (focus states, tab order)
- Skip-to-content link (optional but recommended)

### Browser Compatibility
- Target modern browsers (Chrome/Edge 90+, Firefox 88+, Safari 14+)
- Provide fallback for unsupported features (WebGL, CSS Grid)
- Test in Safari iOS and Chrome Android

### Git Workflow
- Create feature branches: `git checkout -b feature/hero-animations`
- Commit often with clear messages
- Push to `main` → GitHub Actions auto-deploys
- Never commit: `.env`, `dist/`, `node_modules/`

### Useful Resources
- Three.js documentation: https://threejs.org/docs/
- GSAP ScrollTrigger: https://greensock.com/scrolltrigger/
- Vite guide: https://vitejs.dev/guide/
- GitHub Pages deployment: https://docs.github.com/en/pages/

### Local Development Tips
- Use `npm run dev` for fast feedback loop
- Open DevTools console for debugging (no console errors in production!)
- Test animations at different scroll speeds
- Monitor performance: DevTools > Performance > Record > Scroll
- Use Chrome DevTools Lighthouse for final checks before commit

### Deployment Checklist
Before pushing to `main`:
1. ✅ `npm run build` completes without errors
2. ✅ `npm run preview` works locally
3. ✅ Lighthouse audit: 90+ in Performance
4. ✅ No console errors or warnings
5. ✅ Mobile responsive tested (iOS + Android)
6. ✅ All links functional
7. ✅ Animations smooth at 60 FPS
8. ✅ GitHub Actions workflow succeeds
