// Test the API route directly
const testData = {
  name: "Test User",
  email: "test@example.com",
  subject: "Test Contact Form",
  message: "This is a test message to verify the contact form API is working correctly."
};

async function testContactAPI() {
  try {
    console.log('Testing contact API at http://localhost:3001/api/contact...');
    
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', data);
    
    if (response.ok && data.success) {
      console.log('✅ API test successful! Email should be sent.');
    } else {
      console.log('❌ API test failed:', data.message);
    }
    
  } catch (error) {
    console.error('❌ API test error:', error.message);
  }
}

testContactAPI();
