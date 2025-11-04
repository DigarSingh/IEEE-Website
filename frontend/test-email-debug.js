// Test email functionality directly
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmailConfig() {
  console.log('Testing email configuration...');
  console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);
  console.log('SEND_EMAIL:', process.env.SEND_EMAIL);
  
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    // Verify the connection
    await transporter.verify();
    console.log('✅ Email server connection verified successfully!');
    
    // Send a test email
    const testMessage = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.SEND_EMAIL,
      subject: '[Test] IEEE Contact Form Email Configuration',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #006699;">Email Configuration Test</h2>
          <p>This is a test email to verify the contact form email configuration is working.</p>
          <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>From:</strong> ${process.env.CONTACT_EMAIL}</p>
          <p><strong>To:</strong> ${process.env.SEND_EMAIL}</p>
        </div>
      `,
      text: `
Email Configuration Test

This is a test email to verify the contact form email configuration is working.

Sent at: ${new Date().toLocaleString()}
From: ${process.env.CONTACT_EMAIL}
To: ${process.env.SEND_EMAIL}
      `
    };

    const result = await transporter.sendMail(testMessage);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);
    
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.error('❌ Authentication failed. Please check:');
      console.error('   1. Email address is correct');
      console.error('   2. App password is correct (not regular password)');
      console.error('   3. 2-factor authentication is enabled on Gmail');
      console.error('   4. App passwords are enabled');
    } else if (error.code === 'ENOTFOUND') {
      console.error('❌ DNS resolution failed. Check your internet connection.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ Connection refused. Gmail SMTP might be blocked.');
    } else {
      console.error('❌ Full error details:', error);
    }
  }
}

testEmailConfig();
