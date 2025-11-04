// Test the validation logic
function validateCredentials(name, rollNo, password) {
  const validPassword = "ieee@kindlejr4.0";
  
  console.log(`🔑 Validating Round 1 password (Frontend only)`);
  
  const isValid = (
    validPassword === password &&
    name.length >= 2 &&
    /^\d{8,10}$/.test(rollNo)
  );
  
  console.log(`🔑 Password validation result:`, isValid);
  
  return isValid;
}

// Test cases
console.log('=== Testing Quiz Login Validation ===');

// Test 1: Valid credentials
console.log('\nTest 1 - Valid credentials:');
console.log('Result:', validateCredentials('John Doe', '12345678', 'ieee@kindlejr4.0'));

// Test 2: Wrong password
console.log('\nTest 2 - Wrong password:');
console.log('Result:', validateCredentials('John Doe', '12345678', 'wrongpassword'));

// Test 3: Invalid roll number (too short)
console.log('\nTest 3 - Invalid roll number (too short):');
console.log('Result:', validateCredentials('John Doe', '1234567', 'ieee@kindlejr4.0'));

// Test 4: Invalid roll number (too long)
console.log('\nTest 4 - Invalid roll number (too long):');
console.log('Result:', validateCredentials('John Doe', '12345678901', 'ieee@kindlejr4.0'));

// Test 5: Valid 10-digit roll number
console.log('\nTest 5 - Valid 10-digit roll number:');
console.log('Result:', validateCredentials('John Doe', '1234567890', 'ieee@kindlejr4.0'));

// Test 6: Short name
console.log('\nTest 6 - Short name:');
console.log('Result:', validateCredentials('J', '12345678', 'ieee@kindlejr4.0'));

console.log('\n=== Test Complete ===');
