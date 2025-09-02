import { useTheme } from "../contexts/ThemeContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  useGSAP(() => {
    gsap.fromTo(
      ".theme-toggle",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", delay: 1 }
    );
  });

  const handleToggle = () => {
    toggleTheme();
    
    // Animate the toggle
    gsap.to(".theme-toggle", {
      scale: 0.8,
      rotation: 360,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={`theme-toggle fixed top-4 right-16 lg:right-4 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
        isDark 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
          : 'bg-gradient-to-r from-orange-400 to-yellow-500'
      }`}
      aria-label="Toggle theme"
    >
      <span className="text-lg sm:text-2xl transition-transform duration-300">
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

export default ThemeToggle;
