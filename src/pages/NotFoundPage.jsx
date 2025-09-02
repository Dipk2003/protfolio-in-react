import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NotFoundPage = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".not-found-content",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
      }
    );
  });

  return (
    <div className="min-h-screen bg-black-100 flex items-center justify-center">
      <div className="not-found-content text-center px-5">
        <div className="text-9xl mb-8">🔍</div>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h2>
        <p className="text-xl text-white-50 mb-8 max-w-2xl mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Back to Home 🏠
          </Link>
          <Link
            to="/video-introduction"
            className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
          >
            Watch Video Introduction 🎬
          </Link>
        </div>

        {/* Popular Pages */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Popular Pages</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Link to="/" className="card-border rounded-xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-2">🏠</div>
              <div className="font-semibold">Portfolio Home</div>
              <div className="text-white-50 text-sm">Main portfolio page</div>
            </Link>
            <Link to="/video-introduction" className="card-border rounded-xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-2">🎬</div>
              <div className="font-semibold">Video Introduction</div>
              <div className="text-white-50 text-sm">Personal video intro</div>
            </Link>
            <a href="/#contact" className="card-border rounded-xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-2">📧</div>
              <div className="font-semibold">Contact</div>
              <div className="text-white-50 text-sm">Get in touch</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
