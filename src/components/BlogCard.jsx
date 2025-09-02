import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogCard = ({ article, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      `.blog-card-${index}`,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        delay: index * 0.2,
        ease: "power2.out" 
      }
    );
  });

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    
    // Animate the expansion
    if (!isExpanded) {
      gsap.to(`.blog-content-${index}`, {
        height: "auto",
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  return (
    <article className={`blog-card-${index} card-border rounded-xl p-6 mb-6`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              article.category === 'tutorial' ? 'bg-blue-500/20 text-blue-400' :
              article.category === 'project' ? 'bg-green-500/20 text-green-400' :
              article.category === 'learning' ? 'bg-purple-500/20 text-purple-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {article.category.toUpperCase()}
            </span>
            <span className="text-white-50 text-sm">{article.readTime} min read</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
          <p className="text-white-50">{article.excerpt}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-white-50 text-sm">{article.date}</span>
          <div className="flex items-center gap-1 text-white-50 text-sm">
            <span>👁️</span>
            <span>{article.views}</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags.map((tag, tagIndex) => (
          <span 
            key={tagIndex}
            className="bg-black-200 text-white-50 px-2 py-1 rounded text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Expandable Content */}
      <div className={`blog-content-${index} overflow-hidden transition-all duration-500 ${
        isExpanded ? 'max-h-none' : 'max-h-0'
      }`}>
        <div className="border-t border-gray-600 pt-4 mt-4">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            className="prose prose-invert max-w-none"
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Read More Button */}
      <button
        onClick={toggleExpanded}
        className="mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
      >
        {isExpanded ? '📖 Read Less' : '👆 Read More'}
      </button>
    </article>
  );
};

export default BlogCard;
