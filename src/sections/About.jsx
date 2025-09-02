import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".about-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".about-container",
          start: "top 80%",
        },
      }
    );
  });

  const education = {
    institution: "Mangalmay Institute of Engineering and Technology",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    duration: "Sep 2021 – Aug 2025",
    location: "Greater Noida, Uttar Pradesh",
    coursework: [
      "Data Structures and Algorithms",
      "Agile Methodologies", 
      "SDLC",
      "DBMS",
      "Artificial Intelligence",
      "OOPs",
      "Operating Systems",
      "Computer Networks"
    ]
  };

  const personalInfo = {
    name: "Dipanshu Kr. Pandey",
    location: "Knowledge Park2, Greater Noida, Uttar Pradesh 201310",
    phone: "+91-9369190920",
    email: "dkpandeya12@gmail.com",
    linkedin: "linkedin.com/in/dipanshu-kr.-pandey",
    github: "github.com/Dipk2003"
  };

  return (
    <section id="about" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5 about-container">
        <TitleHeader
          title="About Me - My Journey & Background"
          sub="🎓 Education, Skills & Personal Information"
        />
        
        <div className="grid md:grid-cols-2 gap-10 mt-16">
          {/* Education Card */}
          <div className="about-card card-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                🎓
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-white">{education.institution}</h4>
                <p className="text-blue-400 font-medium">{education.degree}</p>
                <p className="text-white-50">{education.duration}</p>
                <p className="text-white-50">📍 {education.location}</p>
              </div>
              
              <div>
                <h5 className="text-lg font-semibold mb-3">Relevant Coursework:</h5>
                <div className="grid grid-cols-2 gap-2">
                  {education.coursework.map((course, index) => (
                    <div key={index} className="bg-black-200 rounded-lg p-2 text-sm text-white-50">
                      • {course}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info Card */}
          <div className="about-card card-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                👨‍💻
              </div>
              <h3 className="text-2xl font-bold">Personal Information</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-blue-400">📧</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-white-50 hover:text-white transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-blue-400">📱</span>
                  <a href={`tel:${personalInfo.phone}`} className="text-white-50 hover:text-white transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-blue-400">📍</span>
                  <span className="text-white-50">{personalInfo.location}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-blue-400">💼</span>
                  <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-white-50 hover:text-white transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-blue-400">🔗</span>
                  <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="text-white-50 hover:text-white transition-colors">
                    GitHub Profile
                  </a>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white-10">
                <a 
                  href="/dipanshu_resume.pdf" 
                  download="Dipanshu_Kr_Pandey_Resume.pdf"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  📄 Download Full Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
