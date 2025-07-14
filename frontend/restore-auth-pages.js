// This script restores auth-requiring pages after the build process
// Run it after the build: node restore-auth-pages.js

const fs = require('fs');
const path = require('path');
const { readdirSync, statSync } = require('fs');

// Pages to restore after static generation
const PAGES_TO_RESTORE = [
  // Root level protected pages
  'dashboard.js',
  'profile.js',
  'profile/certificates.js',
  'profile/edit.js',
  
  // Admin routes
  'admin/index.js',
  'admin/dashboard.js',
  'admin/members.js',
  'admin/members/[id].js',
  'admin/events.js',
  'admin/certificates.js',
  'admin/messages.js',
  
  // Student routes
  'student/index.js',
  'student/dashboard.js',
  'student/events.js',
  'student/certificates.js',
  'student/profile.js'
];

// Helper function to get all files in directory recursively
const getAllFiles = (dir) => {
  let files = [];
  
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        files = [...files, ...getAllFiles(fullPath)];
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
  
  return files;
};

// Process each page from the list
PAGES_TO_RESTORE.forEach(pagePath => {
  const originalPath = path.join(__dirname, 'src', 'pages', pagePath);
  const backupPath = path.join(__dirname, 'src', 'pages-backup', pagePath);
  
  try {
    if (fs.existsSync(backupPath)) {
      // Restore from backup
      fs.copyFileSync(backupPath, originalPath);
      console.log(`✓ Restored ${pagePath} from backup`);
    } else {
      console.log(`⚠ No backup found for ${pagePath}, checking for directories...`);
      
      // Check if this could be a directory with an index.js
      const dirPath = path.join(__dirname, 'src', 'pages', pagePath.replace('.js', ''));
      const indexPath = path.join(dirPath, 'index.js');
      const indexBackupPath = path.join(__dirname, 'src', 'pages-backup', pagePath.replace('.js', ''), 'index.js');
      
      if (fs.existsSync(indexBackupPath)) {
        fs.copyFileSync(indexBackupPath, indexPath);
        console.log(`✓ Restored ${indexPath} from backup`);
      }
    }
  } catch (err) {
    console.error(`✗ Error restoring ${pagePath}: ${err.message}`);
  }
});

// Find and restore any additional backed up files that might not be in our list
console.log('Looking for additional backed up files to restore...');

const backupDir = path.join(__dirname, 'src', 'pages-backup');
if (fs.existsSync(backupDir)) {
  const backupFiles = getAllFiles(backupDir);
  
  backupFiles.forEach(backupFile => {
    // Get relative path from backup directory
    const relativePath = path.relative(backupDir, backupFile);
    const originalPath = path.join(__dirname, 'src', 'pages', relativePath);
    
    // Create directories if needed
    const originalDir = path.dirname(originalPath);
    if (!fs.existsSync(originalDir)) {
      fs.mkdirSync(originalDir, { recursive: true });
    }
    
    try {
      fs.copyFileSync(backupFile, originalPath);
      console.log(`✓ Restored additional file: ${relativePath}`);
    } catch (err) {
      console.error(`✗ Error restoring ${relativePath}: ${err.message}`);
    }
  });
}

// Clean up backup directory
console.log('Cleaning up backup directory...');
// We leave the backup directory in place but remove all files
// fs.rmSync(backupDir, { recursive: true, force: true });

console.log('✅ Auth pages restored successfully!');
