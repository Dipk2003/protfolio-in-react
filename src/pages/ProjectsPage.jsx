import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { fetchGitHubRepositories, fetchRepositoryReadme } from "../services/githubService";

gsap.registerPlugin(ScrollTrigger);

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, stars: 0, forks: 0, languages: 0 });

  useEffect(() => {
    loadProjectData();
  }, []);

  const loadProjectData = async () => {
    try {
      setLoading(true);
      const repositories = await fetchGitHubRepositories();
      
      // Filter out forked repos and private repos, get main projects
      const mainProjects = repositories
        .filter(repo => !repo.fork && !repo.private)
        .sort((a, b) => b.stars - a.stars) // Sort by stars
        .slice(0, 8); // Limit to top 8 projects
      
      // Fetch README details for each project
      const projectsWithDetails = await Promise.all(
        mainProjects.map(async (repo) => {
          try {
            const readmeData = await fetchRepositoryReadme(repo.owner.login, repo.name);
            return {
              id: repo.id,
              title: repo.name,
              description: repo.description || readmeData.description || 'No description available',
              technologies: readmeData.technologies || [repo.language].filter(Boolean),
              features: readmeData.features || ['Modern web application', 'Responsive design', 'Clean code architecture'],
              liveLink: repo.homepage || repo.html_url,
              sourceLink: repo.html_url,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              language: repo.language,
              updated: repo.updated_at,
              topics: repo.topics || [],
              projectType: readmeData.projectType || 'Web Application'
            };
          } catch (error) {
            console.warn(`Failed to fetch README for ${repo.name}:`, error);
            return {
              id: repo.id,
              title: repo.name,
              description: repo.description || 'No description available',
              technologies: [repo.language].filter(Boolean),
              features: ['Modern web application', 'Responsive design', 'Clean code architecture'],
              liveLink: repo.homepage || repo.html_url,
              sourceLink: repo.html_url,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              language: repo.language,
              updated: repo.updated_at,
              topics: repo.topics || [],
              projectType: 'Web Application'
            };
          }
        })
      );
      
      setProjects(projectsWithDetails);
      
      // Calculate stats
      const totalStars = projectsWithDetails.reduce((sum, project) => sum + project.stars, 0);
      const totalForks = projectsWithDetails.reduce((sum, project) => sum + project.forks, 0);
      const uniqueLanguages = [...new Set(projectsWithDetails.map(p => p.language).filter(Boolean))].length;
      
      setStats({
        total: projectsWithDetails.length,
        stars: totalStars,
        forks: totalForks,
        languages: uniqueLanguages
      });
      
    } catch (error) {
      console.error('Error loading projects:', error);
      // Fallback to empty state
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getProjectIcon = (projectType, language) => {
    if (projectType?.toLowerCase().includes('portfolio')) return '💼';
    if (projectType?.toLowerCase().includes('web')) return '🌐';
    if (projectType?.toLowerCase().includes('mobile')) return '📱';
    if (projectType?.toLowerCase().includes('api')) return '🔗';
    if (projectType?.toLowerCase().includes('tool')) return '🛠️';
    
    // Fallback to language icons
    switch (language?.toLowerCase()) {
      case 'javascript': return '🟨';
      case 'typescript': return '🔷';
      case 'python': return '🐍';
      case 'java': return '☕';
      case 'c++': return '⚡';
      case 'html': return '🌐';
      case 'css': return '🎨';
      default: return '💻';
    }
  };

  useGSAP(() => {
    gsap.fromTo(
      ".projects-hero",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      ".project-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        }
      }
    );
  });

  return (
    <div className="min-h-screen bg-black-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        <div className="projects-hero text-center z-10 px-5">
          <div className="text-8xl mb-8">🚀</div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl md:text-2xl text-white-50 mb-8 max-w-3xl mx-auto">
            Explore my portfolio of innovative projects, from secure backend applications to interactive frontend experiences.
          </p>
          <button
            onClick={() => document.getElementById('projects-content').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            View Projects 💻
          </button>
        </div>
      </section>

      {/* Projects Content */}
      <section id="projects-content" className="section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          {/* Projects Overview */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
            <p className="text-xl text-white-50 max-w-4xl mx-auto">
              Each project represents a unique challenge I've tackled, showcasing different aspects of my technical skills and problem-solving abilities.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="space-y-8">
              <div className="text-center">
                <div className="animate-spin text-6xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold mb-2">Loading Projects...</h3>
                <p className="text-white-50">Fetching real project data from GitHub</p>
              </div>
              
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="card-border rounded-2xl overflow-hidden">
                      <div className="grid lg:grid-cols-2 gap-0">
                        <div className="h-64 bg-gray-600"></div>
                        <div className="p-8 space-y-4">
                          <div className="h-8 bg-gray-600 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-600 rounded w-full"></div>
                          <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                          <div className="flex gap-2">
                            <div className="h-6 bg-gray-600 rounded w-20"></div>
                            <div className="h-6 bg-gray-600 rounded w-16"></div>
                            <div className="h-6 bg-gray-600 rounded w-24"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Projects Grid */}
              <div className="projects-grid space-y-12 mb-16">
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <div key={project.id || index} className="project-card">
                      <div className="card-border rounded-2xl overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-0">
                          {/* Project Image */}
                          <div className="relative h-64 lg:h-auto">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-6xl mb-4">
                                  {getProjectIcon(project.projectType, project.language)}
                                </div>
                                <h3 className="text-2xl font-bold">{project.title}</h3>
                                <div className="text-sm text-white-70 mt-2">{project.projectType}</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Project Details */}
                          <div className="p-8">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-3xl font-bold">{project.title}</h3>
                              <div className="text-right">
                                <div className="text-white-50 text-sm">Updated {formatTimeAgo(project.updated)}</div>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="flex items-center gap-1 text-xs">
                                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                    {project.stars}
                                  </span>
                                  <span className="flex items-center gap-1 text-xs">
                                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                    {project.forks}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-white-50 mb-6 text-lg">{project.description}</p>
                            
                            {/* Technologies */}
                            <div className="mb-6">
                              <h4 className="font-semibold mb-3 text-blue-400">🛠️ Technologies Used</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                  <span key={techIndex} className="bg-black-200 px-3 py-1 rounded-full text-sm">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {/* Topics */}
                            {project.topics.length > 0 && (
                              <div className="mb-6">
                                <h4 className="font-semibold mb-3 text-green-400">🏷️ Project Topics</h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.topics.slice(0, 6).map((topic, topicIndex) => (
                                    <span key={topicIndex} className="bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full text-sm text-green-400">
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Features */}
                            <div className="mb-8">
                              <h4 className="font-semibold mb-3 text-purple-400">✨ Key Features</h4>
                              <ul className="space-y-2">
                                {project.features.map((feature, featureIndex) => (
                                  <li key={featureIndex} className="text-white-50 flex items-start">
                                    <span className="text-green-400 mr-2">•</span>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-4">
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
                              >
                                {project.liveLink.includes('github.com') ? 'View Project' : 'Live Demo'} 🌐
                              </a>
                              <a
                                href={project.sourceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
                              >
                                Source Code 📝
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📂</div>
                    <h3 className="text-2xl font-bold mb-2">No Projects Found</h3>
                    <p className="text-white-50">Unable to load project data. Please try again later.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Project Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-black-200 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-white-50">Projects Built</div>
            </div>
            <div className="bg-black-200 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold">{stats.stars}</div>
              <div className="text-white-50">Stars Earned</div>
            </div>
            <div className="bg-black-200 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🍿️</div>
              <div className="text-2xl font-bold">{stats.forks}</div>
              <div className="text-white-50">Project Forks</div>
            </div>
            <div className="bg-black-200 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">💻</div>
              <div className="text-2xl font-bold">{stats.languages}</div>
              <div className="text-white-50">Languages Used</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center card-border rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-6">Have a Project in Mind?</h2>
            <p className="text-xl text-white-50 mb-8 max-w-2xl mx-auto">
              I'm always excited to work on new challenges and innovative projects. Let's discuss how we can bring your ideas to life!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                Start a Project 🚀
              </Link>
              <Link
                to="/skills"
                className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                View My Skills 💻
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
