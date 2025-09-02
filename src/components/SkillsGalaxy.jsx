import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import '../styles/SkillsGalaxy.css';

const SkillsGalaxy = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const skills = [
    { name: 'React', level: 90, color: '#61dafb', category: 'Frontend', icon: '⚛️' },
    { name: 'JavaScript', level: 85, color: '#f7df1e', category: 'Language', icon: '🟨' },
    { name: 'Node.js', level: 80, color: '#68a063', category: 'Backend', icon: '💚' },
    { name: 'Java', level: 88, color: '#ed8b00', category: 'Language', icon: '☕' },
    { name: 'Spring Boot', level: 75, color: '#6db33f', category: 'Framework', icon: '🍃' },
    { name: 'MongoDB', level: 70, color: '#4db33d', category: 'Database', icon: '🍃' },
    { name: 'MySQL', level: 85, color: '#00758f', category: 'Database', icon: '🐬' },
    { name: 'Python', level: 75, color: '#3776ab', category: 'Language', icon: '🐍' },
    { name: 'HTML5', level: 95, color: '#e34f26', category: 'Frontend', icon: '🌐' },
    { name: 'CSS3', level: 90, color: '#1572b6', category: 'Frontend', icon: '🎨' },
    { name: 'Git', level: 80, color: '#f05032', category: 'Tool', icon: '📋' },
    { name: 'Docker', level: 65, color: '#2496ed', category: 'Tool', icon: '🐳' },
    { name: 'AWS', level: 60, color: '#ff9900', category: 'Cloud', icon: '☁️' },
    { name: 'TypeScript', level: 70, color: '#3178c6', category: 'Language', icon: '🔷' },
    { name: 'Tailwind CSS', level: 85, color: '#06b6d4', category: 'Framework', icon: '💨' }
  ];

  useGSAP(() => {
    gsap.fromTo(
      '.galaxy-section',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize 3D Scene (using CSS 3D transforms for simplicity)
    initializeGalaxy();
    setIsLoaded(true);

    return () => {
      // Cleanup
      if (sceneRef.current) {
        sceneRef.current = null;
      }
    };
  }, []);

  const initializeGalaxy = () => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing nodes
    container.innerHTML = '';

    // Create skill nodes
    skills.forEach((skill, index) => {
      const skillNode = document.createElement('div');
      skillNode.className = 'skill-node';
      skillNode.innerHTML = `
        <div class="skill-sphere" data-skill="${skill.name}">
          <div class="skill-icon">${skill.icon}</div>
          <div class="skill-name">${skill.name}</div>
          <div class="skill-level">${skill.level}%</div>
        </div>
      `;
      
      // Position in 3D space (circular arrangement)
      const angle = (index / skills.length) * Math.PI * 2;
      const isMobile = window.innerWidth < 768;
      const radius = isMobile ? 
        (100 + (skill.level / 100) * 60) : // Smaller radius on mobile
        (150 + (skill.level / 100) * 100); // Dynamic radius based on skill level
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * (isMobile ? 60 : 100); // Random height variation

      skillNode.style.cssText = `
        position: absolute;
        transform: translate3d(${x}px, ${y}px, ${z}px);
        cursor: pointer;
        transition: all 0.3s ease;
      `;

      skillNode.addEventListener('click', () => {
        setSelectedSkill(skill);
      });

      container.appendChild(skillNode);
    });

    // Start rotation animation
    let rotation = 0;
    const animate = () => {
      rotation += 0.5;
      container.style.transform = `rotateY(${rotation}deg) rotateX(10deg)`;
      requestAnimationFrame(animate);
    };
    animate();
  };

  const SkillDetails = ({ skill }) => (
    <div className="skill-details bg-black-200 rounded-lg p-6 mt-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl">{skill.icon}</div>
        <div>
          <h3 className="text-2xl font-bold">{skill.name}</h3>
          <p className="text-white-50">{skill.category}</p>
        </div>
        <button
          onClick={() => setSelectedSkill(null)}
          className="ml-auto text-white-50 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span>Proficiency Level</span>
            <span className="font-bold">{skill.level}%</span>
          </div>
          <div className="w-full bg-black-300 rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-1000"
              style={{ 
                width: `${skill.level}%`,
                background: `linear-gradient(to right, ${skill.color}88, ${skill.color})`
              }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-black-300 rounded p-3">
            <div className="font-semibold text-blue-400">Experience</div>
            <div>{Math.floor(skill.level / 25)} years</div>
          </div>
          <div className="bg-black-300 rounded p-3">
            <div className="font-semibold text-green-400">Projects</div>
            <div>{Math.floor(skill.level / 15)} completed</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="skills-galaxy bg-black-100 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="galaxy-section bg-black-200 p-4 sm:p-6 border-b border-white/10">
        <div className="text-center">
          <h2 className="text-xl sm:text-3xl font-bold flex items-center justify-center gap-2 mb-2">
            🌌 <span className="hidden sm:inline">3D Skills Galaxy</span>
            <span className="sm:hidden">Skills Galaxy</span>
          </h2>
          <p className="text-sm sm:text-base text-white-50">Explore my technical skills in an interactive 3D space</p>
        </div>
      </div>

      {/* 3D Visualization */}
      <div className="galaxy-section relative">
        <div className="h-64 sm:h-96 bg-gradient-to-b from-black-300 to-black-100 relative overflow-hidden">
          {/* Loading State */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin text-4xl sm:text-6xl mb-4">🌌</div>
                <p className="text-lg sm:text-xl font-semibold">Loading 3D Galaxy...</p>
                <p className="text-sm sm:text-base text-white-50">Initializing interactive experience</p>
              </div>
            </div>
          )}

          {/* 3D Container */}
          <div 
            ref={containerRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              touchAction: 'none' // Prevent default touch actions for better experience
            }}
          >
            {/* Stars Background */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    opacity: Math.random() * 0.7 + 0.3
                  }}
                />
              ))}
            </div>
          </div>

          {/* Instructions - Hidden on very small screens */}
          <div className="hidden sm:block absolute top-4 left-4 bg-black-200/80 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2 text-blue-400 font-semibold">
              💡 Instructions
            </div>
            <div className="text-white-70 mt-1">
              • Click on any skill sphere to learn more
              • Watch the galaxy rotate automatically
              • Skill size indicates proficiency level
            </div>
          </div>

          {/* Legend - Hidden on very small screens */}
          <div className="hidden sm:block absolute top-4 right-4 bg-black-200/80 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
              🎨 Categories
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Frontend</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Backend</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Tools</span>
              </div>
            </div>
          </div>
          
          {/* Mobile Touch Instruction */}
          <div className="sm:hidden absolute bottom-4 left-0 right-0 text-center bg-black-200/80 mx-4 rounded-lg p-2">
            <p className="text-xs text-white-50">Tap on skills to view details</p>
          </div>
        </div>

        {/* Selected Skill Details */}
        {selectedSkill && (
          <div className="galaxy-section p-6">
            <SkillDetails skill={selectedSkill} />
          </div>
        )}
      </div>

      {/* Skills Grid (Fallback/Mobile) */}
      <div className="galaxy-section bg-black-200 p-3 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center">📊 Skills Overview</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              onClick={() => setSelectedSkill(skill)}
              className="bg-black-300 rounded-lg p-2 sm:p-4 text-center cursor-pointer hover:bg-black-100 transition-all duration-300 hover:scale-105"
            >
              <div className="text-xl sm:text-3xl mb-1 sm:mb-2">{skill.icon}</div>
              <div className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">{skill.name}</div>
              <div className="text-xs text-white-50 mb-1 sm:mb-2 truncate">{skill.category}</div>
              <div className="w-full bg-black-200 rounded-full h-1.5 sm:h-2">
                <div 
                  className="h-1.5 sm:h-2 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${skill.level}%`,
                    backgroundColor: skill.color
                  }}
                />
              </div>
              <div className="text-xs text-white-50 mt-0.5 sm:mt-1">{skill.level}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="galaxy-section bg-black-100 p-3 sm:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold text-blue-400">{skills.length}</div>
            <div className="text-xs sm:text-sm text-white-50">Total Skills</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold text-green-400">
              {Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)}%
            </div>
            <div className="text-xs sm:text-sm text-white-50">Average Proficiency</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold text-purple-400">
              {new Set(skills.map(skill => skill.category)).size}
            </div>
            <div className="text-xs sm:text-sm text-white-50">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold text-orange-400">
              {skills.filter(skill => skill.level >= 80).length}
            </div>
            <div className="text-xs sm:text-sm text-white-50">Expert Level</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsGalaxy;
