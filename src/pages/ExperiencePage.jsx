import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { expCards } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ExperiencePage = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".experience-hero",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      ".experience-card",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".experience-timeline",
          start: "top 80%",
        }
      }
    );
  });

  const experienceStats = [
    { icon: "💼", value: "2+", label: "Internships" },
    { icon: "🏢", value: "2", label: "Companies" },
    { icon: "📈", value: "20%", label: "Avg. Lead Increase" },
    { icon: "⭐", value: "100%", label: "Client Satisfaction" }
  ];

  const skills = [
    "Full-Stack Development",
    "Website Optimization", 
    "Client Communication",
    "Project Management",
    "Team Collaboration",
    "Problem Solving",
    "Time Management",
    "Technical Documentation"
  ];

  return (
    <div className="min-h-screen bg-black-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        <div className="experience-hero text-center z-10 px-5">
          <div className="text-8xl mb-8">💼</div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            My Experience
          </h1>
          <p className="text-xl md:text-2xl text-white-50 mb-8 max-w-3xl mx-auto">
            Discover my professional journey, from internships to impactful projects that have shaped my career in technology.
          </p>
          <button
            onClick={() => document.getElementById('experience-content').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            View Journey 📈
          </button>
        </div>
      </section>

      {/* Experience Content */}
      <section id="experience-content" className="section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          {/* Experience Overview */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Professional Journey</h2>
            <p className="text-xl text-white-50 max-w-4xl mx-auto">
              Through internships and real-world projects, I've gained valuable experience in web development, 
              client relations, and delivering high-quality technical solutions.
            </p>
          </div>

          {/* Experience Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {experienceStats.map((stat, index) => (
              <div key={index} className="bg-black-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-white-50">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Experience Timeline */}
          <div className="experience-timeline mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Work Experience</h2>
            <div className="space-y-8">
              {expCards.map((exp, index) => (
                <div key={index} className="experience-card">
                  <div className="card-border rounded-2xl p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Company Info */}
                      <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl mr-4">
                            💼
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{exp.title}</h3>
                            <p className="text-blue-400">{exp.date}</p>
                          </div>
                        </div>
                        <p className="text-white-50 italic">"{exp.review}"</p>
                      </div>
                      
                      {/* Responsibilities */}
                      <div className="lg:col-span-2">
                        <h4 className="text-xl font-bold mb-4 text-purple-400">Key Responsibilities & Achievements</h4>
                        <ul className="space-y-3">
                          {exp.responsibilities.map((responsibility, respIndex) => (
                            <li key={respIndex} className="text-white-50 flex items-start">
                              <span className="text-green-400 mr-3 mt-1">✓</span>
                              <span>{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Gained */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Skills Gained Through Experience</h2>
            <div className="card-border rounded-2xl p-8">
              <div className="grid md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-black-200 rounded-lg p-4 text-center hover:bg-black-300 transition-colors duration-300">
                    <div className="font-semibold">{skill}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What I Learned Section */}
          <div className="card-border rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">What I Learned</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-400">🎯 Technical Growth</h3>
                <ul className="space-y-2 text-white-50">
                  <li>• Advanced web development techniques</li>
                  <li>• Client requirement analysis</li>
                  <li>• Performance optimization strategies</li>
                  <li>• Code quality and best practices</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-purple-400">🤝 Professional Skills</h3>
                <ul className="space-y-2 text-white-50">
                  <li>• Effective client communication</li>
                  <li>• Project timeline management</li>
                  <li>• Team collaboration</li>
                  <li>• Problem-solving under pressure</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-xl text-white-50 mb-8 max-w-2xl mx-auto">
              Ready to bring the same dedication and expertise to your next project. Let's create something amazing!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                Hire Me 💼
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

export default ExperiencePage;
