import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { sendEmail, sendAutoReply } from "../services/emailService";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const formRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      ".contact-hero",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      ".contact-section",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".contact-content",
          start: "top 80%",
        }
      }
    );
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!form.name || !form.email || !form.subject || !form.message) {
      showNotification("Please fill in all fields.", "error");
      return;
    }

    setLoading(true);

    try {
      // Send email using EmailJS
      const result = await sendEmail(form);
      
      if (result.success) {
        showNotification(
          "Thank you! Your message has been sent successfully. I'll get back to you within 24 hours!", 
          "success"
        );
        
        // Send auto-reply to user
        await sendAutoReply(form.email, form.name);
        
        // Reset form
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        showNotification(
          result.message || "Failed to send message. Please try emailing me directly.", 
          "error"
        );
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showNotification(
        "Something went wrong. Please try again or email me directly at dkpandeya12@gmail.com", 
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "dkpandeya12@gmail.com",
      link: "mailto:dkpandeya12@gmail.com",
      description: "Send me an email anytime"
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "linkedin.com/in/dipanshu-kr.-pandey",
      link: "https://linkedin.com/in/dipanshu-kr.-pandey",
      description: "Connect professionally"
    },
    {
      icon: "🐙",
      title: "GitHub",
      value: "github.com/Dipk2003",
      link: "https://github.com/Dipk2003",
      description: "Check out my code"
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+91 XXX-XXX-XXXX",
      link: "tel:+91XXXXXXXXXX",
      description: "Call for urgent matters"
    }
  ];

  const availability = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM", status: "Available" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM", status: "Limited" },
    { day: "Sunday", time: "Emergency Only", status: "Limited" }
  ];

  return (
    <div className="min-h-screen bg-black-100">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === "success" ? "bg-green-500" : "bg-red-500"
        } text-white`}>
          {notification.message}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        <div className="contact-hero text-center z-10 px-5">
          <div className="text-8xl mb-8">📞</div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Contact Me
          </h1>
          <p className="text-xl md:text-2xl text-white-50 mb-8 max-w-3xl mx-auto">
            Let's connect and discuss how we can work together to bring your ideas to life. I'm always excited about new opportunities!
          </p>
          <button
            onClick={() => document.getElementById('contact-content').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Get In Touch 📧
          </button>
        </div>
      </section>

      {/* Contact Content */}
      <section id="contact-content" className="section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          {/* Contact Overview */}
          <div className="contact-section text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Start a Conversation</h2>
            <p className="text-xl text-white-50 max-w-4xl mx-auto">
              Whether you have a project in mind, want to collaborate, or just want to say hello, 
              I'd love to hear from you. Choose your preferred way to connect!
            </p>
          </div>

          {/* Contact Methods */}
          <div className="contact-section mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Contact Methods</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-border rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                  <p className="text-blue-400 text-sm mb-2">{method.value}</p>
                  <p className="text-white-50 text-xs">{method.description}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-section mb-16">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Send Me a Message 📝</h2>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-black-200 border border-white/10 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-black-200 border border-white/10 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full p-4 bg-black-200 border border-white/10 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full p-4 bg-black-200 border border-white/10 rounded-lg focus:border-blue-400 focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project or just say hello!"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Message 🚀"}
                  </button>
                </form>
              </div>

              {/* Availability & Info */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Availability ⏰</h2>
                <div className="card-border rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">Response Time</h3>
                  <div className="space-y-3">
                    {availability.map((avail, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{avail.day}</div>
                          <div className="text-white-50 text-sm">{avail.time}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          avail.status === "Available" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {avail.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-border rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                  <div className="space-y-3 text-white-50">
                    <div>⚡ Usually respond within 24 hours</div>
                    <div>🌍 Available for remote work</div>
                    <div>💻 Open to freelance projects</div>
                    <div>🤝 Love collaborating on innovative ideas</div>
                    <div>📞 Available for video calls</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="contact-section mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">What services do you offer?</h3>
                <p className="text-white-50">
                  I specialize in full-stack web development, including frontend (React, JavaScript), 
                  backend (Node.js, Java), and database design. I also offer consultation and code reviews.
                </p>
              </div>
              <div className="card-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-400">What's your typical project timeline?</h3>
                <p className="text-white-50">
                  Project timelines vary based on complexity. Small projects: 1-2 weeks, 
                  medium projects: 3-4 weeks, large projects: 1-2 months. I always provide detailed estimates.
                </p>
              </div>
              <div className="card-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-green-400">Do you work remotely?</h3>
                <p className="text-white-50">
                  Yes! I'm comfortable with remote work and have experience collaborating with teams 
                  across different time zones using modern communication tools.
                </p>
              </div>
              <div className="card-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-orange-400">What's your development process?</h3>
                <p className="text-white-50">
                  I follow agile methodology with regular updates, code reviews, testing, 
                  and client feedback integration throughout the development process.
                </p>
              </div>
            </div>
          </div>

          {/* Project Types */}
          <div className="contact-section mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Project Types I Love Working On</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-border rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">🌐</div>
                <h3 className="text-2xl font-bold mb-3">Web Applications</h3>
                <p className="text-white-50">
                  Full-stack web apps with modern frameworks, responsive design, and robust backends.
                </p>
              </div>
              <div className="card-border rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">🔐</div>
                <h3 className="text-2xl font-bold mb-3">Secure Systems</h3>
                <p className="text-white-50">
                  Authentication systems, data encryption, and secure API development.
                </p>
              </div>
              <div className="card-border rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-2xl font-bold mb-3">Portfolio Websites</h3>
                <p className="text-white-50">
                  Professional portfolios and business websites with modern design.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-white-50 mb-8 max-w-2xl mx-auto">
              I'm excited to learn about your project and discuss how we can work together to achieve your goals!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:dkpandeya12@gmail.com"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                Email Me Directly 📧
              </a>
              <Link
                to="/projects"
                className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                View My Work 🚀
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
