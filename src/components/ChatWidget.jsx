import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! 👋 I'm Dipanshu's AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(1);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  const quickResponses = [
    "Tell me about Dipanshu's experience",
    "What technologies does he know?",
    "Show me his best projects",
    "How can I contact him?",
    "What services does he offer?"
  ];

  const botResponses = {
    "experience": "Dipanshu has 2+ years of development experience with internships at Prishubh EdTech and Oasis Infobyte. He's worked on 10+ websites and 8+ completed projects!",
    "technologies": "He specializes in Java, React, Node.js, Spring Boot, MongoDB, MySQL, and modern web technologies. Check out his Skills page for the complete tech stack!",
    "projects": "His featured projects include a File Hider App with AES-256 encryption, a real-time Voting App, and a Video-Meet platform. Visit the Projects page to see them all!",
    "contact": "You can reach Dipanshu through the Contact page, LinkedIn, or email at dkpandeya12@gmail.com. He's always open to exciting opportunities!",
    "services": "He offers Full Stack Development, Frontend Development, Backend Development, and Database Design. Check the Services page for detailed information!",
    "default": "That's a great question! I'd recommend exploring the portfolio to learn more, or you can reach out to Dipanshu directly through the Contact page. Is there anything specific you'd like to know about his work?"
  };

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        chatRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate online users
    const interval = setInterval(() => {
      setOnlineUsers(Math.floor(Math.random() * 5) + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return botResponses.experience;
    } else if (lowerMessage.includes('tech') || lowerMessage.includes('skill') || lowerMessage.includes('language')) {
      return botResponses.technologies;
    } else if (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
      return botResponses.projects;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
      return botResponses.contact;
    } else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('hire')) {
      return botResponses.services;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 😊 Nice to meet you! I'm here to help you learn more about Dipanshu's work and experience. What would you like to know?";
    } else {
      return botResponses.default;
    }
  };

  const handleQuickResponse = (response) => {
    setInputMessage(response);
    sendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget Toggle Button */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 relative"
        >
          {isOpen ? (
            <span className="text-lg sm:text-xl">✕</span>
          ) : (
            <>
              <span className="text-lg sm:text-xl">💬</span>
              {onlineUsers > 1 && (
                <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center animate-pulse">
                  {onlineUsers}
                </div>
              )}
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatRef}
          className="fixed bottom-16 sm:bottom-24 right-4 sm:right-6 w-72 sm:w-80 h-80 sm:h-96 bg-black-200 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden border border-white/20"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 sm:p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  🤖
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base">Portfolio Assistant</div>
                  <div className="text-xs opacity-80 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="hidden sm:inline">Online • {onlineUsers} user{onlineUsers > 1 ? 's' : ''} active</span>
                    <span className="sm:hidden">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white text-lg sm:text-xl"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-2 sm:p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-black-300 text-white'
                  }`}
                >
                  <div className="text-xs sm:text-sm">{message.text}</div>
                  <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-black-300 p-3 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          {messages.length <= 2 && (
            <div className="p-2 sm:p-3 border-t border-white/10">
              <div className="text-xs text-white-50 mb-2">Quick questions:</div>
              <div className="flex flex-wrap gap-1">
                {quickResponses.slice(0, window.innerWidth < 640 ? 2 : 3).map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    className="text-xs bg-black-300 hover:bg-black-100 px-2 py-1 rounded transition-colors truncate"
                    style={{ maxWidth: '120px' }}
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <div className="p-3 sm:p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-black-300 border border-white/20 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 disabled:opacity-50 text-white px-3 sm:px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200"
              >
                🚀
              </button>
            </div>
            <div className="text-xs text-white-50 mt-2 text-center">
              <span className="hidden sm:inline">Powered by AI • Real-time responses</span>
              <span className="sm:hidden">AI-powered responses</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
