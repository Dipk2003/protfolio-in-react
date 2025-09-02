import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SkillProgressBar = ({ skill, level, category }) => {
  // Create a safe CSS class name by removing special characters
  const safeSkillName = skill.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  
  useGSAP(() => {
    gsap.fromTo(
      `.progress-${safeSkillName}`,
      { width: "0%" },
      {
        width: `${level}%`,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.skill-${safeSkillName}`,
          start: "top 80%",
        },
      }
    );
  });

  const getSkillColor = (category) => {
    switch (category) {
      case 'frontend':
        return 'from-blue-500 to-cyan-500';
      case 'backend':
        return 'from-green-500 to-emerald-500';
      case 'database':
        return 'from-purple-500 to-pink-500';
      case 'tools':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-blue-500 to-purple-500';
    }
  };

  return (
    <div className={`skill-${safeSkillName} mb-6`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{skill}</span>
        <span className="text-white-50 text-sm">{level}%</span>
      </div>
      <div className="w-full bg-black-200 rounded-full h-3 overflow-hidden">
        <div 
          className={`progress-${safeSkillName} h-full bg-gradient-to-r ${getSkillColor(category)} rounded-full transition-all duration-300`}
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
};

export default SkillProgressBar;
