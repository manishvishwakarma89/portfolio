# Portfolio Website

A stunning, high-performance portfolio website for Manish Kumar - Cloud & DevOps Engineer, built with vanilla HTML/CSS/JavaScript, Three.js animations, and deployed on GitHub Pages.

## ✨ Features

- **Interactive 3D Hero Section** — Particle system built with Three.js, responsive to mouse movement
- **Smooth Scroll Animations** — GSAP ScrollTrigger for reveal animations and scroll effects
- **GitHub Integration** — Real-time display of repositories from GitHub API
- **Dark/Light Theme** — Toggle between themes with persistent storage
- **Fully Responsive** — Mobile-first design optimized for all devices
- **Performance Optimized** — Vite build, lazy loading, minified assets
- **Accessibility First** — Semantic HTML, WCAG compliant, keyboard navigation
- **GitHub Pages Ready** — Automatic CI/CD deployment via GitHub Actions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+
- Git

### Installation

```bash
# Clone the repository
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

The development server will start at `http://localhost:5173`

## 📦 Available Scripts

```bash
npm run dev          # Start local development server
npm run dev:open     # Dev server + auto-open in browser
npm run build        # Create optimized production build
npm run preview      # Preview production build locally
npm run deploy       # Manual build and deploy (usually automated)
```

## 🏗️ Project Structure

```
portfolio/
├── src/
│   ├── index.html              # Main HTML
│   ├── styles/                 # CSS files
│   │   ├── variables.css       # Design system
│   │   ├── main.css            # Global styles
│   │   ├── hero.css            # Hero section
│   │   ├── sections.css        # Component styles
│   │   ├── animations.css      # Animation classes
│   │   └── responsive.css      # Media queries
│   ├── js/                     # JavaScript modules
│   │   ├── main.js             # App entry point
│   │   ├── hero-3d.js          # Three.js setup
│   │   ├── animations.js       # GSAP animations
│   │   ├── projects.js         # GitHub API integration
│   │   ├── utils.js            # Utility functions
│   │   └── config.js           # Configuration
│   └── assets/                 # Static assets
├── public/                     # Public assets
├── .github/workflows/          # CI/CD automation
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies
└── CLAUDE.md                  # Development guide
```

## 🎨 Customization

### Update Personal Information

Edit `src/js/main.js` to update:
- Experience timeline
- Skills categories
- Resume download link

### Modify Colors

Update CSS variables in `src/styles/variables.css`:
```css
--color-primary: #007bff;
--color-accent: #00d4ff;
/* ... more variables */
```

### Toggle Features

In `src/js/main.js`, you can:
- Enable/disable 3D hero on mobile
- Customize animation timing
- Adjust GitHub API cache duration

## 🔧 Configuration

Edit `src/js/config.js` to configure:
```javascript
github: {
  username: 'your-username',
  apiUrl: 'https://api.github.com'
},
social: {
  github: 'https://github.com/your-profile',
  linkedin: 'https://linkedin.com/in/your-profile',
  email: 'your-email@example.com'
}
```

## 📊 Performance

Target metrics (Lighthouse):
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 90+
- **SEO:** 100

Current Web Vitals:
- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **FID (First Input Delay):** < 100ms

## 🚀 Deployment

### Automatic Deployment (GitHub Actions)

1. Push to `main` branch
2. GitHub Actions automatically:
   - Installs dependencies
   - Builds the project
   - Runs Lighthouse audit
   - Deploys to GitHub Pages

### Manual Deployment

```bash
npm run build
npm run deploy
```

### Custom Domain

1. Add `CNAME` file to `public/` with your domain
2. Configure DNS to point to GitHub Pages
3. Update repository settings → Pages → Custom domain

## 🌐 Deployment URL

**Live Site:** https://manishvishwakarma89.github.io

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Build Tool:** Vite
- **3D Graphics:** Three.js
- **Animations:** GSAP + ScrollTrigger
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions

## ♿ Accessibility

- Semantic HTML5 elements
- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- Screen reader friendly
- Color contrast > 4.5:1
- Respects `prefers-reduced-motion`

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize for your own use!

## 📝 License

MIT License - feel free to use this project as a template for your own portfolio

## 👤 Author

**Manish Kumar**
- GitHub: [@manishvishwakarma89](https://github.com/manishvishwakarma89)
- LinkedIn: [@mkkumar88](https://linkedin.com/in/mkkumar88)

## 🙏 Acknowledgments

- Three.js for 3D graphics
- GSAP for smooth animations
- Vite for fast builds
- GitHub Pages for hosting

## 📚 Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Docs](https://greensock.com/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [GitHub Pages Help](https://docs.github.com/en/pages/)

---

**Last Updated:** November 2024
