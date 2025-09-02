import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ResumePage = () => {
  const [activeSection, setActiveSection] = useState("overview");

  useGSAP(() => {
    gsap.fromTo(
      ".resume-hero",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      ".resume-section",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".resume-content",
          start: "top 80%",
        }
      }
    );
  });

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/Dipanshu_Kumar_Pandey_Resume.pdf';
    link.download = 'Dipanshu_Kumar_Pandey_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resumeData = {
    overview: {
      title: "Professional Overview",
      content: {
        summary: "Passionate Computer Science Engineering student with 2+ years of hands-on experience in full-stack web development. Proven track record of delivering high-quality websites and applications that drive business results. Expertise in modern technologies including React.js, Node.js, and Java.",
        highlights: [
          "2+ years of web development experience",
          "8+ successful projects completed", 
          "20% average increase in client leads",
          "100% client satisfaction rate",
          "Proficient in 15+ technologies"
        ]
      }
    },
    education: {
      title: "Education",
      content: [
        {
          degree: "Bachelor of Technology",
          field: "Computer Science Engineering",
          institution: "Gyan Ganga Institute of Technology and Sciences",
          year: "2022 - 2026",
          grade: "8.5+ CGPA",
          status: "Currently Pursuing",
          achievements: [
            "Consistent academic excellence",
            "Active participation in coding competitions",
            "Technical project leadership"
          ]
        }
      ]
    },
    experience: {
      title: "Work Experience", 
      content: [
        {
          position: "Assistant IT Intern",
          company: "Prishubh EdTech",
          duration: "May 2024 - August 2024",
          location: "Remote",
          achievements: [
            "Spearheaded the creation of over 7 custom websites",
            "Achieved 20% average increase in client-reported online leads",
            "Improved website deployment efficiency by 15%",
            "Collaborated with team to implement IT strategies"
          ]
        },
        {
          position: "Front End Developer Intern",
          company: "Oasis Infobyte",
          duration: "October 2023 - November 2023", 
          location: "Remote",
          achievements: [
            "Built 5+ responsive personal portfolio websites",
            "Engineered 3 professional portfolio websites",
            "Received positive client feedback on design and functionality",
            "Implemented responsive design principles"
          ]
        }
      ]
    },
    skills: {
      title: "Technical Skills",
      content: {
        frontend: [
          { name: "React.js", level: 90 },
          { name: "JavaScript", level: 85 },
          { name: "HTML5/CSS3", level: 95 },
          { name: "Tailwind CSS", level: 88 },
          { name: "Three.js", level: 75 }
        ],
        backend: [
          { name: "Node.js", level: 85 },
          { name: "Express.js", level: 82 },
          { name: "Java", level: 90 },
          { name: "Spring Boot", level: 78 },
          { name: "RESTful APIs", level: 85 }
        ],
        database: [
          { name: "MySQL", level: 85 },
          { name: "MongoDB", level: 80 }
        ],
        tools: [
          { name: "Git/GitHub", level: 90 },
          { name: "VS Code", level: 95 },
          { name: "Postman", level: 85 },
          { name: "Docker", level: 70 }
        ]
      }
    },
    certifications: {
      title: "Certifications",
      content: [
        {
          name: "Java Full Stack Certification",
          issuer: "CodeForSuccess",
          date: "2024",
          description: "Comprehensive full-stack development with Java technologies"
        },
        {
          name: "Data Structures & Algorithms",
          issuer: "ApnaCollege",
          date: "2024", 
          description: "Advanced problem-solving and algorithmic thinking"
        },
        {
          name: "SQL Certification",
          issuer: "HackerRank",
          date: "2024",
          description: "Database design, queries, and optimization"
        }
      ]
    }
  };

  const sections = [
    { id: "overview", name: "Overview", icon: "👨‍💻" },
    { id: "education", name: "Education", icon: "🎓" },
    { id: "experience", name: "Experience", icon: "💼" },
    { id: "skills", name: "Skills", icon: "💻" },
    { id: "certifications", name: "Certifications", icon: "🏆" }
  ];

  const renderContent = () => {
    const section = resumeData[activeSection];
    
    switch(activeSection) {
      case "overview":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Professional Summary</h3>
              <p className="text-lg text-white-50 leading-relaxed">{section.content.summary}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Key Highlights</h3>
              <ul className="space-y-3">
                {section.content.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    <span className="text-white-50">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      case "education":
        return (
          <div className="space-y-6">
            {section.content.map((edu, index) => (
              <div key={index} className="card-border rounded-xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                    <p className="text-blue-400 mb-2">{edu.field}</p>
                    <p className="text-white-50 mb-2">{edu.institution}</p>
                    <p className="text-sm text-white-50">{edu.year}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold">CGPA: {edu.grade}</span>
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        {edu.status}
                      </span>
                    </div>
                    <h4 className="font-semibold mb-2">Achievements:</h4>
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-white-50 text-sm flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case "experience":
        return (
          <div className="space-y-8">
            {section.content.map((exp, index) => (
              <div key={index} className="card-border rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.position}</h3>
                    <p className="text-blue-400">{exp.company}</p>
                    <p className="text-white-50 text-sm">{exp.location}</p>
                  </div>
                  <span className="text-white-50 text-sm">{exp.duration}</span>
                </div>
                <h4 className="font-semibold mb-3">Key Achievements:</h4>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="text-white-50 flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      
      case "skills":
        return (
          <div className="space-y-8">
            {Object.entries(section.content).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-2xl font-bold mb-6 capitalize">{category.replace('frontend', 'Frontend').replace('backend', 'Backend').replace('database', 'Database').replace('tools', 'Tools & Others')}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">{skill.name}</span>
                        <span className="text-white-50">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-black-200 rounded-full h-2">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      
      case "certifications":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {section.content.map((cert, index) => (
              <div key={index} className="card-border rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl">
                    🏆
                  </div>
                  <span className="text-white-50 text-sm">{cert.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
                <p className="text-blue-400 mb-3">{cert.issuer}</p>
                <p className="text-white-50 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        <div className="resume-hero text-center z-10 px-5">
          <div className="text-8xl mb-8">📄</div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            My Resume
          </h1>
          <p className="text-xl md:text-2xl text-white-50 mb-8 max-w-3xl mx-auto">
            Comprehensive overview of my education, experience, skills, and achievements in an interactive format.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('resume-content').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              View Online Resume 📖
            </button>
            <button
              onClick={downloadResume}
              className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
            >
              Download PDF 📄
            </button>
          </div>
        </div>
      </section>

      {/* Resume Content */}
      <section id="resume-content" className="section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          {/* Header Info */}
          <div className="resume-section text-center mb-16">
            <div className="card-border rounded-2xl p-8">
              <h2 className="text-4xl font-bold mb-4">Dipanshu Kumar Pandey</h2>
              <p className="text-xl text-blue-400 mb-4">Full-Stack Developer & Computer Science Student</p>
              <div className="flex flex-wrap justify-center gap-6 text-white-50">
                <span>📧 dkpandeya12@gmail.com</span>
                <span>📍 India</span>
                <span>🎂 21 Years Old</span>
                <span>💼 Available for Work</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="resume-section mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'border border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {section.icon} {section.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="resume-section mb-16">
            <div className="card-border rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-8">{resumeData[activeSection].title}</h2>
              {renderContent()}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="resume-section mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Career Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-black-200 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🎓</div>
                <div className="text-2xl font-bold">8.5+</div>
                <div className="text-white-50">CGPA</div>
              </div>
              <div className="bg-black-200 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">💼</div>
                <div className="text-2xl font-bold">2+</div>
                <div className="text-white-50">Internships</div>
              </div>
              <div className="bg-black-200 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🚀</div>
                <div className="text-2xl font-bold">8+</div>
                <div className="text-white-50">Projects</div>
              </div>
              <div className="bg-black-200 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-white-50">Certifications</div>
              </div>
            </div>
          </div>

          {/* Resume Actions */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Interested in Working Together?</h2>
            <p className="text-xl text-white-50 mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and exciting projects!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={downloadResume}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                Download Full Resume 📄
              </button>
              <Link
                to="/contact"
                className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                Contact Me 📧
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumePage;
