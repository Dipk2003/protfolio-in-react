import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const RealTimeData = () => {
  const [cryptoData, setCryptoData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [codingStats, setCodingStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useGSAP(() => {
    gsap.fromTo(
      ".data-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".realtime-container",
          start: "top 80%",
        },
      }
    );
  });

  useEffect(() => {
    // Simulate real-time data fetching
    const fetchRealTimeData = async () => {
      setLoading(true);
      
      // Simulate API calls with mock data
      setTimeout(() => {
        setCryptoData({
          bitcoin: { price: 43250.67, change: +2.45 },
          ethereum: { price: 2890.34, change: -1.23 },
          solana: { price: 178.92, change: +5.67 }
        });
        
        setWeatherData({
          location: "Greater Noida",
          temperature: 28,
          condition: "Sunny",
          humidity: 65,
          windSpeed: 12
        });
        
        setCodingStats({
          todayHours: 4.2,
          weekHours: 28.5,
          mostUsedLanguage: "Java",
          currentStreak: 15
        });
        
        setLoading(false);
      }, 2000);
    };

    fetchRealTimeData();
    
    // Update every 30 seconds
    const interval = setInterval(fetchRealTimeData, 30000);
    return () => clearInterval(interval);
  }, []);

  const LiveDataCard = ({ title, icon, children, isLoading }) => (
    <div className="data-card card-border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        {isLoading && <div className="animate-spin text-blue-400">⏳</div>}
      </div>
      {children}
    </div>
  );

  return (
    <section id="realtime" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5 realtime-container">
        <TitleHeader
          title="Real-Time Data Integration"
          sub="📡 Live data feeds showcasing API integration skills"
        />
        
        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {/* Cryptocurrency Prices */}
          <LiveDataCard title="Crypto Tracker" icon="₿" isLoading={loading}>
            {cryptoData ? (
              <div className="space-y-3">
                {Object.entries(cryptoData).map(([crypto, data]) => (
                  <div key={crypto} className="flex items-center justify-between">
                    <span className="font-medium capitalize">{crypto}</span>
                    <div className="text-right">
                      <div className="font-bold">${data.price.toLocaleString()}</div>
                      <div className={`text-sm ${data.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {data.change > 0 ? '↗️' : '↘️'} {Math.abs(data.change)}%
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-xs text-white-50 mt-4">
                  🔄 Updates every 30 seconds
                </div>
              </div>
            ) : (
              <div className="text-center text-white-50">Loading crypto data...</div>
            )}
          </LiveDataCard>

          {/* Weather Data */}
          <LiveDataCard title="Local Weather" icon="🌤️" isLoading={loading}>
            {weatherData ? (
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold">{weatherData.temperature}°C</div>
                  <div className="text-lg">{weatherData.condition}</div>
                  <div className="text-sm text-white-50">📍 {weatherData.location}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-sm text-white-50">Humidity</div>
                    <div className="font-bold">{weatherData.humidity}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-white-50">Wind</div>
                    <div className="font-bold">{weatherData.windSpeed} km/h</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white-50">Loading weather data...</div>
            )}
          </LiveDataCard>

          {/* Coding Statistics */}
          <LiveDataCard title="Coding Stats" icon="⌨️" isLoading={loading}>
            {codingStats ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{codingStats.todayHours}h</div>
                  <div className="text-sm text-white-50">Today's Coding</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white-50">This Week</span>
                    <span className="font-medium">{codingStats.weekHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white-50">Top Language</span>
                    <span className="font-medium">{codingStats.mostUsedLanguage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white-50">Current Streak</span>
                    <span className="font-medium">🔥 {codingStats.currentStreak} days</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white-50">Loading coding stats...</div>
            )}
          </LiveDataCard>
        </div>

        {/* API Integration Showcase */}
        <div className="mt-16 card-border rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">🔌 API Integration Capabilities</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🌐</div>
              <h4 className="font-semibold">REST APIs</h4>
              <p className="text-white-50 text-sm">GET, POST, PUT, DELETE</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold">WebSockets</h4>
              <p className="text-white-50 text-sm">Real-time communication</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔑</div>
              <h4 className="font-semibold">Authentication</h4>
              <p className="text-white-50 text-sm">JWT, OAuth, API Keys</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-semibold">Data Processing</h4>
              <p className="text-white-50 text-sm">JSON, XML, CSV parsing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealTimeData;
