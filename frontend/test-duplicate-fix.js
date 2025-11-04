// Test script to verify the duplicate key error fix
async function testStudentRegistration() {
  const testStudent = {
    name: "Test Student",
    rollNo: "24151237", // The same roll number from the error
    selectedRound: 1,
    loginTime: new Date()
  };

  console.log('🧪 Testing student registration with previously problematic roll number...');
  console.log('📝 Test data:', testStudent);

  try {
    const response = await fetch('http://localhost:3000/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testStudent),
    });

    const result = await response.json();
    console.log('📊 API Response:', result);
    console.log('✅ Status:', response.status);

    if (result.success) {
      console.log('🎉 SUCCESS: Student registration works!');
      
      // Test registering same student for Round 2
      console.log('\n🧪 Testing same student for Round 2...');
      const round2Test = { ...testStudent, selectedRound: 2 };
      
      const response2 = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(round2Test),
      });

      const result2 = await response2.json();
      console.log('📊 Round 2 Response:', result2);
      
      if (result2.success) {
        console.log('🎉 SUCCESS: Multi-round registration works!');
      } else {
        console.log('❌ FAILED: Round 2 registration failed');
      }

      // Test re-registering same student for Round 1
      console.log('\n🧪 Testing re-registration for Round 1...');
      const reRegisterTest = { ...testStudent, loginTime: new Date() };
      
      const response3 = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reRegisterTest),
      });

      const result3 = await response3.json();
      console.log('📊 Re-registration Response:', result3);
      
      if (result3.success) {
        console.log('🎉 SUCCESS: Re-registration works!');
      } else {
        console.log('❌ FAILED: Re-registration failed');
      }

    } else {
      console.log('❌ FAILED: Student registration still has issues');
      console.log('Error:', result.error);
    }

  } catch (error) {
    console.error('💥 TEST FAILED:', error.message);
  }
}

// Note: This test requires the Next.js server to be running
console.log('🚀 Starting duplicate key error fix test...');
console.log('📝 Make sure your Next.js server is running on http://localhost:3000');
console.log('   Run: npm run dev or yarn dev\n');

testStudentRegistration();