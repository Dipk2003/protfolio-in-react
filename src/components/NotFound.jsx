import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NotFound = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".not-found-content",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      ".not-found-number",
      { scale: 0 },
      { scale: 1, duration: 1, delay: 0.3, ease: "back.out(1.7)" }
    );
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center not-found-content">
        <div className="not-found-number text-9xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-8">
          404
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-white-50 text-xl mb-8 max-w-md">
          Sorry, the page you're looking for doesn't exist. Let's get you back to the portfolio!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            🏠 Go Home
          </button>
          <button 
            onClick={() => window.history.back()}
            className="bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            ← Go Back
          </button>
        </div>
        
        <div className="mt-12 text-6xl animate-bounce">
          🤖
        </div>
      </div>
    </div>
  );
};

export default NotFound;
