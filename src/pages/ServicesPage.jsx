import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  const [selectedPackage, setSelectedPackage] = useState("standard");

  useGSAP(() => {
    gsap.fromTo(
      ".services-hero",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
      }
    );

    gsap.fromTo(
      ".service-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        }
      }
    );
  });

  const services = [
    {
      icon: "🌐",
      title: "Web Development",
      description: "Full-stack web applications with modern frameworks",
      features: [
        "React.js Frontend Development",
        "Node.js/Express Backend",
        "Database Design & Integration",
        "RESTful API Development",
        "Responsive Design",
        "Performance Optimization"
      ],
      price: "Starting from ₹15,000"
    },
    {
      icon: "📱",
      title: "Portfolio Websites",
      description: "Professional portfolio and business websites",
      features: [
        "Custom Design & Development",
        "SEO Optimization",
        "Mobile Responsive",
        "Contact Forms",
        "Content Management",
        "Domain & Hosting Setup"
      ],
      price: "Starting from ₹8,000"
    },
    {
      icon: "🔐",
      title: "Backend Systems",
      description: "Secure and scalable backend solutions",
      features: [
        "Authentication Systems",
        "Database Architecture",
        "API Development",
        "Security Implementation",
        "Data Encryption",
        "Server Deployment"
      ],
      price: "Starting from ₹12,000"
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Modern and user-friendly interface design",
      features: [
        "Wireframe & Mockup Design",
        "User Experience Planning",
        "Interactive Prototypes",
        "Design System Creation",
        "Responsive Layouts",
        "Accessibility Standards"
      ],
      price: "Starting from ₹6,000"
    },
    {
      icon: "🔧",
      title: "Website Maintenance",
      description: "Ongoing support and maintenance services",
      features: [
        "Regular Updates",
        "Bug Fixes",
        "Performance Monitoring",
        "Security Updates",
        "Content Updates",
        "24/7 Support"
      ],
      price: "Starting from ₹3,000/month"
    },
    {
      icon: "📊",
      title: "Consultation",
      description: "Technical consultation and code reviews",
      features: [
        "Code Review & Optimization",
        "Architecture Planning",
        "Technology Selection",
        "Performance Analysis",
        "Best Practices Guide",
        "1-on-1 Mentoring"
      ],
      price: "Starting from ₹2,000/hour"
    }
  ];

  const packages = [
    {
      id: "basic",
      name: "Basic Package",
      price: "₹8,000",
      duration: "1-2 weeks",
      description: "Perfect for simple portfolio websites",
      features: [
        "5-page responsive website",
        "Basic contact form",
        "Mobile optimization",
        "1 month free support",
        "Basic SEO setup"
      ],
      popular: false
    },
    {
      id: "standard",
      name: "Standard Package", 
      price: "₹15,000",
      duration: "2-3 weeks",
      description: "Ideal for professional business websites",
      features: [
        "10-page responsive website",
        "Advanced contact forms",
        "Payment integration",
        "3 months free support",
        "Advanced SEO optimization",
        "Google Analytics setup",
        "Social media integration"
      ],
      popular: true
    },
    {
      id: "premium",
      name: "Premium Package",
      price: "₹25,000",
      duration: "3-4 weeks", 
      description: "Complete full-stack solution",
      features: [
        "Custom web application",
        "Full backend development",
        "Database design",
        "User authentication",
        "6 months free support",
        "Performance optimization",
        "Deployment & hosting setup",
        "Training & documentation"
      ],
      popular: false
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery Call",
      description: "We discuss your requirements, goals, and project scope",
      duration: "30-60 mins"
    },
    {
      step: "02", 
      title: "Proposal & Planning",
      description: "Detailed project proposal with timeline and deliverables",
      duration: "1-2 days"
    },
    {
      step: "03",
      title: "Design & Development",
      description: "Creating your project with regular updates and feedback",
      duration: "1-4 weeks"
    },
    {
      step: "04",
      title: "Testing & Launch",
      description: "Quality assurance, testing, and successful deployment",
      duration: "2-3 days"
    },
    {
      step: "05",
      title: "Support & Maintenance",
      description: "Ongoing support and maintenance as per package",
      duration: "Ongoing"
    }
  ];

  return (
    <div className="min-h-screen bg-black-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        
        <div className="services-hero text-center z-10 px-5">
          <div className="text-8xl mb-8">💼</div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            My Services
          </h1>
          <p className="text-xl md:text-2xl text-white-50 mb-8 max-w-3xl mx-auto">
            Professional web development services to bring your digital vision to life with cutting-edge technology and exceptional quality.
          </p>
          <button
            onClick={() => document.getElementById('services-content').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Explore Services 🎯
          </button>
        </div>
      </section>

      {/* Services Content */}
      <section id="services-content" className="section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          {/* Services Overview */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What I Offer</h2>
            <p className="text-xl text-white-50 max-w-4xl mx-auto">
              From concept to deployment, I provide end-to-end web development services 
              tailored to your specific needs and budget.
            </p>
          </div>

          {/* Services Grid */}
          <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="service-card card-border rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-6 text-center">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-white-50 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-white-50 flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-400 mb-4">{service.price}</div>
                  <Link
                    to="/contact"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 inline-block"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Package Pricing */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Service Packages</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`relative card-border rounded-2xl p-8 hover:scale-105 transition-transform duration-300 ${
                  pkg.popular ? 'ring-2 ring-blue-500' : ''
                }`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-bold text-blue-400 mb-2">{pkg.price}</div>
                    <p className="text-white-50 text-sm">{pkg.duration}</p>
                  </div>
                  
                  <p className="text-white-50 text-center mb-6">{pkg.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="text-white-50 flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to="/contact"
                    className={`w-full text-center py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105 inline-block ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'border border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    Choose Package
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Development Process */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Development Process</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-white-50 text-sm mb-2">{step.description}</p>
                  <span className="text-blue-400 text-xs">{step.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Me */}
          <div className="card-border rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Me?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold mb-2">Fast Delivery</h3>
                <p className="text-white-50 text-sm">Quick turnaround without compromising quality</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💎</div>
                <h3 className="font-bold mb-2">Premium Quality</h3>
                <p className="text-white-50 text-sm">Clean, efficient, and scalable code</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="font-bold mb-2">24/7 Support</h3>
                <p className="text-white-50 text-sm">Ongoing support and maintenance</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-bold mb-2">Fair Pricing</h3>
                <p className="text-white-50 text-sm">Competitive rates with transparent pricing</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-400">How long does a typical project take?</h3>
                <p className="text-white-50">
                  Project timelines vary based on complexity. Simple portfolios take 1-2 weeks, 
                  while complex web applications can take 3-4 weeks. I provide detailed timelines during planning.
                </p>
              </div>
              <div className="card-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-400">Do you provide post-launch support?</h3>
                <p className="text-white-50">
                  Yes! All packages include free support period. I also offer ongoing maintenance 
                  plans to keep your website updated and secure.
                </p>
              </div>
              <div className="card-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-green-400">Can you work with existing websites?</h3>
                <p className="text-white-50">
                  Absolutely! I can enhance, redesign, or add new features to existing websites. 
                  I work with various technologies and platforms.
                </p>
              </div>
              <div className="card-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-orange-400">What's included in the price?</h3>
                <p className="text-white-50">
                  All listed features, unlimited revisions during development, testing, 
                  deployment assistance, and the specified support period.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-white-50 mb-8 max-w-2xl mx-auto">
              Let's discuss your project requirements and find the perfect solution for your needs!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                Get Free Quote 💬
              </Link>
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

export default ServicesPage;
