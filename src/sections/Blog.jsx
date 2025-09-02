import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import BlogCard from "../components/BlogCard";

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  useGSAP(() => {
    gsap.fromTo(
      ".blog-container",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".blog-section",
          start: "top 80%",
        },
      }
    );
  });

  const articles = [
    {
      title: "Building Secure File Storage with AES-256 Encryption",
      excerpt: "A deep dive into implementing enterprise-level security for file storage applications using Java and MySQL.",
      category: "project",
      date: "Dec 15, 2024",
      readTime: 8,
      views: 247,
      tags: ["Java", "Security", "AES", "MySQL", "Encryption"],
      content: `# Building Secure File Storage with AES-256 Encryption

## Overview
In this article, I'll walk you through the implementation of a secure file storage system that I built during my recent project.

## Key Features Implemented

### 1. AES-256 Encryption
\`\`\`java
public class FileEncryption {
    private static final String ALGORITHM = "AES";
    private static final String TRANSFORMATION = "AES/GCM/NoPadding";
    
    public static byte[] encrypt(byte[] data, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        cipher.init(Cipher.ENCRYPT_MODE, key);
        return cipher.doFinal(data);
    }
}
\`\`\`

### 2. Database Security
- Implemented secure password hashing using BCrypt
- Email authentication with JavaMail API
- User session management with JWT tokens

### 3. Performance Optimization
- Handled up to 50 files and 10 users simultaneously
- Optimized database queries for faster retrieval
- Implemented efficient file chunking for large uploads

## Challenges Faced
1. **Memory Management**: Handling large file uploads without memory overflow
2. **Security**: Ensuring no sensitive data leaks in logs
3. **Performance**: Maintaining fast encryption/decryption speeds

## Results
- ✅ 100% secure file storage
- ✅ Sub-second encryption/decryption
- ✅ Zero security vulnerabilities in testing
- ✅ Scalable architecture for future expansion`
    },
    {
      title: "Real-Time Voting System: WebSockets + JWT Authentication",
      excerpt: "How I built a scalable voting platform handling 20+ concurrent users with real-time updates under 300ms.",
      category: "tutorial",
      date: "Nov 28, 2024",
      readTime: 12,
      views: 189,
      tags: ["Node.js", "WebSockets", "JWT", "MongoDB", "Real-time"],
      content: `# Real-Time Voting System Implementation

## Architecture Overview
Built using Node.js, Express.js, MongoDB, and WebSockets for real-time communication.

## Technical Implementation

### 1. WebSocket Setup
\`\`\`javascript
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('vote', async (voteData) => {
    // Process vote and broadcast update
    const result = await processVote(voteData);
    io.emit('voteUpdate', result);
  });
});
\`\`\`

### 2. JWT Authentication
- Secure token-based authentication
- Role-based access control (voter/admin)
- Token refresh mechanism

### 3. Real-Time Performance
- Achieved sub-300ms latency for vote updates
- Handled 20+ concurrent connections
- Optimized database queries for real-time updates

## Key Learnings
- WebSocket connection management
- Database optimization for real-time applications
- Scalable authentication patterns`
    },
    {
      title: "My Journey: From Student to Full Stack Developer",
      excerpt: "Reflecting on my internship experiences, projects built, and key lessons learned in web development.",
      category: "learning",
      date: "Oct 10, 2024",
      readTime: 6,
      views: 312,
      tags: ["Career", "Internship", "Learning", "Development", "Experience"],
      content: `# My Development Journey

## The Beginning
Started my Computer Science journey at Mangalmay Institute with curiosity about how websites work.

## Key Milestones

### 🎓 Academic Foundation
- Data Structures & Algorithms
- Object-Oriented Programming
- Database Management Systems
- Software Development Life Cycle

### 💼 Professional Experience

#### Prishubh EdTech (May - Aug 2024)
- Led creation of 7+ custom websites
- Achieved 20% increase in client leads
- Improved deployment efficiency by 15%

#### Oasis Infobyte (Oct - Nov 2023)
- Built 5+ responsive portfolio websites
- Received positive client feedback
- Mastered HTML, CSS, JavaScript fundamentals

### 🚀 Project Highlights
1. **File Hider Application** - Security-focused backend
2. **Voting App** - Real-time system with WebSockets
3. **Video-Meet App** - Scalable video conferencing

## What's Next?
- Exploring microservices architecture
- Learning Docker and Kubernetes
- Building larger scale applications
- Contributing to open source projects

*The journey continues...*`
    }
  ];

  const categories = ["all", "tutorial", "project", "learning"];

  const filteredArticles = selectedCategory === "all" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <section id="blog" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5 blog-section">
        <TitleHeader
          title="Technical Blog & Learning Journey"
          sub="📝 Sharing knowledge and documenting my development experience"
        />
        
        <div className="blog-container mt-16">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-black-200 text-white-50 hover:bg-black-50'
                }`}
              >
                {category === "all" ? "🌐 All Articles" :
                 category === "tutorial" ? "📚 Tutorials" :
                 category === "project" ? "🚀 Projects" :
                 "🌱 Learning"}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="max-w-4xl mx-auto">
            {filteredArticles.map((article, index) => (
              <BlogCard 
                key={index}
                article={article}
                index={index}
              />
            ))}
          </div>

          {/* Blog Stats */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            <div className="card-border rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">📝</div>
              <div className="text-2xl font-bold">{articles.length}</div>
              <div className="text-white-50">Articles Published</div>
            </div>
            <div className="card-border rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">👁️</div>
              <div className="text-2xl font-bold">{articles.reduce((sum, article) => sum + article.views, 0)}</div>
              <div className="text-white-50">Total Views</div>
            </div>
            <div className="card-border rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">⏱️</div>
              <div className="text-2xl font-bold">{articles.reduce((sum, article) => sum + article.readTime, 0)}</div>
              <div className="text-white-50">Minutes of Content</div>
            </div>
            <div className="card-border rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🏷️</div>
              <div className="text-2xl font-bold">{[...new Set(articles.flatMap(a => a.tags))].length}</div>
              <div className="text-white-50">Unique Tags</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
