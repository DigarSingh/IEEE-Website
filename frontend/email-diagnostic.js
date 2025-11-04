// Email authentication diagnostic tool
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function diagnoseEmailAuth() {
  console.log('🔍 Email Authentication Diagnostic');
  console.log('===================================');
  
  console.log('\n📋 Current Configuration:');
  console.log('Email:', process.env.CONTACT_EMAIL);
  console.log('Password Length:', process.env.CONTACT_EMAIL_PASS ? process.env.CONTACT_EMAIL_PASS.length + ' characters' : 'Not set');
  console.log('Target Email:', process.env.SEND_EMAIL);
  
  // Test different authentication methods
  const authMethods = [
    {
      name: 'Gmail Service (Current)',
      config: {
        service: 'gmail',
        auth: {
          user: process.env.CONTACT_EMAIL,
          pass: process.env.CONTACT_EMAIL_PASS,
        },
      }
    },
    {
      name: 'Gmail SMTP Direct',
      config: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.CONTACT_EMAIL,
          pass: process.env.CONTACT_EMAIL_PASS,
        },
      }
    },
    {
      name: 'Gmail SMTP SSL',
      config: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.CONTACT_EMAIL,
          pass: process.env.CONTACT_EMAIL_PASS,
        },
      }
    }
  ];
  
  for (const method of authMethods) {
    console.log(`\n🔧 Testing: ${method.name}`);
    console.log('------------------------');
    
    try {
      const transporter = nodemailer.createTransport(method.config);
      await transporter.verify();
      console.log('✅ Authentication successful!');
      
      // If this method works, try sending a test email
      try {
        const testResult = await transporter.sendMail({
          from: process.env.CONTACT_EMAIL,
          to: process.env.SEND_EMAIL,
          subject: `[Test] Email Auth Fixed - ${new Date().toISOString()}`,
          text: `Test email sent successfully using ${method.name} at ${new Date().toLocaleString()}`,
          html: `
            <h2 style="color: green;">✅ Email Authentication Fixed!</h2>
            <p><strong>Method:</strong> ${method.name}</p>
            <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
            <p>Your IEEE website contact form is now working correctly.</p>
          `
        });
        console.log('✅ Test email sent successfully!');
        console.log('📧 Message ID:', testResult.messageId);
        
        // Update the API route to use the working configuration
        console.log(`\n🎯 Working Configuration Found: ${method.name}`);
        return method.config;
        
      } catch (sendError) {
        console.log('❌ Authentication OK, but sending failed:', sendError.message);
      }
      
    } catch (error) {
      console.log('❌ Authentication failed:', error.message);
      
      if (error.code === 'EAUTH') {
        console.log('   → This is an authentication error');
      } else if (error.code === 'ENOTFOUND') {
        console.log('   → DNS resolution failed');
      } else if (error.code === 'ECONNREFUSED') {
        console.log('   → Connection refused');
      }
    }
  }
  
  console.log('\n🚨 All authentication methods failed!');
  console.log('=====================================');
  console.log('Please follow these steps to fix:');
  console.log('');
  console.log('1. 🔐 Generate New Gmail App Password:');
  console.log('   - Go to https://myaccount.google.com/security');
  console.log('   - Enable 2-Factor Authentication if not already enabled');
  console.log('   - Go to "App passwords" section');
  console.log('   - Generate a new app password for "Mail"');
  console.log('   - Copy the 16-character password (no spaces)');
  console.log('');
  console.log('2. 📝 Update .env.local file:');
  console.log('   - Replace CONTACT_EMAIL_PASS with the new app password');
  console.log('   - Make sure to keep the quotes: CONTACT_EMAIL_PASS="your-new-password"');
  console.log('');
  console.log('3. 🔄 Restart the development server');
}

diagnoseEmailAuth();
