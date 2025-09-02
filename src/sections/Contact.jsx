import { useRef, useState } from "react";
import { sendEmail } from "../services/emailService";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";
import Notification from "../components/Notification";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Portfolio Contact",
    message: "",
  });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    
    if (!form.name || !form.email || !form.message) {
      showNotification("Please fill in all fields.", "error");
      return;
    }

    setLoading(true);

    try {
      const result = await sendEmail(form);
      
      if (result.success) {
        showNotification(
          "Thank you! Your message has been sent successfully. I'll get back to you soon!", 
          "success"
        );
        setForm({ name: "", email: "", subject: "Portfolio Contact", message: "" });
      } else {
        showNotification(
          "Failed to send message. Please try emailing me directly at dkpandeya12@gmail.com", 
          "error"
        );
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showNotification(
        "Something went wrong. Please email me directly at dkpandeya12@gmail.com", 
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === "success" ? "bg-green-500" : "bg-red-500"
        } text-white`}>
          {notification.message}
        </div>
      )}
      
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let's Connect"
          sub="💬 Have questions or ideas? Let's talk! 🚀"
        />
        
        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8 mb-16">
          <div className="card-border rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="font-semibold mb-2">Email</h3>
            <a href="mailto:dkpandeya12@gmail.com" className="text-white-50 hover:text-white transition-colors">
              dkpandeya12@gmail.com
            </a>
          </div>
          <div className="card-border rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <a href="tel:+919369190920" className="text-white-50 hover:text-white transition-colors">
              +91-9369190920
            </a>
          </div>
          <div className="card-border rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-white-50">Greater Noida, UP</p>
          </div>
        </div>
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
