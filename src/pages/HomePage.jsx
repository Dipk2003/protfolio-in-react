import { Link } from "react-router-dom";
import Hero from "../sections/Hero";
import ShowcaseSection from "../sections/ShowcaseSection";
import LogoShowcase from "../sections/LogoShowcase";
import FeatureCards from "../sections/FeatureCards";
import Footer from "../sections/Footer";
import VisitorCounter from "../components/VisitorCounter";

const HomePage = () => {
  return (
    <>
      <Hero />
      
      {/* Quick Navigation */}
      <section className="section-padding bg-black-200">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">Explore My Portfolio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Link to="/video-introduction" className="card-border rounded-xl p-4 sm:p-6 md:p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">🎬</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Video Introduction</h3>
              <p className="text-sm sm:text-base text-white-50">Get to know me personally</p>
            </Link>
            <Link to="/projects" className="card-border rounded-xl p-4 sm:p-6 md:p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">🚀</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">My Projects</h3>
              <p className="text-sm sm:text-base text-white-50">Innovative solutions I've built</p>
            </Link>
            <Link to="/leetcode" className="card-border rounded-xl p-4 sm:p-6 md:p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">📊</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">LeetCode Progress</h3>
              <p className="text-sm sm:text-base text-white-50">Real-time coding stats & analytics</p>
            </Link>
            <Link to="/services" className="card-border rounded-xl p-4 sm:p-6 md:p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">💼</div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Services</h3>
              <p className="text-sm sm:text-base text-white-50">Professional development services</p>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Live Analytics Section */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Portfolio Analytics</h2>
            <p className="text-base sm:text-lg md:text-xl text-white-50 px-2">Real-time insights into visitor engagement and coding activity</p>
          </div>
          <VisitorCounter showDetails={true} />
        </div>
      </section>
      
      <ShowcaseSection />
      <LogoShowcase />
      <FeatureCards />
      <Footer />
    </>
  );
};

export default HomePage;
