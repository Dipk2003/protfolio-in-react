import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import { projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetails = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".project-detail-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".projects-container",
          start: "top 80%",
        },
      }
    );
  });

  return (
    <section id="projects" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5 projects-container">
        <TitleHeader
          title="Featured Projects - Deep Dive"
          sub="🚀 Detailed look at my development work"
        />
        
        <div className="space-y-16 mt-16">
          {projects.map((project, index) => (
            <div key={index} className="project-detail-card">
              <div className="grid lg:grid-cols-2 gap-10 card-border rounded-xl p-8">
                {/* Project Image */}
                <div className="order-2 lg:order-1">
                  <div className="rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-8 flex items-center justify-center h-80">
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {index === 0 ? "🔒" : index === 1 ? "🗳️" : "📹"}
                      </div>
                      <h4 className="text-xl font-semibold">{project.title}</h4>
                      <p className="text-white-50 mt-2">{project.date}</p>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="order-1 lg:order-2 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
                    <p className="text-white-50 text-lg">{project.description}</p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-xl font-semibold mb-3">🛠️ Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-full px-4 py-2 text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-xl font-semibold mb-3">✨ Key Features:</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-white-50">
                          <span className="text-green-400 mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <a 
                      href={project.liveLink}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
                    >
                      🚀 Live Demo
                    </a>
                    <a 
                      href={`https://github.com/Dipk2003/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all duration-300"
                    >
                      📁 Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
