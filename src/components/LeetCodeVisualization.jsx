import { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { fetchLeetCodeDashboard } from '../services/leetcodeService';

const LeetCodeVisualization = ({ showTitle = true }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('difficulty');

  useGSAP(() => {
    gsap.fromTo(
      '.chart-item',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );

    // Animate progress bars
    gsap.fromTo(
      '.progress-fill',
      { width: 0 },
      {
        width: (i, element) => element.dataset.width,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.2
      }
    );
  });

  useEffect(() => {
    loadLeetCodeData();
  }, []);

  const loadLeetCodeData = async () => {
    try {
      const leetcodeData = await fetchLeetCodeDashboard();
      setData(leetcodeData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading LeetCode data:', error);
      setLoading(false);
    }
  };

  const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, color = '#3b82f6' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">{percentage}%</div>
            <div className="text-xs text-white-50">Complete</div>
          </div>
        </div>
      </div>
    );
  };

  const DifficultyChart = ({ stats }) => {
    const difficulties = [
      { name: 'Easy', count: stats?.easySolved || 0, total: 200, color: '#22c55e' },
      { name: 'Medium', count: stats?.mediumSolved || 0, total: 200, color: '#eab308' },
      { name: 'Hard', count: stats?.hardSolved || 0, total: 100, color: '#ef4444' }
    ];

    const maxHeight = 200;
    const maxCount = Math.max(...difficulties.map(d => d.count), 1);

    return (
      <div className="space-y-6">
        {/* Bar Chart */}
        <div className="flex items-end justify-center gap-8 h-64">
          {difficulties.map((diff, index) => {
            const height = (diff.count / maxCount) * maxHeight;
            const percentage = Math.round((diff.count / diff.total) * 100);
            
            return (
              <div key={diff.name} className="chart-item flex flex-col items-center">
                <div className="text-sm font-medium mb-2">{diff.count}</div>
                <div 
                  className="w-16 bg-gradient-to-t rounded-t-lg transition-all duration-1000 ease-out"
                  style={{ 
                    height: `${height}px`,
                    backgroundImage: `linear-gradient(to top, ${diff.color}, ${diff.color}88)`
                  }}
                />
                <div className="mt-2 text-center">
                  <div className="font-semibold">{diff.name}</div>
                  <div className="text-xs text-white-50">{percentage}%</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bars */}
        <div className="space-y-4">
          {difficulties.map((diff, index) => {
            const percentage = Math.round((diff.count / diff.total) * 100);
            return (
              <div key={diff.name} className="chart-item">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{diff.name} Problems</span>
                  <span className="text-sm">{diff.count}/{diff.total}</span>
                </div>
                <div className="w-full bg-black-200 rounded-full h-3">
                  <div 
                    className="progress-fill h-3 rounded-full transition-all duration-1000"
                    data-width={`${percentage}%`}
                    style={{ 
                      background: `linear-gradient(to right, ${diff.color}, ${diff.color}88)`,
                      width: `${percentage}%`
                    }}
                  />
                </div>
                <div className="text-xs text-white-50 mt-1">{percentage}% Complete</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const StreakVisualization = ({ stats }) => {
    const currentStreak = stats?.currentStreak || 0;
    const longestStreak = stats?.longestStreak || 0;
    
    // Generate mock weekly data
    const weeklyData = Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      solved: Math.floor(Math.random() * 5) + 1
    }));

    return (
      <div className="space-y-6">
        {/* Streak Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="chart-item">
              <CircularProgress 
                percentage={Math.min((currentStreak / 30) * 100, 100)} 
                color="#f59e0b"
              />
              <div className="mt-4">
                <div className="text-2xl font-bold text-orange-400">{currentStreak}</div>
                <div className="text-sm text-white-50">Current Streak</div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="chart-item">
              <CircularProgress 
                percentage={Math.min((longestStreak / 50) * 100, 100)} 
                color="#8b5cf6"
              />
              <div className="mt-4">
                <div className="text-2xl font-bold text-purple-400">{longestStreak}</div>
                <div className="text-sm text-white-50">Longest Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="chart-item">
          <h4 className="font-semibold mb-4 text-center">📅 This Week's Activity</h4>
          <div className="flex items-end justify-center gap-4 h-32">
            {weeklyData.map((day, index) => {
              const height = (day.solved / 5) * 100;
              return (
                <div key={day.day} className="flex flex-col items-center">
                  <div className="text-xs mb-2">{day.solved}</div>
                  <div 
                    className="w-8 bg-gradient-to-t from-green-500 to-green-400 rounded-t transition-all duration-1000"
                    style={{ height: `${height}px` }}
                  />
                  <div className="text-xs text-white-50 mt-2">{day.day}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const ContestVisualization = ({ contests }) => {
    const recentContests = contests?.recentContests || [];
    const currentRating = contests?.currentRating || 0;
    const maxRating = contests?.maxRating || 0;

    return (
      <div className="space-y-6">
        {/* Rating Progress */}
        <div className="text-center chart-item">
          <CircularProgress 
            percentage={Math.min((currentRating / 2000) * 100, 100)} 
            color="#ec4899"
            size={140}
          />
          <div className="mt-4">
            <div className="text-3xl font-bold text-pink-400">{currentRating}</div>
            <div className="text-sm text-white-50">Contest Rating</div>
            <div className="text-xs text-white-50 mt-1">Max: {maxRating}</div>
          </div>
        </div>

        {/* Contest History */}
        <div className="chart-item">
          <h4 className="font-semibold mb-4">🏆 Recent Contest Performance</h4>
          <div className="space-y-3">
            {recentContests.slice(0, 3).map((contest, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black-200 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{contest.name}</div>
                  <div className="text-xs text-white-50">Rank: {contest.rank}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-pink-400">{contest.rating}</div>
                  <div className="text-xs text-white-50">{contest.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        {contests?.badges && (
          <div className="chart-item">
            <h4 className="font-semibold mb-4">🏅 Achievement Badges</h4>
            <div className="grid grid-cols-2 gap-3">
              {contests.badges.map((badge, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg text-center ${
                    badge.earned ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30' : 'bg-black-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className={`text-sm font-medium ${badge.earned ? 'text-yellow-400' : 'text-white-50'}`}>
                    {badge.name}
                  </div>
                  {badge.earned && <div className="text-xs text-green-400 mt-1">✅ Earned</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {showTitle && <h3 className="text-xl font-bold mb-4">🔄 Loading LeetCode Data...</h3>}
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-600 rounded-lg"></div>
            ))}
          </div>
          <div className="h-48 bg-gray-600 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-white-50">Unable to load LeetCode data</p>
        <p className="text-xs text-white-50 mt-2">Please check your internet connection</p>
      </div>
    );
  }

  return (
    <div className="leetcode-visualization">
      {showTitle && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            🧠 LeetCode Progress Visualization
          </h3>
          <div className="flex gap-2">
            {['difficulty', 'streak', 'contest'].map((chart) => (
              <button
                key={chart}
                onClick={() => setActiveChart(chart)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeChart === chart
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-white-50 hover:text-white hover:bg-black-200'
                }`}
              >
                {chart.charAt(0).toUpperCase() + chart.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="chart-item bg-black-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{data.stats?.totalSolved || 0}</div>
          <div className="text-sm text-white-50">Problems Solved</div>
        </div>
        <div className="chart-item bg-black-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{data.stats?.acceptanceRate || 0}%</div>
          <div className="text-sm text-white-50">Acceptance Rate</div>
        </div>
        <div className="chart-item bg-black-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-400">{data.stats?.currentStreak || 0}</div>
          <div className="text-sm text-white-50">Current Streak</div>
        </div>
        <div className="chart-item bg-black-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{data.contests?.currentRating || 0}</div>
          <div className="text-sm text-white-50">Contest Rating</div>
        </div>
      </div>

      {/* Chart Content */}
      <div className="bg-black-200 rounded-xl p-6">
        {activeChart === 'difficulty' && (
          <div>
            <h4 className="text-xl font-semibold mb-6 text-center">📊 Problem Difficulty Distribution</h4>
            <DifficultyChart stats={data.stats} />
          </div>
        )}

        {activeChart === 'streak' && (
          <div>
            <h4 className="text-xl font-semibold mb-6 text-center">🔥 Solving Streaks & Activity</h4>
            <StreakVisualization stats={data.stats} />
          </div>
        )}

        {activeChart === 'contest' && (
          <div>
            <h4 className="text-xl font-semibold mb-6 text-center">🏆 Contest Performance</h4>
            <ContestVisualization contests={data.contests} />
          </div>
        )}
      </div>

      {/* Quick Insights */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="chart-item card-border rounded-lg p-4">
          <h4 className="font-semibold mb-3">💡 Strengths</h4>
          <div className="space-y-2">
            {data.summary?.strengthAreas?.map((area, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                <span className="text-sm">{area}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-item card-border rounded-lg p-4">
          <h4 className="font-semibold mb-3">🚀 Next Focus Areas</h4>
          <div className="space-y-2">
            {data.summary?.improvementAreas?.map((area, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-blue-400">🎯</span>
                <span className="text-sm">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Milestone */}
      <div className="mt-6 chart-item card-border rounded-lg p-6 text-center">
        <h4 className="font-semibold mb-3">🎯 Next Milestone</h4>
        <div className="text-3xl mb-2">🏃‍♂️</div>
        <div className="text-lg font-bold">
          {data.summary?.nextMilestone - (data.stats?.totalSolved || 0)} problems to go
        </div>
        <div className="text-sm text-white-50">
          Target: {data.summary?.nextMilestone} problems solved
        </div>
        <div className="mt-4">
          <div className="w-full bg-black-300 rounded-full h-2">
            <div 
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
              style={{ 
                width: `${Math.min(((data.stats?.totalSolved || 0) / data.summary?.nextMilestone) * 100, 100)}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeVisualization;
