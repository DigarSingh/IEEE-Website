// Test the enhanced contact API
const testContactForm = async () => {
  const testData = {
    name: "Debug Test User",
    email: "test@example.com", 
    subject: "Testing Enhanced Email API",
    message: "This is a test message to verify the enhanced contact form API with better error handling and logging."
  };

  try {
    console.log('🧪 Testing enhanced contact API...');
    console.log('URL: http://localhost:3000/api/contact');
    console.log('Data:', testData);
    
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    
    console.log('\n📊 Response Status:', response.status);
    console.log('📊 Response Data:', result);
    
    if (response.ok && result.success) {
      console.log('\n✅ SUCCESS: Enhanced API is working!');
      console.log('📧 Email should be sent to: geu.ieee.studentbranch@gmail.com');
    } else {
      console.log('\n❌ FAILED:', result.message);
    }
    
  } catch (error) {
    console.error('\n❌ Network Error:', error.message);
  }
};

testContactForm();
