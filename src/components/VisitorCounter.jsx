import { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import analytics from '../services/analyticsService';

const VisitorCounter = ({ compact = false, showDetails = true }) => {
  const [stats, setStats] = useState(null);
  const [isLive, setIsLive] = useState(true);

  useGSAP(() => {
    gsap.fromTo(
      '.visitor-counter',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );

    // Animate counters
    gsap.fromTo(
      '.counter-number',
      { innerText: 0 },
      {
        innerText: (i, element) => parseInt(element.dataset.target),
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        stagger: 0.2
      }
    );
  });

  useEffect(() => {
    // Initial load
    updateStats();

    // Set up real-time updates
    const interval = setInterval(updateStats, 30000); // Every 30 seconds

    // Listen for real-time events
    const handlePageView = () => updateStats();
    const handleAnalyticsEvent = () => updateStats();

    window.addEventListener('pageViewTracked', handlePageView);
    window.addEventListener('analyticsEvent', handleAnalyticsEvent);

    return () => {
      clearInterval(interval);
      window.removeEventListener('pageViewTracked', handlePageView);
      window.removeEventListener('analyticsEvent', handleAnalyticsEvent);
    };
  }, []);

  const updateStats = () => {
    const todayStats = analytics.getTodayAnalytics();
    const weeklyStats = analytics.getWeeklyAnalytics();
    const allTimeStats = analytics.getAllTimeAnalytics();
    
    setStats({
      today: todayStats,
      weekly: weeklyStats,
      allTime: allTimeStats,
      lastUpdated: new Date().toLocaleTimeString()
    });

    // Pulse effect for live updates
    setIsLive(false);
    setTimeout(() => setIsLive(true), 100);
  };

  if (!stats) {
    return (
      <div className="visitor-counter animate-pulse">
        <div className="card-border rounded-xl p-4 bg-black-200">
          <div className="h-4 bg-gray-600 rounded mb-2"></div>
          <div className="h-6 bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="visitor-counter fixed bottom-4 right-4 z-40">
        <div className="bg-black-200 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-lg">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              isLive ? 'bg-green-400 animate-pulse' : 'bg-green-400'
            }`}></div>
            <div className="text-sm">
              <div className="font-semibold">
                <span 
                  className="counter-number" 
                  data-target={stats.today.visitors}
                >
                  {stats.today.visitors}
                </span> visitors today
              </div>
              <div className="text-white-50 text-xs">
                {stats.today.sessionDuration}m session
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="visitor-counter">
      <div className="card-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            📊 Live Analytics
          </h3>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              isLive ? 'bg-green-400 animate-pulse' : 'bg-green-400'
            }`}></div>
            <span className="text-xs text-white-50">Live</span>
          </div>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold">
              <span 
                className="counter-number text-blue-400" 
                data-target={stats.today.visitors}
              >
                {stats.today.visitors}
              </span>
            </div>
            <div className="text-sm text-white-50">Visitors Today</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold">
              <span 
                className="counter-number text-purple-400" 
                data-target={stats.today.pageViews}
              >
                {stats.today.pageViews}
              </span>
            </div>
            <div className="text-sm text-white-50">Page Views</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold">
              <span 
                className="counter-number text-green-400" 
                data-target={stats.today.sessionDuration}
              >
                {stats.today.sessionDuration}
              </span>m
            </div>
            <div className="text-sm text-white-50">Your Session</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold">
              <span 
                className="counter-number text-yellow-400" 
                data-target={stats.weekly.averageDaily}
              >
                {stats.weekly.averageDaily}
              </span>
            </div>
            <div className="text-sm text-white-50">Daily Average</div>
          </div>
        </div>

        {showDetails && (
          <>
            {/* Top Pages Today */}
            {stats.today.topPages && stats.today.topPages.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-white-50">📈 Popular Pages Today</h4>
                <div className="space-y-2">
                  {stats.today.topPages.slice(0, 3).map((page, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{page.page}</span>
                      <span className="font-semibold">{page.views} views</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Weekly Trend */}
            <div className="mb-4">
              <h4 className="font-semibold mb-3 text-white-50">📊 This Week</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white-50">Total Visitors:</span>
                  <span className="font-bold ml-2">{stats.weekly.totalVisitors}</span>
                </div>
                <div>
                  <span className="text-white-50">Total Views:</span>
                  <span className="font-bold ml-2">{stats.weekly.totalPageViews}</span>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-xs text-white-50 text-center pt-4 border-t border-white/10">
              Last updated: {stats.lastUpdated}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VisitorCounter;
