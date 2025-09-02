import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

import { navLinks } from "../constants";

const NavBar = () => {
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // create an event listener for when the user scrolls
    const handleScroll = () => {
      // check if the user has scrolled down at least 10px
      // if so, set the state to true
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // add the event listener to the window
    window.addEventListener("scroll", handleScroll);

    // cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Animate mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.fromTo(
        '.mobile-menu',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        '.mobile-menu li',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.1 }
      );
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <Link to="/" className="logo">
          <span className="hidden sm:inline">Dipanshu Kumar Pandey</span>
          <span className="sm:hidden">DKP</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop hidden lg:block">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <Link to={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span 
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>

        {/* Desktop Contact Button */}
        <Link to="/contact" className="contact-btn group hidden lg:block">
          <div className="inner">
            <span>Contact me</span>
          </div>
        </Link>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu lg:hidden absolute top-full left-0 w-full bg-black-200/95 backdrop-blur-md border-t border-white/10 z-50">
          <nav className="p-6">
            <ul className="space-y-4">
              {navLinks.map(({ link, name }) => (
                <li key={name}>
                  <Link 
                    to={link}
                    className={`block py-3 px-4 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                      location.pathname === link 
                        ? 'text-blue-400 bg-white/5' 
                        : 'text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {name}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-white/10">
                <Link 
                  to="/contact" 
                  className="block w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact me
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default NavBar;
