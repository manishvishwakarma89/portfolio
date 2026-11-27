// GitHub Projects Fetcher
import { config } from './config.js';
import { getFromStorage, setToStorage } from './utils.js';

// Repos to exclude from the Projects section
const EXCLUDED_REPOS = [
  'RCMOOCS-Learning-Management-System',
  'portfolio',
  'trakleadshare-app',
  'terraform-for-devops',
  'docker_debugger-app',
  'groovy-shared-libraries',
  'agentic-ai-for-devops',
  'manish-portfolio-website',
  'tracklead-serverapp'
];

/**
 * Fetch repositories from GitHub API
 */
export async function fetchGitHubProjects() {
  const cacheKey = `github-projects-${config.github.username}`;
  const cached = getFromStorage(cacheKey);

  // Return cached data if available and not expired
  if (cached && cached.timestamp && Date.now() - cached.timestamp < config.cache.projectsTtl) {
    return cached.data;
  }

  try {
    const url = `${config.github.apiUrl}/users/${config.github.username}/repos?sort=stars&order=desc&per_page=100`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    // Filter and format repositories
    const projects = repos
      .filter(repo => !repo.fork && !repo.archived && !EXCLUDED_REPOS.includes(repo.name)) // Exclude forks, archived, and specified repos
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description provided',
        url: repo.html_url,
        language: repo.language || 'Other',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated: new Date(repo.updated_at).toLocaleDateString(),
        topics: repo.topics || []
      }))
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 12); // Limit to 12 projects

    // Cache the data
    setToStorage(cacheKey, {
      data: projects,
      timestamp: Date.now()
    });

    return projects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return getFallbackProjects();
  }
}

/**
 * Fallback projects (in case API fails)
 */
function getFallbackProjects() {
  return [
    {
      id: 1,
      name: 'Three-Tier EcommerceAPP',
      description: 'End-to-end three-tier e-commerce application deployed on AWS EKS with Terraform-provisioned infrastructure (VPC, subnets, ALB, Auto Scaling). CI/CD pipeline with Jenkins and Argo CD. Kubernetes HPA for auto-scaling, Grafana/Prometheus monitoring, and 99.99% SLA.',
      url: 'https://github.com/manishvishwakarma89',
      language: 'JavaScript',
      stars: 0,
      forks: 0,
      updated: '2026',
      topics: ['aws', 'eks', 'terraform', 'docker', 'kubernetes', 'argocd']
    },
    {
      id: 2,
      name: 'AI-BankAPP',
      description: 'AI-powered banking application with intelligent features for modern financial services. Built with cloud-native architecture, containerized deployment, and automated CI/CD pipelines.',
      url: 'https://github.com/manishvishwakarma89/AI-BankAPP',
      language: 'HTML',
      stars: 2,
      forks: 2,
      updated: '2024',
      topics: ['banking', 'ai', 'cloud']
    },
    {
      id: 3,
      name: 'LensGuard App',
      description: 'Application security and vulnerability assessment tool. Scans and monitors application infrastructure for security threats, providing real-time alerts and compliance reporting.',
      url: 'https://github.com/manishvishwakarma89',
      language: 'Python',
      stars: 0,
      forks: 0,
      updated: '2026',
      topics: ['security', 'devops', 'monitoring']
    }
  ];
}

/**
 * Get language color
 */
export function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'Python': '#3776ab',
    'Java': '#007396',
    'Go': '#00add8',
    'Rust': '#ce422b',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
    'Dockerfile': '#384d54',
    'YAML': '#cb171e',
    'JSON': '#000000',
    'Other': '#858585'
  };
  return colors[language] || colors['Other'];
}

/**
 * Get language icon (emoji)
 */
export function getLanguageIcon(language) {
  const icons = {
    'JavaScript': '🟨',
    'TypeScript': '🔷',
    'Python': '🐍',
    'Java': '☕',
    'Go': '🐹',
    'Rust': '🦀',
    'HTML': '🌐',
    'CSS': '🎨',
    'Shell': '💻',
    'Dockerfile': '🐳',
    'YAML': '📝',
    'JSON': '📋',
    'Other': '📦'
  };
  return icons[language] || icons['Other'];
}

export default {
  fetchGitHubProjects,
  getLanguageColor,
  getLanguageIcon
};
