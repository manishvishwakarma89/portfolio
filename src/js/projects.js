// GitHub Projects Fetcher
import { config } from './config.js';
import { getFromStorage, setToStorage } from './utils.js';

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
      .filter(repo => !repo.fork && !repo.archived) // Exclude forks and archived repos
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
      name: 'AI-BankAPP',
      description: 'Banking application with AI-powered features',
      url: 'https://github.com/manishvishwakarma89/AI-BankAPP',
      language: 'HTML',
      stars: 2,
      forks: 2,
      updated: '2024-01-15',
      topics: ['banking', 'ai']
    },
    {
      id: 2,
      name: 'RCMOOCS-Learning-Management-System',
      description: 'Learning management system for online courses',
      url: 'https://github.com/manishvishwakarma89/RCMOOCS-Learning-Management-System',
      language: 'HTML',
      stars: 1,
      forks: 0,
      updated: '2024-01-10',
      topics: ['lms', 'education']
    },
    {
      id: 3,
      name: 'simple-django-app',
      description: 'Simple Django web application',
      url: 'https://github.com/manishvishwakarma89/simple-django-app',
      language: 'Python',
      stars: 0,
      forks: 0,
      updated: '2024-01-05',
      topics: ['django', 'python', 'web']
    },
    {
      id: 4,
      name: 'Devops_UtilitiesAPI',
      description: 'DevOps utilities and automation API',
      url: 'https://github.com/manishvishwakarma89/Devops_UtilitiesAPI',
      language: 'Python',
      stars: 0,
      forks: 0,
      updated: '2024-01-01',
      topics: ['devops', 'automation', 'api']
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
