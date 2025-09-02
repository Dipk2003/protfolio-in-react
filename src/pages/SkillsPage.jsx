import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const SkillsPage = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".skills-hero",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      ".skill-category",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 80%",
        }
      }
    );
  });

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "🎨",
      skills: [
        { name: "React.js", level: 90, experience: "2+ years" },
        { name: "JavaScript", level: 85, experience: "2+ years" },
        { name: "HTML5/CSS3", level: 95, experience: "3+ years" },
        { name: "Tailwind CSS", level: 88, experience: "1.5+ years" },
        { name: "Three.js", level: 75, experience: "1+ year" },
        { name: "GSAP", level: 80, experience: "1+ year" }
      ]
    },
    {
      title: "Backend Development", 
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 85, experience: "2+ years" },
        { name: "Express.js", level: 82, experience: "2+ years" },
        { name: "Java", level: 90, experience: "3+ years" },
        { name: "Spring Boot", level: 78, experience: "1+ year" },
        { name: "RESTful APIs", level: 85, experience: "2+ years" },
        { name: "Authentication", level: 80, experience: "1.5+ years" }
      ]
    },
    {
      title: "Database & Tools",
      icon: "🗄️", 
      skills: [
        { name: "MySQL", level: 85, experience: "2+ years" },
        { name: "MongoDB", level: 80, experience: "1.5+ years" },
        { name: "Git/GitHub", level: 90, experience: "3+ years" },
        { name: "Docker", level: 70, experience: "1+ year" },
        { name: "Postman", level: 85, experience: "2+ years" },
        { name: "VS Code", level: 95, experience: "3+ years" }
      ]
    },
    {
      title: "Currently Learning",
      icon: "📚",
      skills: [
        { name: "TypeScript", level: 60, experience: "Learning" },
        { name: "Next.js", level: 65, experience: "Learning" },
        { name: "GraphQL", level: 40, experience: "Learning" },
        { name: "AWS", level: 35, experience: "Learning" },
        { name: "Redis", level: 30, experience: "Learning" },
        { name: "Microservices", level: 45, experience: "Learning" }
      ]
    }
  ];

  const achievements = [
    {
      icon: "🏆",
      title: "Java Full Stack Certification",
      org: "CodeForSuccess",
      date: "2024"
    },
    {
      icon: "🥇",
      title: "Data Structures & Algorithms",
      org: "ApnaCollege", 
      date: "2024"
    },
    {
      icon: "🎖️",
      title: "SQL Certification",
      org: "HackerRank",
      date: "2024"
    },
    {
      icon: "⭐",
      title: "Frontend Development",
      org: "Oasis Infobyte",
      date: "2023"
    }
  ];

  return (
    <div className="min-h-screen bg-black-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        <div className="skills-hero text-center z-10 px-5">
          <div className="text-8xl mb-8">💻</div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            My Skills
          </h1>
          <p className="text-xl md:text-2xl text-white-50 mb-8 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, tools, and technologies I work with to build amazing digital experiences.
          </p>
          <button
            onClick={() => document.getElementById('skills-content').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Explore Skills 🚀
          </button>
        </div>
      </section>

      {/* Skills Content */}
      <section id="skills-content" className="section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          {/* Skills Overview */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Technical Expertise</h2>
            <p className="text-xl text-white-50 max-w-4xl mx-auto">
              With over 2+ years of hands-on experience, I've developed proficiency across the full stack, 
              from creating engaging user interfaces to building robust backend systems.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="skills-grid grid lg:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="skill-category card-border rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <span className="text-4xl mr-4">{category.icon}</span>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="skill-item">
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">{skill.name}</span>
                        <span className="text-white-50 text-sm">{skill.experience}</span>
                      </div>
                      <div className="w-full bg-black-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${skillIndex * 0.1}s`
                          }}
                        />
                      </div>
                      <div className="text-right text-xs text-white-50 mt-1">
                        {skill.level}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Achievements Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Certifications & Achievements</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="card-border rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="font-bold mb-2">{achievement.title}</h3>
                  <p className="text-blue-400 text-sm mb-1">{achievement.org}</p>
                  <p className="text-white-50 text-xs">{achievement.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-black-200 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">💻</div>
              <div className="text-2xl font-bold">15+</div>
              <div className="text-white-50">Technologies</div>
            </div>
            <div className="bg-black-200 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold">4</div>
              <div className="text-white-50">Certifications</div>
            </div>
            <div className="bg-black-200 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">📈</div>
              <div className="text-2xl font-bold">2+</div>
              <div className="text-white-50">Years Experience</div>
            </div>
            <div className="bg-black-200 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🚀</div>
              <div className="text-2xl font-bold">8+</div>
              <div className="text-white-50">Projects Built</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Work Together?</h2>
            <p className="text-xl text-white-50 mb-8 max-w-2xl mx-auto">
              I'm always excited to take on new challenges and work with amazing teams. Let's build something incredible together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                Get In Touch 📧
              </Link>
              <Link
                to="/projects"
                className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                View Projects 🚀
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsPage;
