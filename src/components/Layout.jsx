import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./NavBar";
import ThemeToggle from "./ThemeToggle";
import SmoothScroll from "./SmoothScroll";
import BackToTop from "./BackToTop";
import ChatWidget from "./ChatWidget";
import analytics from "../services/analyticsService";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views for analytics
    const pageName = getPageName(location.pathname);
    analytics.trackPageView(pageName, location.pathname);
    
    // Track route changes
    analytics.trackEvent('page_visit', {
      path: location.pathname,
      pageName,
      timestamp: Date.now()
    });
  }, [location]);

  const getPageName = (pathname) => {
    const routes = {
      '/': 'Home',
      '/about': 'About',
      '/resume': 'Resume', 
      '/skills': 'Skills',
      '/projects': 'Projects',
      '/repositories': 'GitHub Repositories',
      '/services': 'Services',
      '/experience': 'Experience',
      '/contact': 'Contact',
      '/video-introduction': 'Video Introduction',
      '/leetcode': 'LeetCode Progress',
      '/interactive': 'Interactive Features'
    };
    return routes[pathname] || 'Unknown Page';
  };


  return (
    <>
      <SmoothScroll />
      <ThemeToggle />
      <Navbar />
      <main className="pt-20 sm:pt-24">
        <Outlet />
      </main>
      <BackToTop />
      <ChatWidget />
    </>
  );
};

export default Layout;
