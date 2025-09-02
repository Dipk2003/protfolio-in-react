import CodingDashboard from '../components/CodingDashboard';
import analytics from '../services/analyticsService';
import { useEffect } from 'react';

const DashboardPage = () => {
  useEffect(() => {
    // Track dashboard page view
    analytics.trackPageView('Coding Dashboard', '/dashboard');
  }, []);

  return <CodingDashboard />;
};

export default DashboardPage;
