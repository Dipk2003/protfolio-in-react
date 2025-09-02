import { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CodeEditor from '../components/CodeEditor';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import SkillsGalaxy from '../components/SkillsGalaxy';
import analytics from '../services/analyticsService';

gsap.registerPlugin(ScrollTrigger);

const InteractivePage = () => {
  const [activeFeature, setActiveFeature] = useState('codeEditor');

  useEffect(() => {
    analytics.trackPageView('Interactive Features', '/interactive');
  }, []);

  const features = {
    codeEditor: {
      name: 'Live Code Editor',
      icon: '💻',
      description: 'Write, edit, and run code in multiple languages with Monaco Editor',
      component: CodeEditor
    },
    algorithmVisualizer: {
      name: 'Algorithm Visualizer',
      icon: '🎯',
      description: 'Watch sorting and pathfinding algorithms come to life',
      component: AlgorithmVisualizer
    },
    skillsGalaxy: {
      name: '3D Skills Galaxy',
      icon: '🌌',
      description: 'Explore technical skills in an interactive 3D space',
      component: SkillsGalaxy
    }
  };

  useGSAP(() => {
    gsap.fromTo(
      '.interactive-hero',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      '.feature-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
        }
      }
    );
  });

  const ActiveComponent = features[activeFeature].component;

  return (
    <div className="min-h-screen bg-black-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 sm:w-2 h-1 sm:h-2 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        <div className="interactive-hero text-center z-10 px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-4xl sm:text-6xl md:text-8xl mb-6 sm:mb-8 animate-bounce">⚡</div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent leading-tight">
            <span className="hidden sm:inline">Interactive Features</span>
            <span className="sm:hidden">Interactive Components</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-white-50 mb-6 sm:mb-8 max-w-4xl mx-auto px-2">
            Experience cutting-edge interactive components that showcase advanced technical capabilities and user engagement.
          </p>
          <button
            onClick={() => document.getElementById('features-content').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Explore Features</span>
            <span className="sm:hidden">Explore</span> 🚀
          </button>
        </div>
      </section>

      {/* Features Content */}
      <section id="features-content" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          
          {/* Features Overview */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="hidden sm:inline">Advanced Interactive Components</span>
              <span className="sm:hidden">Interactive Components</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white-50 max-w-4xl mx-auto px-2">
              Each feature demonstrates different aspects of modern web development, from real-time code execution to 3D visualizations.
            </p>
          </div>

          {/* Feature Navigation */}
          <div className="features-section mb-8 sm:mb-12">
            <div className="flex justify-center">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-2 bg-black-200 rounded-xl w-full sm:w-auto">
                {Object.entries(features).map(([key, feature]) => (
                  <button
                    key={key}
                    onClick={() => setActiveFeature(key)}
                    className={`px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${
                      activeFeature === key
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'text-white-50 hover:text-white hover:bg-black-300'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl">{feature.icon}</span>
                    <div className="text-left flex-1">
                      <div className="font-semibold">{feature.name}</div>
                      <div className="text-xs opacity-80 hidden sm:block">{feature.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Feature */}
          <div className="feature-card mb-8 sm:mb-12 md:mb-16">
            <div className="card-border rounded-xl sm:rounded-2xl p-3 sm:p-6">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4">{features[activeFeature].icon}</div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{features[activeFeature].name}</h3>
                <p className="text-sm sm:text-base text-white-50 px-2">{features[activeFeature].description}</p>
              </div>
              
              <ActiveComponent />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            <div className="feature-card card-border rounded-xl p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎨</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Modern UI/UX</h3>
              <p className="text-sm sm:text-base text-white-50">Beautiful interfaces with smooth animations and intuitive interactions</p>
            </div>
            
            <div className="feature-card card-border rounded-xl p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Real-time Processing</h3>
              <p className="text-sm sm:text-base text-white-50">Live code execution and algorithm visualization with instant feedback</p>
            </div>
            
            <div className="feature-card card-border rounded-xl p-4 sm:p-6 text-center sm:col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌐</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Cross-platform</h3>
              <p className="text-sm sm:text-base text-white-50">Responsive design that works seamlessly across all devices</p>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="feature-card card-border rounded-xl p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">🛠️ Powered By</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">⚛️</div>
                <div className="font-semibold text-sm sm:text-base">React</div>
                <div className="text-xs sm:text-sm text-white-50">Component Architecture</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🎭</div>
                <div className="font-semibold text-sm sm:text-base">GSAP</div>
                <div className="text-xs sm:text-sm text-white-50">Smooth Animations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🎨</div>
                <div className="font-semibold text-sm sm:text-base">Tailwind CSS</div>
                <div className="text-xs sm:text-sm text-white-50">Utility-first Styling</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🌌</div>
                <div className="font-semibold text-sm sm:text-base">Three.js</div>
                <div className="text-xs sm:text-sm text-white-50">3D Graphics</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 sm:mt-12 md:mt-16">
            <div className="card-border rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Build Something Amazing?</h2>
              <p className="text-base sm:text-lg md:text-xl text-white-50 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                These interactive features showcase the kind of engaging, professional applications I can build for your projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Start Your Project</span>
                  <span className="sm:hidden">Start Project</span> 🚀
                </a>
                <a
                  href="/projects"
                  className="border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">View More Projects</span>
                  <span className="sm:hidden">View Projects</span> 💻
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InteractivePage;
