// Comprehensive email configuration checker
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function comprehensiveEmailTest() {
  console.log('🔍 Comprehensive Email Configuration Test');
  console.log('==========================================');
  
  // Check environment variables
  console.log('\n📋 Environment Variables:');
  console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL || '❌ NOT SET');
  console.log('CONTACT_EMAIL_PASS:', process.env.CONTACT_EMAIL_PASS ? '✅ SET (hidden)' : '❌ NOT SET');
  console.log('SEND_EMAIL:', process.env.SEND_EMAIL || '❌ NOT SET');
  
  if (!process.env.CONTACT_EMAIL || !process.env.CONTACT_EMAIL_PASS || !process.env.SEND_EMAIL) {
    console.log('\n❌ Missing required environment variables!');
    return;
  }
  
  try {
    // Create transporter
    console.log('\n🔧 Creating email transporter...');
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });
    
    // Test connection
    console.log('\n🔍 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    
    // Send actual test email
    console.log('\n📧 Sending test email...');
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.SEND_EMAIL,
      subject: '[IEEE Website] Email Configuration Test - ' + new Date().toISOString(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center;">
            <h1>🎉 Email Configuration Test</h1>
            <p>Congratulations! Your IEEE website contact form email is working perfectly!</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Test Details:</h2>
            <p><strong>From:</strong> ${process.env.CONTACT_EMAIL}</p>
            <p><strong>To:</strong> ${process.env.SEND_EMAIL}</p>
            <p><strong>Test Date:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Status:</strong> ✅ SUCCESS</p>
          </div>
          
          <div style="background: #e8f5e8; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
            <h3 style="color: #155724; margin-top: 0;">What this means:</h3>
            <ul style="color: #155724; margin: 0;">
              <li>Gmail SMTP authentication is working</li>
              <li>App password is configured correctly</li>
              <li>Contact form emails will be delivered</li>
              <li>No action required - system is operational</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f1f1f1; border-radius: 5px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This email was sent automatically to test the IEEE Student Branch website contact form configuration.
            </p>
          </div>
        </div>
      `,
      text: `
IEEE Website Email Configuration Test

✅ SUCCESS: Your contact form email is working perfectly!

Test Details:
- From: ${process.env.CONTACT_EMAIL}
- To: ${process.env.SEND_EMAIL}
- Test Date: ${new Date().toLocaleString()}

What this means:
- Gmail SMTP authentication is working
- App password is configured correctly  
- Contact form emails will be delivered
- No action required - system is operational

This email was sent automatically to test the IEEE Student Branch website contact form configuration.
      `
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', result.messageId);
    console.log('🎯 Check the inbox for:', process.env.SEND_EMAIL);
    
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('============================');
    console.log('✅ Email configuration is working correctly');
    console.log('✅ Contact form should send emails successfully');
    console.log('✅ Check ' + process.env.SEND_EMAIL + ' for the test email');
    
  } catch (error) {
    console.log('\n❌ EMAIL TEST FAILED');
    console.log('====================');
    console.error('Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Authentication Error - Possible Solutions:');
      console.log('1. Verify the Gmail address is correct');
      console.log('2. Enable 2-Factor Authentication on Gmail');
      console.log('3. Generate a new App Password (not regular password)');
      console.log('4. Use the 16-character App Password in .env.local');
      console.log('5. Make sure "Less secure app access" is NOT enabled (use App Password instead)');
    } else if (error.code === 'ENOTFOUND') {
      console.log('\n🌐 Network Error - Check your internet connection');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n🚫 Connection Refused - Gmail SMTP might be blocked');
    }
  }
}

comprehensiveEmailTest();
