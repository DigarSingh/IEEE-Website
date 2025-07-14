// This script restores the original AuthContext after build
// Run it after the build is complete

const fs = require('fs');
const path = require('path');

console.log('Restoring original AuthContext...');

// Path to the backup AuthContext.js
const backupPath = path.join(__dirname, 'src', 'contexts', 'AuthContext.js.bak');
const authContextPath = path.join(__dirname, 'src', 'contexts', 'AuthContext.js');

// Restore from backup if it exists
if (fs.existsSync(backupPath)) {
  fs.copyFileSync(backupPath, authContextPath);
  console.log('Original AuthContext.js restored successfully!');
  
  // Remove the backup file
  fs.unlinkSync(backupPath);
  console.log('Backup file removed.');
} else {
  console.log('Warning: Backup file not found. AuthContext.js was not restored.');
}
