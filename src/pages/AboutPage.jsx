import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".about-hero",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      ".about-section",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
        }
      }
    );
  });

  const education = [
    {
      degree: "Bachelor of Technology",
      field: "Computer Science Engineering",
      institution: "Gyan Ganga Institute of Technology and Sciences",
      year: "2022 - 2026",
      status: "Currently Pursuing",
      grade: "8.5+ CGPA"
    }
  ];

  const personalStats = [
    { icon: "🎂", label: "Age", value: "21 Years" },
    { icon: "📍", label: "Location", value: "India" },
    { icon: "🎓", label: "Education", value: "B.Tech CSE" },
    { icon: "💼", label: "Status", value: "Available" }
  ];

  const interests = [
    { icon: "💻", title: "Coding", desc: "Building innovative solutions" },
    { icon: "🎮", title: "Gaming", desc: "Strategy and puzzle games" },
    { icon: "📚", title: "Learning", desc: "New technologies and frameworks" },
    { icon: "🎵", title: "Music", desc: "Listening while coding" },
    { icon: "📱", title: "Tech Trends", desc: "Following latest developments" },
    { icon: "🏃", title: "Fitness", desc: "Staying active and healthy" }
  ];

  const downloadResume = () => {
    // Create a temporary link to download resume
    const link = document.createElement('a');
    link.href = '/resume/Dipanshu_Kumar_Pandey_Resume.pdf';
    link.download = 'Dipanshu_Kumar_Pandey_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        <div className="about-hero text-center z-10 px-5">
          <div className="text-8xl mb-8">👨‍💻</div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl md:text-2xl text-white-50 mb-8 max-w-3xl mx-auto">
            Get to know me better - my background, education, interests, and what drives my passion for technology.
          </p>
          <button
            onClick={() => document.getElementById('about-content').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Learn More 📖
          </button>
        </div>
      </section>

      {/* About Content */}
      <section id="about-content" className="section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          {/* Personal Introduction */}
          <div className="about-section mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Hello, I'm Dipanshu! 👋</h2>
                <p className="text-xl text-white-50 mb-6 leading-relaxed">
                  I'm a passionate Computer Science Engineering student with a deep love for creating 
                  innovative digital solutions. My journey in tech started with curiosity and has evolved 
                  into a dedicated pursuit of excellence in full-stack development.
                </p>
                <p className="text-lg text-white-50 mb-8 leading-relaxed">
                  I believe in the power of technology to solve real-world problems and create meaningful 
                  experiences. Whether it's building secure backend systems or crafting engaging user 
                  interfaces, I approach every project with enthusiasm and attention to detail.
                </p>
                <button
                  onClick={downloadResume}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
                >
                  Download Resume 📄
                </button>
              </div>
              
              {/* Personal Stats */}
              <div className="grid grid-cols-2 gap-6">
                {personalStats.map((stat, index) => (
                  <div key={index} className="card-border rounded-xl p-6 text-center">
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <div className="font-semibold mb-1">{stat.label}</div>
                    <div className="text-white-50">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="about-section mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Education 🎓</h2>
            {education.map((edu, index) => (
              <div key={index} className="card-border rounded-2xl p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="text-center md:text-left">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl mx-auto md:mx-0 mb-4">
                      🎓
                    </div>
                    <h3 className="text-2xl font-bold">{edu.degree}</h3>
                    <p className="text-blue-400">{edu.field}</p>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">{edu.institution}</h4>
                    <p className="text-white-50 mb-2">{edu.year}</p>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                      {edu.status}
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{edu.grade}</div>
                    <p className="text-white-50">Current Grade</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interests & Hobbies */}
          <div className="about-section mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Interests & Hobbies</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {interests.map((interest, index) => (
                <div key={index} className="card-border rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl mb-4">{interest.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{interest.title}</h3>
                  <p className="text-white-50">{interest.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Facts */}
          <div className="about-section mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Fun Facts About Me 🎉</h2>
            <div className="card-border rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">☕</span>
                    <span>I code better with a cup of tea in hand</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">🌙</span>
                    <span>Night owl - most productive after 9 PM</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">🎯</span>
                    <span>Love solving complex algorithms and puzzles</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">🚀</span>
                    <span>Always excited about new tech trends</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">📱</span>
                    <span>First line of code written in 2021</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">🎮</span>
                    <span>Gaming helps me think creatively</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">🔧</span>
                    <span>Love building things from scratch</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">🌟</span>
                    <span>Believe in continuous learning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Want to Know More?</h2>
            <p className="text-xl text-white-50 mb-8 max-w-2xl mx-auto">
              Feel free to reach out if you'd like to connect, collaborate, or just have a chat about technology!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                Get In Touch 📧
              </Link>
              <Link
                to="/video-introduction"
                className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                Watch Video Intro 🎬
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
