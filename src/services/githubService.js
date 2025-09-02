// GitHub API Service
const GITHUB_USERNAME = 'Dipk2003'; // Your GitHub username
const GITHUB_API_BASE = 'https://api.github.com';

// Rate limiting cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Fetch user profile data
export const fetchGitHubProfile = async () => {
  const cacheKey = 'github-profile';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
    if (!response.ok) throw new Error('Failed to fetch profile');
    
    const data = await response.json();
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
};

// Fetch repositories with detailed information
export const fetchGitHubRepositories = async () => {
  const cacheKey = 'github-repos';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );
    if (!response.ok) throw new Error('Failed to fetch repositories');
    
    const repos = await response.json();
    
    // Filter out forks and add additional data
    const filteredRepos = repos
      .filter(repo => !repo.fork && !repo.archived)
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description available',
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        size: repo.size,
        updated_at: repo.updated_at,
        created_at: repo.created_at,
        html_url: repo.html_url,
        clone_url: repo.clone_url,
        topics: repo.topics || [],
        private: repo.private,
        license: repo.license?.name,
        default_branch: repo.default_branch,
        open_issues: repo.open_issues_count,
        watchers: repo.watchers_count
      }));

    setCachedData(cacheKey, filteredRepos);
    return filteredRepos;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};

