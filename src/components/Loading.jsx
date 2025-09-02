import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Loading = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    // Animate the loading bar
    gsap.to(".loading-bar", {
      width: "100%",
      duration: 3,
      ease: "power2.out",
    });

    // Animate the logo
    gsap.fromTo(
      ".loading-logo",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    );

    // Animate loading text
    gsap.fromTo(
      ".loading-text",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    );
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete && onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      {/* Loading Logo */}
      <div className="loading-logo mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-3xl">👨‍💻</span>
        </div>
      </div>

      {/* Loading Text */}
      <div className="loading-text text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Dipanshu Kr. Pandey</h2>
        <p className="text-white-50">Loading Portfolio...</p>
      </div>

      {/* Progress Bar */}
      <div className="w-80 bg-black-200 rounded-full h-2 overflow-hidden">
        <div 
          className="loading-bar h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
          style={{ width: '0%' }}
        />
      </div>
      
      {/* Progress Percentage */}
      <div className="mt-4 text-white-50 text-sm">
        {progress}%
      </div>

      {/* Loading Animation */}
      <div className="mt-8 flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
