import { useEffect } from "react";

const SmoothScroll = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleSmoothScroll = (e) => {
      const href = e.currentTarget.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          const headerOffset = 80; // Account for fixed navbar
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listeners to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup
    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SmoothScroll;
