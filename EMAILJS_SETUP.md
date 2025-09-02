# 📧 EmailJS Setup Instructions

Follow these steps to make your contact form functional and receive emails directly to your Gmail.

## 🚀 Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## 📮 Step 2: Add Email Service (Gmail)

1. In your EmailJS dashboard, go to **"Services"**
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Connect your Gmail account (`dkpandeya12@gmail.com`)
5. Copy the **Service ID** (something like `service_abc123`)

## 📝 Step 3: Create Email Template

1. Go to **"Templates"** in EmailJS dashboard
2. Click **"Create New Template"**
3. Use this template structure:

### Main Contact Template:
```
Subject: {{subject}} - Portfolio Contact from {{from_name}}

Hi Dipanshu,

You have received a new message from your portfolio website!

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Additional Info:
Sent Time: {{sent_time}}
Page URL: {{page_url}}

---
Reply directly to: {{reply_to}}
```

4. Copy the **Template ID** (something like `template_xyz789`)

## 🔑 Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Copy your **Public Key** (something like `user_abcdef123`)

## ⚙️ Step 5: Add Environment Variables

1. Create a `.env` file in your project root:

```env
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
```

2. Replace the placeholder values with your actual EmailJS keys

## 🔄 Step 6: Optional Auto-Reply Template

Create another template for auto-replies to users:

### Auto-Reply Template:
```
Subject: Thank you for contacting me!

Hi {{to_name}},

Thank you for reaching out through my portfolio! I've received your message and will get back to you within 24 hours.

I appreciate your interest and look forward to connecting with you.

Best regards,
Dipanshu Kumar Pandey
Full-Stack Developer

---
This is an automated response. Please do not reply to this email.
```

Add the auto-reply template ID to your `.env`:
```env
VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID=your_auto_reply_template_id
```

## 🎯 Step 7: Test Your Setup

1. Restart your development server: `npm run dev`
2. Go to your contact page: `http://localhost:5174/contact`
3. Fill out the form and submit
4. Check your Gmail for the test email!

## 📋 Email Template Variables

Your EmailJS template can use these variables:

- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Email subject
- `{{message}}` - Message content
- `{{sent_time}}` - When the email was sent
- `{{page_url}}` - Portfolio page URL
- `{{reply_to}}` - Reply email address

## 🔒 Security Notes

1. Never commit your `.env` file to Git
2. Keep your EmailJS keys secure
3. Monitor your EmailJS usage to avoid quota limits
4. Set up spam protection if needed

## 🚨 Troubleshooting

- **"EmailJS not configured"**: Check your `.env` file and restart server
- **"Failed to send"**: Verify your Service ID and Template ID
- **"Network error"**: Check your internet connection
- **"Invalid template"**: Ensure template variables match your setup

## 💡 Pro Tips

1. **Test in incognito mode** to simulate real user experience
2. **Check spam folder** for test emails
3. **Set up email filters** to organize portfolio messages
4. **Monitor EmailJS dashboard** for sent email analytics

---

Once configured, your contact form will:
✅ Send emails directly to your Gmail
✅ Show success/error notifications  
✅ Send auto-reply to users
✅ Include metadata for tracking
✅ Work on both contact page and home contact section
