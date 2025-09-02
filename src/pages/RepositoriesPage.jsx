import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { fetchGitHubRepositories, fetchContributionStats } from "../services/githubService";
import analytics from "../services/analyticsService";

gsap.registerPlugin(ScrollTrigger);

const RepositoriesPage = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useGSAP(() => {
    gsap.fromTo(
      ".repos-hero",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      ".repo-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".repos-grid",
          start: "top 80%",
        }
      }
    );
  });

  // Load real GitHub data
  useEffect(() => {
    const loadRepositories = async () => {
      setLoading(true);
      
      try {
        // Track page view
        analytics.trackPageView('GitHub Repositories', '/repositories');
        
        // Fetch real GitHub data
        const repoData = await fetchGitHubRepositories();
        setRepos(repoData);
        
        // Track successful data load
        analytics.trackEvent('github_data_loaded', {
          repoCount: repoData.length,
          loadTime: Date.now()
        });
        
      } catch (error) {
        console.error('Error loading GitHub repositories:', error);
        
        // Fallback to mock data if API fails
        const mockRepos = [
          {
            id: 1,
            name: "3d-portfolio",
            description: "Interactive 3D portfolio website built with React.js, Three.js, and GSAP animations",
            language: "JavaScript",
            stars: 15,
            forks: 3,
            size: 2048,
            updated_at: "2024-12-20",
            html_url: "https://github.com/Dipk2003/3d-portfolio",
            topics: ["react", "threejs", "gsap", "portfolio"],
            private: false
          },
          {
            id: 2,
            name: "file-hider-app",
            description: "Secure file storage application with AES-256 encryption and email authentication",
            language: "Java",
            stars: 8,
            forks: 2,
            size: 1024,
            updated_at: "2024-12-15",
            html_url: "https://github.com/Dipk2003/file-hider-app",
            topics: ["java", "encryption", "security", "mysql"],
            private: false
          }
        ];
        setRepos(mockRepos);
      } finally {
        setLoading(false);
      }
    };

    loadRepositories();
  }, []);

  const languages = ["all", ...new Set(repos.map(repo => repo.language))];

  const filteredRepos = repos.filter(repo => {
    const matchesFilter = filter === "all" || repo.language === filter;
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repo.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: "#f7df1e",
      TypeScript: "#3178c6", 
      Java: "#ed8b00",
      Python: "#3776ab",
      HTML: "#e34c26",
      CSS: "#1572b6"
    };
    return colors[language] || "#6b7280";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const totalStats = {
    repos: repos.length,
    stars: repos.reduce((sum, repo) => sum + repo.stars, 0),
    forks: repos.reduce((sum, repo) => sum + repo.forks, 0),
    languages: new Set(repos.map(repo => repo.language)).size
  };

  return (
    <div className="min-h-screen bg-black-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        <div className="repos-hero text-center z-10 px-5">
          <div className="text-8xl mb-8">🐙</div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            GitHub Repositories
          </h1>
          <p className="text-xl md:text-2xl text-white-50 mb-8 max-w-3xl mx-auto">
            Explore my open-source projects and contributions. Each repository showcases different aspects of my development skills.
          </p>
          <button
            onClick={() => document.getElementById('repos-content').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Explore Repositories 📂
          </button>
        </div>
      </section>

      {/* Repositories Content */}
      <section id="repos-content" className="section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          {/* GitHub Stats */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">GitHub Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-black-200 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">📂</div>
                <div className="text-2xl font-bold">{totalStats.repos}</div>
                <div className="text-white-50">Repositories</div>
              </div>
              <div className="bg-black-200 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold">{totalStats.stars}</div>
                <div className="text-white-50">Total Stars</div>
              </div>
              <div className="bg-black-200 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🍴</div>
                <div className="text-2xl font-bold">{totalStats.forks}</div>
                <div className="text-white-50">Total Forks</div>
              </div>
              <div className="bg-black-200 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">💻</div>
                <div className="text-2xl font-bold">{totalStats.languages}</div>
                <div className="text-white-50">Languages</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Search */}
              <div className="w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-80 p-3 bg-black-200 border border-white/10 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                />
              </div>
              
              {/* Language Filter */}
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setFilter(lang)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      filter === lang
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'border border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    {lang === "all" ? "All" : lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Repositories Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">⏳</div>
              <p className="text-xl text-white-50">Loading repositories...</p>
            </div>
          ) : (
            <div className="repos-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredRepos.map((repo) => (
                <div key={repo.id} className="repo-card card-border rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold">{repo.name}</h3>
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span className="text-white-50 text-sm">{repo.language}</span>
                    </div>
                  </div>
                  
                  <p className="text-white-50 mb-4 text-sm leading-relaxed">{repo.description}</p>
                  
                  {/* Topics */}
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics.slice(0, 3).map((topic, index) => (
                        <span key={index} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="text-white-50 text-xs">+{repo.topics.length - 3} more</span>
                      )}
                    </div>
                  )}
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-white-50">
                    <div className="flex items-center gap-4">
                      <span>⭐ {repo.stars}</span>
                      <span>🍴 {repo.forks}</span>
                      <span>📦 {Math.round(repo.size / 1024)}KB</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white-50 text-xs">Updated {formatDate(repo.updated_at)}</span>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform duration-300"
                    >
                      View Code 🔗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && filteredRepos.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-4">No repositories found</h3>
              <p className="text-white-50">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* GitHub Profile Link */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Want to See More?</h2>
            <p className="text-xl text-white-50 mb-8 max-w-2xl mx-auto">
              Visit my GitHub profile to explore all my repositories, contributions, and coding activity!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/Dipk2003"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                Visit GitHub Profile 🐙
              </a>
              <Link
                to="/projects"
                className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                View Live Projects 🚀
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RepositoriesPage;
