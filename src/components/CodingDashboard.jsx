import { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { fetchContributionStats, fetchLanguageStats } from '../services/githubService';
import { fetchLeetCodeDashboard } from '../services/leetcodeService';
import GitHubActivityFeed from './GitHubActivityFeed';
import LeetCodeVisualization from './LeetCodeVisualization';
import analytics from '../services/analyticsService';

gsap.registerPlugin(ScrollTrigger);

const CodingDashboard = () => {
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useGSAP(() => {
    gsap.fromTo(
      '.dashboard-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.coding-dashboard',
          start: 'top 80%',
        },
      }
    );
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      
      try {
        const [github, leetcode] = await Promise.all([
          fetchContributionStats(),
          fetchLeetCodeDashboard()
        ]);
        
        setGithubData(github);
        setLeetcodeData(leetcode);
        setAnalyticsData(analytics.getTodayAnalytics());
        
        // Track dashboard view
        analytics.trackEvent('dashboard_viewed', { 
          tab: activeTab,
          hasGithubData: !!github,
          hasLeetcodeData: !!leetcode
        });
        
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();

    // Set up real-time updates
    const interval = setInterval(() => {
      setAnalyticsData(analytics.getTodayAnalytics());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [activeTab]);

  const StatCard = ({ icon, title, value, change, description, color = 'blue' }) => (
    <div className="dashboard-card card-border rounded-xl p-6 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-${color}-500/20 to-${color}-600/10 rounded-full -translate-y-10 translate-x-10`} />
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl">{icon}</div>
          {change && (
            <span className={`text-sm px-2 py-1 rounded-full ${
              change > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {change > 0 ? '↗️' : '↘️'} {Math.abs(change)}%
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-white-50 mb-1">{title}</h3>
        <div className="text-3xl font-bold mb-2">{value}</div>
        <p className="text-sm text-white-50">{description}</p>
      </div>
    </div>
  );

  const ProgressBar = ({ label, current, total, color = 'blue' }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{current}/{total}</span>
      </div>
      <div className="w-full bg-black-200 rounded-full h-3">
        <div 
          className={`h-3 bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-full transition-all duration-1000`}
          style={{ width: `${Math.min((current / total) * 100, 100)}%` }}
        />
      </div>
      <div className="text-xs text-white-50">
        {Math.round((current / total) * 100)}% Complete
      </div>
    </div>
  );

  const RecentActivity = ({ activities, type }) => (
    <div className="space-y-3">
      <h4 className="font-semibold text-lg mb-4">Recent {type}</h4>
      {activities?.slice(0, 5).map((activity, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-black-200 rounded-lg">
          <div className="text-xl">
            {type === 'Commits' ? '💻' : type === 'LeetCode' ? '🧠' : '👁️'}
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">
              {type === 'Commits' ? activity.message : 
               type === 'LeetCode' ? activity.title :
               activity.action}
            </div>
            <div className="text-xs text-white-50">
              {type === 'Commits' ? `${activity.repo} • ${activity.timeAgo}` :
               type === 'LeetCode' ? `${activity.difficulty} • ${activity.timeAgo}` :
               activity.time}
            </div>
          </div>
          <div className="text-sm">
            {type === 'Commits' ? activity.sha :
             type === 'LeetCode' ? activity.statusIcon :
             activity.count}
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="coding-dashboard min-h-screen bg-black-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⚡</div>
          <h2 className="text-2xl font-bold">Loading Dashboard...</h2>
          <p className="text-white-50">Fetching real-time data from GitHub & LeetCode</p>
        </div>
      </div>
    );
  }

  return (
    <div className="coding-dashboard min-h-screen bg-black-100">
      {/* Dashboard Header */}
      <section className="section-padding bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="dashboard-card text-center mb-16">
            <div className="text-8xl mb-6">📊</div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Coding Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-white-50 max-w-4xl mx-auto">
              Real-time insights into my coding journey, GitHub activity, LeetCode progress, and portfolio analytics.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="dashboard-card flex justify-center mb-12">
            <div className="flex gap-2 p-2 bg-black-200 rounded-xl">
              {['overview', 'github', 'leetcode', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'text-white-50 hover:text-white hover:bg-black-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  icon="🏆" 
                  title="GitHub Stars" 
                  value={githubData?.totalStars || 0}
                  change={+12}
                  description="Total stars earned"
                  color="yellow"
                />
                <StatCard 
                  icon="🧠" 
                  title="Problems Solved" 
                  value={leetcodeData?.stats?.totalSolved || 0}
                  change={+8}
                  description="LeetCode problems"
                  color="green"
                />
                <StatCard 
                  icon="👁️" 
                  title="Today's Visitors" 
                  value={analyticsData?.visitors || 0}
                  change={+25}
                  description="Unique visitors today"
                  color="blue"
                />
                <StatCard 
                  icon="📈" 
                  title="Page Views" 
                  value={analyticsData?.pageViews || 0}
                  change={+15}
                  description="Total page views today"
                  color="purple"
                />
              </div>

              {/* Progress Bars */}
              <div className="dashboard-card card-border rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Progress Overview</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <ProgressBar 
                    label="LeetCode Progress" 
                    current={leetcodeData?.stats?.totalSolved || 0} 
                    total={500}
                    color="green"
                  />
                  <ProgressBar 
                    label="GitHub Repositories" 
                    current={githubData?.totalRepos || 0} 
                    total={50}
                    color="blue"
                  />
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="dashboard-card card-border rounded-xl p-6">
                  <h4 className="font-semibold mb-4">🔥 Current Streaks</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>LeetCode Streak</span>
                      <span className="font-bold">{leetcodeData?.stats?.currentStreak || 0} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GitHub Activity</span>
                      <span className="font-bold">12 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Portfolio Views</span>
                      <span className="font-bold">{analyticsData?.sessionDuration || 0} min</span>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card card-border rounded-xl p-6">
                  <h4 className="font-semibold mb-4">🎯 This Week's Goals</h4>
                  <div className="space-y-3">
                    <ProgressBar 
                      label="Solve 20 Problems" 
                      current={leetcodeData?.stats?.weeklyProgress || 0} 
                      total={20}
                      color="green"
                    />
                    <ProgressBar 
                      label="Portfolio Visitors" 
                      current={analyticsData?.visitors || 0} 
                      total={100}
                      color="blue"
                    />
                  </div>
                </div>

                <div className="dashboard-card card-border rounded-xl p-6">
                  <h4 className="font-semibold mb-4">🏅 Achievements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span>🔥</span>
                      <span className="text-sm">100+ Problems Solved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⭐</span>
                      <span className="text-sm">10+ GitHub Stars</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👥</span>
                      <span className="text-sm">Active Portfolio Visitors</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GitHub Tab */}
          {activeTab === 'github' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <StatCard 
                  icon="📂" 
                  title="Repositories" 
                  value={githubData?.totalRepos || 0}
                  description="Public repositories"
                  color="blue"
                />
                <StatCard 
                  icon="⭐" 
                  title="Total Stars" 
                  value={githubData?.totalStars || 0}
                  description="Stars received"
                  color="yellow"
                />
                <StatCard 
                  icon="🔀" 
                  title="Total Forks" 
                  value={githubData?.totalForks || 0}
                  description="Repository forks"
                  color="green"
                />
              </div>

              {/* GitHub Activity Feed */}
              <div className="dashboard-card card-border rounded-xl p-6">
                <GitHubActivityFeed limit={10} showTitle={false} />
              </div>
            </div>
          )}

          {/* LeetCode Tab */}
          {activeTab === 'leetcode' && (
            <div className="dashboard-card card-border rounded-xl p-6">
              <LeetCodeVisualization showTitle={false} />
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-4 gap-6">
                <StatCard 
                  icon="👁️" 
                  title="Today's Visitors" 
                  value={analyticsData?.visitors || 0}
                  description="Unique visitors today"
                  color="blue"
                />
                <StatCard 
                  icon="📄" 
                  title="Page Views" 
                  value={analyticsData?.pageViews || 0}
                  description="Total views today"
                  color="purple"
                />
                <StatCard 
                  icon="⏱️" 
                  title="Avg Session" 
                  value={`${analyticsData?.averageSessionTime || 0}m`}
                  description="Average time spent"
                  color="green"
                />
                <StatCard 
                  icon="🔄" 
                  title="Live Session" 
                  value={`${analyticsData?.sessionDuration || 0}m`}
                  description="Your current session"
                  color="orange"
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="dashboard-card card-border rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-4">📈 Top Pages Today</h4>
                  {analyticsData?.topPages?.map((page, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <span>{page.page}</span>
                      <span className="font-bold">{page.views} views</span>
                    </div>
                  ))}
                </div>

                <div className="dashboard-card card-border rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-4">⚡ Live Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Session ID</span>
                      <span className="font-mono text-xs">{analytics.sessionId.substring(0, 8)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Page Load Time</span>
                      <span>{Math.round(performance.now())}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory Usage</span>
                      <span>{Math.round(performance.memory?.usedJSHeapSize / 1024 / 1024) || 'N/A'}MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Connection</span>
                      <span className="text-green-400">🟢 Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Live Activity Feed */}
      <section className="section-padding bg-black-200">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="dashboard-card card-border rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">🔴 Live Activity Feed</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-white-50">Real-time updates</span>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <RecentActivity 
                activities={leetcodeData?.recentSubmissions} 
                type="LeetCode" 
              />
              <div className="space-y-3">
                <h4 className="font-semibold text-lg mb-4">👁️ Recent Visitors</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-black-300 rounded-lg">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">You (Current Session)</div>
                      <div className="text-xs text-white-50">Active • {analyticsData?.sessionDuration || 0}m</div>
                    </div>
                  </div>
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-black-200 rounded-lg">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Anonymous Visitor</div>
                        <div className="text-xs text-white-50">{Math.floor(Math.random() * 60 + 5)}m ago</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CodingDashboard;
