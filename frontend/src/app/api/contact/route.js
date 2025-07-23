import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure your email transport with enhanced error handling
const createTransporter = () => {
  try {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
      // Additional configuration for better reliability
      pool: true,
      maxConnections: 1,
      rateDelta: 20000,
      rateLimit: 5,
    });
  } catch (error) {
    console.error("Failed to create email transporter:", error);
    throw error;
  }
};

export async function POST(request) {
  console.log("📧 Contact form API called");
  
  try {
    const { name, email, subject, message } = await request.json();
    
    console.log("📝 Form data received:", { name, email, subject, messageLength: message.length });
    
    // Validation
    if (!name || !email || !subject || !message) {
      console.log("❌ Validation failed: Missing fields");
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("❌ Validation failed: Invalid email format");
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Message length validation
    if (message.length < 10) {
      console.log("❌ Validation failed: Message too short");
      return NextResponse.json(
        { success: false, message: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // Check environment variables
    if (!process.env.CONTACT_EMAIL || !process.env.CONTACT_EMAIL_PASS) {
      console.error("❌ Missing email environment variables");
      return NextResponse.json(
        { success: false, message: "Email service is not configured properly." },
        { status: 500 }
      );
    }

    console.log("🔧 Creating email transporter...");
    const transporter = createTransporter();

    // Test the connection first
    console.log("🔍 Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully");

    // Compose the email with better formatting
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.SEND_EMAIL || "geu.ieee.studentbranch@gmail.com",
      replyTo: email,
      subject: `[IEEE Website Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #006699; border-bottom: 2px solid #006699; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #006699; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>This message was sent via the IEEE Student Branch website contact form.</p>
            <p>Received at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent via the IEEE Student Branch website contact form.
Received at: ${new Date().toLocaleString()}
      `,
    };

    console.log("📤 Sending email...");
    console.log("From:", process.env.CONTACT_EMAIL);
    console.log("To:", process.env.SEND_EMAIL || "geu.ieee.studentbranch@gmail.com");
    
    // Send the email
    const result = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
    console.log("📧 Message ID:", result.messageId);
    console.log(`📨 Contact form submission received from ${name} (${email})`);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("❌ Contact form error:", error);
    
    // More specific error handling
    if (error.code === 'EAUTH') {
      console.error("❌ Email authentication failed");
      return NextResponse.json(
        { success: false, message: "Email authentication failed. Please try again later." },
        { status: 500 }
      );
    }
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error("❌ Email service connection failed");
      return NextResponse.json(
        { success: false, message: "Unable to connect to email service. Please try again later." },
        { status: 500 }
      );
    }

    if (error.code === 'ETIMEDOUT') {
      console.error("❌ Email service timeout");
      return NextResponse.json(
        { success: false, message: "Email service timeout. Please try again later." },
        { status: 500 }
      );
    }

    // Generic error
    console.error("❌ Full error details:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
