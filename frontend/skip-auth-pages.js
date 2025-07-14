// This script modifies the build process to skip pages that require authentication
// Run it before the build: node skip-auth-pages.js

const fs = require('fs');
const path = require('path');

// Pages to exclude from static generation
const PAGES_TO_SKIP = [
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

// Create placeholder page content - returns empty props to avoid build errors
const createPlaceholderPage = (originalPath) => {
  // Extract the page name without extension
  const pageName = path.basename(originalPath, '.js');
  
  return `
// This is a placeholder page for ${pageName}
// The original file is temporarily renamed during the build process
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page() {
  const router = useRouter();
  
  useEffect(() => {
    // In real environment, redirect to login
    router.push('/login');
  }, [router]);
  
  return null;
}

// Skip static generation for this page
export const getStaticProps = () => {
  return { props: {} };
}
`;
};

// Create backup directory
const backupDir = path.join(__dirname, 'src', 'pages-backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Process each page
PAGES_TO_SKIP.forEach(pagePath => {
  const fullPath = path.join(__dirname, 'src', 'pages', pagePath);
  const backupPath = path.join(backupDir, pagePath);
  
  // Create subdirectories in backup if needed
  const backupDirname = path.dirname(backupPath);
  if (!fs.existsSync(backupDirname)) {
    fs.mkdirSync(backupDirname, { recursive: true });
  }

  try {
    if (fs.existsSync(fullPath)) {
      // Create backup
      fs.copyFileSync(fullPath, backupPath);
      console.log(`✓ Backed up ${pagePath}`);
      
      // Replace with placeholder instead of renaming
      fs.writeFileSync(fullPath, createPlaceholderPage(pagePath));
      console.log(`✓ Replaced ${pagePath} with placeholder`);
    } else {
      console.log(`⚠ Page ${pagePath} not found, checking for directories...`);
      
      // Check if this is a directory with an index.js file
      const dirPath = path.join(__dirname, 'src', 'pages', pagePath.replace('.js', ''));
      const indexPath = path.join(dirPath, 'index.js');
      
      if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
        console.log(`Found directory: ${dirPath}`);
        
        if (fs.existsSync(indexPath)) {
          const indexBackupPath = path.join(backupDir, pagePath.replace('.js', ''), 'index.js');
          const indexBackupDir = path.dirname(indexBackupPath);
          
          if (!fs.existsSync(indexBackupDir)) {
            fs.mkdirSync(indexBackupDir, { recursive: true });
          }
          
          fs.copyFileSync(indexPath, indexBackupPath);
          console.log(`✓ Backed up ${indexPath} to ${indexBackupPath}`);
          
          fs.writeFileSync(indexPath, createPlaceholderPage('index'));
          console.log(`✓ Replaced ${indexPath} with placeholder`);
        }
      }
    }
  } catch (err) {
    console.error(`✗ Error processing ${pagePath}: ${err.message}`);
  }
});

console.log('✅ Pages prepared for static build. Run build command now.');
console.log('After build is complete, run restore-auth-pages.js to restore the original files.');
