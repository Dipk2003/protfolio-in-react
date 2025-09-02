import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import SkillProgressBar from "../components/SkillProgressBar";

gsap.registerPlugin(ScrollTrigger);

const EnhancedSkills = () => {
  const skillsData = {
    frontend: [
      { name: "HTML/CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "React.js", level: 80 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Bootstrap", level: 80 },
    ],
    backend: [
      { name: "Java Core", level: 90 },
      { name: "Spring Boot", level: 75 },
      { name: "Spring Core", level: 70 },
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 75 },
    ],
    database: [
      { name: "MySQL", level: 80 },
      { name: "MongoDB", level: 70 },
      { name: "Hibernate", level: 65 },
      { name: "Spring Data JPA", level: 70 },
    ],
    tools: [
      { name: "Git & GitHub", level: 85 },
      { name: "Apache Tomcat", level: 70 },
      { name: "Maven", level: 65 },
      { name: "Agile Methodologies", level: 75 },
    ]
  };

  const currentlyLearning = [
    "Next.js",
    "TypeScript", 
    "Docker",
    "AWS",
    "Spring Security",
    "Microservices"
  ];

  useGSAP(() => {
    gsap.fromTo(
      ".skills-category",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".enhanced-skills-container",
          start: "top 80%",
        },
      }
    );
  });

  return (
    <section id="enhanced-skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5 enhanced-skills-container">
        <TitleHeader
          title="Technical Expertise & Skill Levels"
          sub="💪 My proficiency across different technologies"
        />
        
        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          {/* Frontend Skills */}
          <div className="skills-category card-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                🎨
              </div>
              <h3 className="text-2xl font-bold">Frontend Development</h3>
            </div>
            {skillsData.frontend.map((skill, index) => (
              <SkillProgressBar 
                key={index}
                skill={skill.name}
                level={skill.level}
                category="frontend"
              />
            ))}
          </div>

          {/* Backend Skills */}
          <div className="skills-category card-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                ⚙️
              </div>
              <h3 className="text-2xl font-bold">Backend Development</h3>
            </div>
            {skillsData.backend.map((skill, index) => (
              <SkillProgressBar 
                key={index}
                skill={skill.name}
                level={skill.level}
                category="backend"
              />
            ))}
          </div>

          {/* Database Skills */}
          <div className="skills-category card-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                🗄️
              </div>
              <h3 className="text-2xl font-bold">Database & ORM</h3>
            </div>
            {skillsData.database.map((skill, index) => (
              <SkillProgressBar 
                key={index}
                skill={skill.name}
                level={skill.level}
                category="database"
              />
            ))}
          </div>

          {/* Tools & Methodologies */}
          <div className="skills-category card-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                🛠️
              </div>
              <h3 className="text-2xl font-bold">Tools & Methodologies</h3>
            </div>
            {skillsData.tools.map((skill, index) => (
              <SkillProgressBar 
                key={index}
                skill={skill.name}
                level={skill.level}
                category="tools"
              />
            ))}
          </div>
        </div>

        {/* Currently Learning Section */}
        <div className="mt-16">
          <div className="card-border rounded-xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                📚
              </div>
              <h3 className="text-2xl font-bold">Currently Learning</h3>
            </div>
            <p className="text-white-50 mb-6">Always expanding my skill set and staying updated with latest technologies</p>
            <div className="flex flex-wrap justify-center gap-3">
              {currentlyLearning.map((tech, index) => (
                <span 
                  key={index}
                  className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-4 py-2 text-sm font-medium animate-pulse"
                >
                  🌱 {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedSkills;
