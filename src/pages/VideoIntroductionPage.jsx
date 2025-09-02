import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoIntroductionPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".video-hero",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      ".video-container",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 0.5,
      }
    );

    gsap.fromTo(
      ".video-details",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.8,
      }
    );
  });

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const clickX = e.nativeEvent.offsetX;
      const width = e.target.offsetWidth;
      const newTime = (clickX / width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="min-h-screen bg-black-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        <div className="video-hero text-center z-10 px-5">
          <div className="text-8xl mb-8">🎬</div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Video Introduction
          </h1>
          <p className="text-xl md:text-2xl text-white-50 mb-8 max-w-3xl mx-auto">
            Get to know me personally through this interactive video introduction where I share my journey, passion, and vision for the future.
          </p>
          <button
            onClick={() => document.getElementById('main-video').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Watch Introduction ▶️
          </button>
        </div>
      </section>

      {/* Main Video Section */}
      <section id="main-video" className="section-padding">
        <div className="w-full h-full md:px-10 px-5">
          <div className="video-container max-w-6xl mx-auto">
            <div className="card-border rounded-2xl overflow-hidden">
              {/* Video Player */}
              <div className="relative bg-black aspect-video">
                {/* Placeholder for actual video */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-6">🎥</div>
                    <h2 className="text-4xl font-bold mb-4">Personal Introduction</h2>
                    <p className="text-xl text-white-50 mb-6">Hello! I'm Dipanshu Kr. Pandey</p>
                    <p className="text-white-50 mb-8 max-w-md mx-auto">
                      Computer Science Student | Full-Stack Developer | Problem Solver
                    </p>
                    <button
                      onClick={togglePlay}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-20 h-20 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 mx-auto"
                    >
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>
                  </div>
                </div>
                
                {/* Hidden video element for future implementation */}
                <video
                  ref={videoRef}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  className="hidden w-full h-full object-cover"
                  poster="/images/video-poster.jpg"
                >
                  <source src="/videos/introduction.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-blue-400 transition-colors text-2xl"
                    >
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>
                    
                    {/* Progress Bar */}
                    <div className="flex-1">
                      <div 
                        className="h-3 bg-white/20 rounded-full cursor-pointer overflow-hidden"
                        onClick={handleSeek}
                      >
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-white-50 mt-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                    
                    <button className="text-white hover:text-blue-400 transition-colors text-xl">
                      🔊
                    </button>
                    <button className="text-white hover:text-blue-400 transition-colors text-xl">
                      ⛶
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About This Video Section */}
      <section className="section-padding bg-black-200">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="video-details">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About This Introduction</h2>
              <p className="text-xl text-white-50 max-w-4xl mx-auto">
                In this personal video, I share my journey as a Computer Science student, my passion for 
                full-stack development, and what drives me to create innovative solutions. You'll learn 
                about my background, experiences, and future goals in tech.
              </p>
            </div>
            
            {/* Key Highlights */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="card-border rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold mb-2">Education Journey</h3>
                <p className="text-white-50">
                  My path through Computer Science Engineering and continuous learning
                </p>
              </div>
              <div className="card-border rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">💼</div>
                <h3 className="text-2xl font-bold mb-2">Professional Experience</h3>
                <p className="text-white-50">
                  Internships and real-world projects that shaped my skills
                </p>
              </div>
              <div className="card-border rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-2">Future Vision</h3>
                <p className="text-white-50">
                  My goals and aspirations in the world of technology
                </p>
              </div>
            </div>

            {/* Video Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <div className="bg-black-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">👀</div>
                <div className="text-2xl font-bold">1.2K</div>
                <div className="text-white-50">Views</div>
              </div>
              <div className="bg-black-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">👍</div>
                <div className="text-2xl font-bold">98</div>
                <div className="text-white-50">Likes</div>
              </div>
              <div className="bg-black-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">⏱️</div>
                <div className="text-2xl font-bold">3:45</div>
                <div className="text-white-50">Duration</div>
              </div>
              <div className="bg-black-100 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">📅</div>
                <div className="text-2xl font-bold">Recent</div>
                <div className="text-white-50">Updated</div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="card-border rounded-2xl p-8">
              <h3 className="text-3xl font-bold mb-8 text-center">What You'll Learn About Me</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-400">🎯 My Passion</h4>
                  <ul className="space-y-2 text-white-50">
                    <li>• Why I chose Computer Science</li>
                    <li>• What drives my love for coding</li>
                    <li>• My approach to problem-solving</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-purple-400">🛠️ Technical Journey</h4>
                  <ul className="space-y-2 text-white-50">
                    <li>• Evolution of my tech stack</li>
                    <li>• Key projects and learnings</li>
                    <li>• Challenges I've overcome</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-green-400">🌟 Personal Values</h4>
                  <ul className="space-y-2 text-white-50">
                    <li>• My work philosophy</li>
                    <li>• Collaboration and teamwork</li>
                    <li>• Continuous learning mindset</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-orange-400">🔮 Future Goals</h4>
                  <ul className="space-y-2 text-white-50">
                    <li>• Career aspirations</li>
                    <li>• Technologies I want to master</li>
                    <li>• Impact I want to make</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center px-5">
          <h2 className="text-4xl font-bold mb-6">Ready to Connect?</h2>
          <p className="text-xl text-white-50 mb-8">
            After watching my introduction, I'd love to hear from you and discuss potential opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              Get In Touch 📧
            </a>
            <a
              href="/"
              className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
            >
              Back to Portfolio 🏠
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoIntroductionPage;
