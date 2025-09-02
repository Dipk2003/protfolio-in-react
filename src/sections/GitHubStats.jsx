import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const GitHubStats = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".github-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".github-container",
          start: "top 80%",
        },
      }
    );
  });

  const githubStats = [
    { label: "Public Repositories", value: "15+", icon: "📁" },
    { label: "Total Commits", value: "200+", icon: "💻" },
    { label: "Languages Used", value: "8+", icon: "🔤" },
    { label: "Years Active", value: "2+", icon: "📅" },
  ];

  const topRepositories = [
    {
      name: "file-hider-application",
      description: "Secure file storage with AES-256 encryption",
      language: "Java",
      stars: 2,
      forks: 1
    },
    {
      name: "voting-app",
      description: "Real-time voting system with JWT authentication",
      language: "JavaScript",
      stars: 3,
      forks: 0
    },
    {
      name: "video-meet-app",
      description: "Video conferencing platform with chat",
      language: "TypeScript",
      stars: 1,
      forks: 1
    }
  ];

  return (
    <section id="github" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5 github-container">
        <TitleHeader
          title="GitHub Activity & Open Source Contributions"
          sub="📊 My coding journey and repository statistics"
        />
        
        {/* GitHub Stats Cards */}
        <div className="grid md:grid-cols-4 grid-cols-2 gap-6 mt-16">
          {githubStats.map((stat, index) => (
            <div key={index} className="github-card card-border rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white-50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* GitHub Profile Integration */}
        <div className="grid lg:grid-cols-2 gap-10 mt-16">
          {/* Contribution Graph */}
          <div className="github-card card-border rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              📈 Contribution Activity
            </h3>
            <div className="bg-black-200 rounded-lg p-6 text-center">
              <img 
                src="https://github-readme-stats.vercel.app/api?username=Dipk2003&show_icons=true&theme=dark&hide_border=true&bg_color=1a1a1a&title_color=ffffff&text_color=ffffff&icon_color=00d4aa"
                alt="GitHub Stats"
                className="w-full"
              />
            </div>
          </div>

          {/* Top Languages */}
          <div className="github-card card-border rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              💻 Most Used Languages
            </h3>
            <div className="bg-black-200 rounded-lg p-6 text-center">
              <img 
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=Dipk2003&layout=compact&theme=dark&hide_border=true&bg_color=1a1a1a&title_color=ffffff&text_color=ffffff"
                alt="Top Languages"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Top Repositories */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center">🌟 Featured Repositories</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {topRepositories.map((repo, index) => (
              <div key={index} className="github-card card-border rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">{repo.name}</h4>
                  <div className="flex items-center gap-2 text-white-50 text-sm">
                    <span>⭐ {repo.stars}</span>
                    <span>🍴 {repo.forks}</span>
                  </div>
                </div>
                <p className="text-white-50 text-sm mb-4">{repo.description}</p>
                <div className="flex items-center justify-between">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                    {repo.language}
                  </span>
                  <a 
                    href={`https://github.com/Dipk2003/${repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white-50 hover:text-white transition-colors text-sm"
                  >
                    View Repository →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Profile Link */}
        <div className="text-center mt-12">
          <a 
            href="https://github.com/Dipk2003"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold py-4 px-8 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
          >
            🔗 View Full GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
