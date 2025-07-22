import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure your email transport (use environment variables in production)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CONTACT_EMAIL || "geu.ieee.studenbranch@gmail.com",
    pass: process.env.CONTACT_EMAIL_PASS || "your_app_password_here",
  },
});

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Compose the email
    const mailOptions = {
      from: email,
      to: process.env.SEND_EMAIL || "geu.ieee.studenbranch@gmail.com",
      subject: `[IEEE Website Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message." },
      { status: 500 }
    );
  }
}
