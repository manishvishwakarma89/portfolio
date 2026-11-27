// Projects - Hardcoded featured projects only
import { config } from './config.js';

/**
 * Return only the 3 featured projects
 */
export async function fetchGitHubProjects() {
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
