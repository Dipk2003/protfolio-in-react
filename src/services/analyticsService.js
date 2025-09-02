// Analytics Service for Visitor Tracking
class AnalyticsService {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.pageViews = this.getStoredPageViews();
    this.visitorCount = this.getStoredVisitorCount();
    
    // Initialize session
    this.initializeSession();
  }

  generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Initialize visitor session
  initializeSession() {
    const now = Date.now();
    const todayKey = new Date().toDateString();
    
    // Update visitor count
    const visitorData = JSON.parse(localStorage.getItem('portfolio_visitors') || '{}');
    
    if (!visitorData[todayKey]) {
      visitorData[todayKey] = { count: 0, sessions: [] };
    }
    
    // Check if this is a new session (no visit in last 30 minutes)
    const lastVisit = localStorage.getItem('portfolio_last_visit');
    const isNewSession = !lastVisit || (now - parseInt(lastVisit)) > 30 * 60 * 1000;
    
    if (isNewSession) {
      visitorData[todayKey].count += 1;
      visitorData[todayKey].sessions.push({
        sessionId: this.sessionId,
        startTime: now,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      });
    }
    
    localStorage.setItem('portfolio_visitors', JSON.stringify(visitorData));
    localStorage.setItem('portfolio_last_visit', now.toString());
    localStorage.setItem('portfolio_session_id', this.sessionId);
  }

  // Track page view
  trackPageView(pageName, pathname) {
    const pageViews = this.getStoredPageViews();
    const todayKey = new Date().toDateString();
    
    if (!pageViews[todayKey]) {
      pageViews[todayKey] = {};
    }
    
    if (!pageViews[todayKey][pageName]) {
      pageViews[todayKey][pageName] = { count: 0, paths: {} };
    }
    
    pageViews[todayKey][pageName].count += 1;
    
    if (!pageViews[todayKey][pageName].paths[pathname]) {
      pageViews[todayKey][pageName].paths[pathname] = 0;
    }
    pageViews[todayKey][pageName].paths[pathname] += 1;
    
    localStorage.setItem('portfolio_page_views', JSON.stringify(pageViews));
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('pageViewTracked', {
      detail: { pageName, pathname, timestamp: Date.now() }
    }));
  }

  // Get stored page views
  getStoredPageViews() {
    return JSON.parse(localStorage.getItem('portfolio_page_views') || '{}');
  }

  // Get stored visitor count
  getStoredVisitorCount() {
    const visitorData = JSON.parse(localStorage.getItem('portfolio_visitors') || '{}');
    const todayKey = new Date().toDateString();
    return visitorData[todayKey]?.count || 0;
  }

  // Get today's analytics
  getTodayAnalytics() {
    const todayKey = new Date().toDateString();
    const pageViews = this.getStoredPageViews();
    const visitorData = JSON.parse(localStorage.getItem('portfolio_visitors') || '{}');
    
    const todayViews = pageViews[todayKey] || {};
    const todayVisitors = visitorData[todayKey] || { count: 0, sessions: [] };
    
    return {
      visitors: todayVisitors.count,
      pageViews: Object.values(todayViews).reduce((sum, page) => sum + page.count, 0),
      sessions: todayVisitors.sessions.length,
      averageSessionTime: this.calculateAverageSessionTime(todayVisitors.sessions),
      topPages: this.getTopPages(todayViews),
      sessionDuration: Math.round((Date.now() - this.startTime) / 1000 / 60), // minutes
      isActiveSession: true
    };
  }

  // Get weekly analytics
  getWeeklyAnalytics() {
    const weekData = this.getDateRange(7);
    const pageViews = this.getStoredPageViews();
    const visitorData = JSON.parse(localStorage.getItem('portfolio_visitors') || '{}');
    
    let totalVisitors = 0;
    let totalPageViews = 0;
    const dailyStats = [];
    
    weekData.forEach(dateKey => {
      const dayVisitors = visitorData[dateKey]?.count || 0;
      const dayViews = Object.values(pageViews[dateKey] || {})
        .reduce((sum, page) => sum + page.count, 0);
      
      totalVisitors += dayVisitors;
      totalPageViews += dayViews;
      
      dailyStats.push({
        date: dateKey,
        visitors: dayVisitors,
        pageViews: dayViews
      });
    });
    
    return {
      totalVisitors,
      totalPageViews,
      dailyStats,
      averageDaily: Math.round(totalVisitors / 7)
    };
  }

  // Get all-time analytics
  getAllTimeAnalytics() {
    const pageViews = this.getStoredPageViews();
    const visitorData = JSON.parse(localStorage.getItem('portfolio_visitors') || '{}');
    
    let totalVisitors = 0;
    let totalPageViews = 0;
    const languagePreferences = {};
    const deviceTypes = {};
    
    Object.values(visitorData).forEach(dayData => {
      totalVisitors += dayData.count || 0;
      
      dayData.sessions?.forEach(session => {
        // Analyze user agent for device type
        const ua = session.userAgent || '';
        if (ua.includes('Mobile')) deviceTypes.mobile = (deviceTypes.mobile || 0) + 1;
        else if (ua.includes('Tablet')) deviceTypes.tablet = (deviceTypes.tablet || 0) + 1;
        else deviceTypes.desktop = (deviceTypes.desktop || 0) + 1;
      });
    });
    
    Object.values(pageViews).forEach(dayData => {
      Object.values(dayData).forEach(pageData => {
        totalPageViews += pageData.count || 0;
      });
    });
    
    return {
      totalVisitors,
      totalPageViews,
      deviceTypes,
      averagePageViewsPerVisitor: totalVisitors ? Math.round(totalPageViews / totalVisitors) : 0,
      topReferrers: this.getTopReferrers(),
      firstVisit: this.getFirstVisitDate()
    };
  }

  // Helper methods
  calculateAverageSessionTime(sessions) {
    if (!sessions.length) return 0;
    
    const now = Date.now();
    const totalTime = sessions.reduce((sum, session) => {
      return sum + (now - session.startTime);
    }, 0);
    
    return Math.round(totalTime / sessions.length / 1000 / 60); // minutes
  }

  getTopPages(todayViews) {
    return Object.entries(todayViews)
      .sort(([,a], [,b]) => b.count - a.count)
      .slice(0, 5)
      .map(([page, data]) => ({ page, views: data.count }));
  }

  getDateRange(days) {
    const dates = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toDateString());
    }
    return dates;
  }

  getTopReferrers() {
    const visitorData = JSON.parse(localStorage.getItem('portfolio_visitors') || '{}');
    const referrers = {};
    
    Object.values(visitorData).forEach(dayData => {
      dayData.sessions?.forEach(session => {
        const ref = session.referrer || 'direct';
        referrers[ref] = (referrers[ref] || 0) + 1;
      });
    });
    
    return Object.entries(referrers)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([referrer, count]) => ({ referrer, count }));
  }

  getFirstVisitDate() {
    const visitorData = JSON.parse(localStorage.getItem('portfolio_visitors') || '{}');
    const dates = Object.keys(visitorData).sort();
    return dates[0] || new Date().toDateString();
  }

  // Track specific events
  trackEvent(eventName, properties = {}) {
    const events = JSON.parse(localStorage.getItem('portfolio_events') || '[]');
    
    events.push({
      event: eventName,
      properties,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      page: window.location.pathname
    });
    
    // Keep only last 100 events
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }
    
    localStorage.setItem('portfolio_events', JSON.stringify(events));
    
    // Dispatch event for real-time tracking
    window.dispatchEvent(new CustomEvent('analyticsEvent', {
      detail: { eventName, properties, timestamp: Date.now() }
    }));
  }

  // Get real-time metrics that update
  getRealTimeMetrics() {
    const now = Date.now();
    const sessionDuration = Math.round((now - this.startTime) / 1000 / 60);
    
    return {
      currentSession: {
        duration: sessionDuration,
        sessionId: this.sessionId,
        startTime: new Date(this.startTime).toLocaleTimeString(),
        isActive: true
      },
      live: {
        timestamp: now,
        pageLoadTime: performance.now(),
        memoryUsage: performance.memory ? {
          used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024)
        } : null
      }
    };
  }

  // Export data for admin dashboard
  exportAnalyticsData() {
    return {
      pageViews: this.getStoredPageViews(),
      visitors: JSON.parse(localStorage.getItem('portfolio_visitors') || '{}'),
      events: JSON.parse(localStorage.getItem('portfolio_events') || '[]'),
      session: this.getRealTimeMetrics()
    };
  }

  // Clear old data (cleanup function)
  cleanupOldData(daysToKeep = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    ['portfolio_visitors', 'portfolio_page_views'].forEach(key => {
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      const cleanedData = {};
      
      Object.keys(data).forEach(dateKey => {
        if (new Date(dateKey) >= cutoffDate) {
          cleanedData[dateKey] = data[dateKey];
        }
      });
      
      localStorage.setItem(key, JSON.stringify(cleanedData));
    });
  }
}

// Create singleton instance
const analytics = new AnalyticsService();

// Auto-cleanup old data on initialization
analytics.cleanupOldData();

export default analytics;