// Fetch recent commits across all repositories
export const fetchRecentCommits = async (limit = 10) => {
  const cacheKey = `github-commits-${limit}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const repos = await fetchGitHubRepositories();
    const commitPromises = repos.slice(0, 10).map(async (repo) => {
      try {
        const response = await fetch(
          `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=5`
        );
        if (!response.ok) return [];
        
        const commits = await response.json();
        return commits.map(commit => ({
          repo: repo.name,
          message: commit.commit.message,
          date: commit.commit.author.date,
          sha: commit.sha.substring(0, 7),
          url: commit.html_url,
          author: commit.commit.author.name
        }));
      } catch (error) {
        console.error(`Error fetching commits for ${repo.name}:`, error);
        return [];
      }
    });

    const allCommits = (await Promise.all(commitPromises))
      .flat()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);

    setCachedData(cacheKey, allCommits);
    return allCommits;
  } catch (error) {
    console.error('Error fetching recent commits:', error);
    return [];
  }
};

// Fetch GitHub contribution stats
export const fetchContributionStats = async () => {
  const cacheKey = 'github-contributions';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    // Note: GitHub doesn't provide contribution graph data via API
    // We'll calculate from recent activity
    const repos = await fetchGitHubRepositories();
    const commits = await fetchRecentCommits(100);
    
    const stats = {
      totalRepos: repos.length,
      totalStars: repos.reduce((sum, repo) => sum + repo.stars, 0),
      totalForks: repos.reduce((sum, repo) => sum + repo.forks, 0),
      totalCommits: commits.length,
      languages: [...new Set(repos.map(repo => repo.language).filter(Boolean))],
      recentActivity: commits.slice(0, 7), // Last 7 commits
      mostStarredRepo: repos.sort((a, b) => b.stars - a.stars)[0],
      newestRepo: repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
    };

    setCachedData(cacheKey, stats);
    return stats;
  } catch (error) {
    console.error('Error fetching contribution stats:', error);
    return null;
  }
};

// Fetch repository languages statistics
export const fetchLanguageStats = async () => {
  const cacheKey = 'github-languages';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const repos = await fetchGitHubRepositories();
    const languageCount = {};
    
    repos.forEach(repo => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });

    const sortedLanguages = Object.entries(languageCount)
      .sort(([,a], [,b]) => b - a)
      .map(([language, count]) => ({
        language,
        count,
        percentage: Math.round((count / repos.length) * 100)
      }));

    setCachedData(cacheKey, sortedLanguages);
    return sortedLanguages;
  } catch (error) {
    console.error('Error fetching language stats:', error);
    return [];
  }
};

// Fetch README content for a repository
export const fetchRepositoryReadme = async (repoName) => {
  const cacheKey = `github-readme-${repoName}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/readme`
    );
    if (!response.ok) throw new Error('README not found');
    
    const data = await response.json();
    // Decode base64 content
    const readmeContent = atob(data.content);
    
    setCachedData(cacheKey, readmeContent);
    return readmeContent;
  } catch (error) {
    console.error(`Error fetching README for ${repoName}:`, error);
    return null;
  }
};

// Fetch repository with README content
export const fetchRepositoryWithDetails = async (repoName) => {
  const cacheKey = `github-repo-details-${repoName}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const [repoResponse, readmeContent] = await Promise.all([
      fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`),
      fetchRepositoryReadme(repoName)
    ]);
    
    if (!repoResponse.ok) throw new Error('Repository not found');
    
    const repo = await repoResponse.json();
    const details = {
      ...repo,
      readme: readmeContent,
      features: extractFeaturesFromReadme(readmeContent),
      technologies: extractTechnologiesFromReadme(readmeContent),
      projectType: determineProjectType(repo, readmeContent)
    };
    
    setCachedData(cacheKey, details);
    return details;
  } catch (error) {
    console.error(`Error fetching repository details for ${repoName}:`, error);
    return null;
  }
};

// Extract features from README content
const extractFeaturesFromReadme = (readme) => {
  if (!readme) return [];
  
  const features = [];
  const lines = readme.split('\n');
  
  // Look for feature lists (lines starting with -, *, or numbered)
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.match(/^[-*+]\s+/) || trimmed.match(/^\d+\.\s+/)) {
      const feature = trimmed.replace(/^[-*+\d\.\s]+/, '').trim();
      if (feature.length > 10 && feature.length < 100) {
        features.push(feature);
      }
    }
  });
  
  return features.slice(0, 6); // Limit to 6 features
};

// Extract technologies from README
const extractTechnologiesFromReadme = (readme) => {
  if (!readme) return [];
  
  const techKeywords = [
    'React', 'Node.js', 'JavaScript', 'TypeScript', 'Java', 'Spring Boot',
    'MongoDB', 'MySQL', 'PostgreSQL', 'Express', 'Next.js', 'Tailwind',
    'CSS', 'HTML', 'Python', 'Django', 'Flask', 'Vue.js', 'Angular',
    'Docker', 'AWS', 'Firebase', 'Vercel', 'Netlify'
  ];
  
  const foundTechs = [];
  const lowerReadme = readme.toLowerCase();
  
  techKeywords.forEach(tech => {
    if (lowerReadme.includes(tech.toLowerCase())) {
      foundTechs.push(tech);
    }
  });
  
  return [...new Set(foundTechs)]; // Remove duplicates
};

// Determine project type from repository data
const determineProjectType = (repo, readme) => {
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  const readmeContent = (readme || '').toLowerCase();
  
  if (name.includes('portfolio') || desc.includes('portfolio')) return 'Portfolio';
  if (name.includes('api') || desc.includes('api')) return 'Backend API';
  if (name.includes('app') || desc.includes('application')) return 'Full-Stack App';
  if (readmeContent.includes('frontend') || readmeContent.includes('react')) return 'Frontend';
  if (readmeContent.includes('backend') || readmeContent.includes('server')) return 'Backend';
  if (name.includes('bot') || desc.includes('bot')) return 'Bot/Automation';
  if (name.includes('game') || desc.includes('game')) return 'Game';
  
  return 'Web Project';
};

// Fetch featured projects with details
export const fetchFeaturedProjects = async () => {
  const cacheKey = 'github-featured-projects';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const repos = await fetchGitHubRepositories();
    
    // Select featured repositories (top by stars, recent activity, or manually selected)
    const featuredRepoNames = [
      'file-hider-app',
      'voting-system', 
      'video-meet-app',
      '3d-portfolio',
      'spring-boot-api'
    ];
    
    const featuredRepos = repos.filter(repo => 
      featuredRepoNames.includes(repo.name) || repo.stars > 5
    ).slice(0, 6);
    
    // Fetch detailed information for each featured project
    const projectPromises = featuredRepos.map(async (repo) => {
      const details = await fetchRepositoryWithDetails(repo.name);
      return details || repo;
    });
    
    const projects = await Promise.all(projectPromises);
    
    setCachedData(cacheKey, projects);
    return projects;
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
};

export default {
  fetchGitHubProfile,
  fetchGitHubRepositories,
  fetchRecentCommits,
  fetchContributionStats,
  fetchLanguageStats,
  fetchRepositoryReadme,
  fetchRepositoryWithDetails,
  fetchFeaturedProjects
};
