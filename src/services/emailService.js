import emailjs from '@emailjs/browser';

// EmailJS Configuration from environment variables
const EMAILJS_CONFIG = {
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID
};

// Initialize EmailJS only if config is available
if (EMAILJS_CONFIG.PUBLIC_KEY) {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

export const sendEmail = async (formData) => {
  try {
    // Check if EmailJS is configured
    if (!EMAILJS_CONFIG.PUBLIC_KEY || !EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID) {
      console.warn('EmailJS not configured, using fallback...');
      // Fallback: log form data (in production, you might want to send to your backend)
      console.log('Form Data:', formData);
      return {
        success: true,
        message: 'Message received! EmailJS configuration pending. Please email directly for now.',
      };
    }

    // Prepare email template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject || 'Portfolio Contact',
      message: formData.message,
      to_email: 'dkpandeya12@gmail.com',
      reply_to: formData.email,
      // Additional metadata
      sent_time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      user_agent: navigator.userAgent,
      page_url: window.location.href
    };

    console.log('Sending email with EmailJS...');

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return {
      success: true,
      message: 'Email sent successfully!',
      data: response
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      message: error.text || 'Failed to send email. Please try again.',
      error: error
    };
  }
};

// Auto-reply function
export const sendAutoReply = async (userEmail, userName) => {
  try {
    const autoReplyParams = {
      to_email: userEmail,
      to_name: userName,
      from_name: 'Dipanshu Kumar Pandey',
      message: `Hi ${userName},\n\nThank you for reaching out! I've received your message and will get back to you within 24 hours.\n\nBest regards,\nDipanshu Kumar Pandey\nFull-Stack Developer`,
      subject: 'Thank you for contacting me!'
    };

    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      'AUTO_REPLY_TEMPLATE_ID', // You'll need to create this template
      autoReplyParams
    );

    console.log('Auto-reply sent successfully');
  } catch (error) {
    console.error('Failed to send auto-reply:', error);
  }
};

export default {
  sendEmail,
  sendAutoReply,
  config: EMAILJS_CONFIG
};
