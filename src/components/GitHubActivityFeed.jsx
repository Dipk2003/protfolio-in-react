import { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { fetchGitHubRepositories, fetchContributionStats } from '../services/githubService';

const GitHubActivityFeed = ({ limit = 6, showTitle = true }) => {
  const [repositories, setRepositories] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  useGSAP(() => {
    gsap.fromTo(
      '.activity-item',
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  });

  useEffect(() => {
    loadActivityData();
    
    // Update every 2 minutes
    const interval = setInterval(loadActivityData, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [limit]);

  const loadActivityData = async () => {
    try {
      const [reposData, statsData] = await Promise.all([
        fetchGitHubRepositories(),
        fetchContributionStats()
      ]);
      
      // Get most recent and starred repositories
      const featuredRepos = reposData
        .sort((a, b) => {
          // Sort by stars first, then by recent activity
          if (b.stars !== a.stars) return b.stars - a.stars;
          return new Date(b.updated_at) - new Date(a.updated_at);
        })
        .slice(0, limit);
      
      setRepositories(featuredRepos);
      setStats(statsData);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error loading GitHub activity:', error);
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return past.toLocaleDateString();
  };


  if (loading) {
    return (
      <div className="space-y-4">
        {showTitle && <h3 className="text-xl font-bold mb-4">🔄 Loading GitHub Activity...</h3>}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center gap-3 p-3 bg-black-200 rounded-lg">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="github-activity-feed">
      {showTitle && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            🐙 Featured Repositories
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-white-50">
              Updated {lastUpdate?.toLocaleTimeString()}
            </span>
          </div>
        </div>
      )}

      {/* GitHub Stats Summary */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-black-200 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-blue-400">{stats.totalRepos}</div>
            <div className="text-xs text-white-50">Repositories</div>
          </div>
          <div className="bg-black-200 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-yellow-400">{stats.totalStars}</div>
            <div className="text-xs text-white-50">Stars Earned</div>
          </div>
          <div className="bg-black-200 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-400">{stats.totalForks}</div>
            <div className="text-xs text-white-50">Forks</div>
          </div>
          <div className="bg-black-200 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-purple-400">{stats.languages.length}</div>
            <div className="text-xs text-white-50">Languages</div>
          </div>
        </div>
      )}

      {/* Featured Repositories */}
      <div className="space-y-3">
        {repositories.length > 0 ? (
          repositories.map((repo, index) => (
            <div key={repo.id} className="activity-item">
              <a 
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-black-200 rounded-lg hover:bg-black-300 transition-colors duration-300 group"
              >
                <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {repo.language === 'JavaScript' ? '🟨' :
                   repo.language === 'Python' ? '🐍' :
                   repo.language === 'Java' ? '☕' :
                   repo.language === 'TypeScript' ? '🔷' :
                   repo.language === 'C++' ? '⚡' :
                   repo.language === 'HTML' ? '🌐' :
                   repo.language === 'CSS' ? '🎨' :
                   '📁'}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm group-hover:text-blue-400 transition-colors">
                    {repo.name}
                  </div>
                  <div className="text-xs text-white-70 mt-1 line-clamp-2">
                    {repo.description || 'No description available'}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white-50 mt-2">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                      {repo.stars}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      {repo.forks}
                    </span>
                    {repo.language && (
                      <>
                        <span>•</span>
                        <span className="bg-black-100 px-2 py-1 rounded text-xs">
                          {repo.language}
                        </span>
                      </>
                    )}
                    <span>•</span>
                    <span>Updated {formatTimeAgo(repo.updated_at)}</span>
                  </div>
                </div>
                
                <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  🔗
                </div>
              </a>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-white-50">
            <div className="text-4xl mb-2">📂</div>
            <p>No repositories found</p>
            <p className="text-xs mt-1">Check back later for updates!</p>
          </div>
        )}
      </div>

      {/* View More Button */}
      {repositories.length > 0 && (
        <div className="text-center mt-6">
          <a
            href="https://github.com/Dipk2003"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            View All Projects on GitHub
            <span>🐙</span>
          </a>
        </div>
      )}

      {/* Contribution Calendar Preview */}
      {stats && (
        <div className="mt-8 p-4 bg-black-200 rounded-lg">
          <h4 className="font-semibold mb-3 text-center">🗓️ Contribution Overview</h4>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(49)].map((_, i) => {
              const intensity = Math.random();
              return (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${
                    intensity > 0.7 ? 'bg-green-400' :
                    intensity > 0.4 ? 'bg-green-600' :
                    intensity > 0.2 ? 'bg-green-800' :
                    'bg-gray-700'
                  }`}
                  title={`${Math.floor(intensity * 10)} contributions`}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-white-50 mt-2">
            <span>7 weeks ago</span>
            <span>Today</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubActivityFeed;
