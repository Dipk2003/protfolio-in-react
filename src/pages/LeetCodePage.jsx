import CodingDashboard from '../components/CodingDashboard';
import analytics from '../services/analyticsService';
import { useEffect } from 'react';

const LeetCodePage = () => {
  useEffect(() => {
    // Track LeetCode page view
    analytics.trackPageView('LeetCode Dashboard', '/leetcode');
  }, []);

  return <CodingDashboard />;
};

export default LeetCodePage;
