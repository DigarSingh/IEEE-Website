/**
 * Script to fix import paths throughout the codebase
 * Run with: node fix-import-paths.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all JS/TS files in the project
const getAllFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next')) {
      fileList = getAllFiles(filePath, fileList);
    } else if (
      stat.isFile() && 
      (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx'))
    ) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
};

// Helper function to update import paths in a file
const updateImportPaths = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix relative imports to contexts/AuthContext
    content = content.replace(
      /from ['"]\.\.\/contexts\/AuthContext['"]/g, 
      "from '@/contexts/AuthContext'"
    );
    
    // Fix relative imports to lib/mongodb
    content = content.replace(
      /from ['"]\.\.\/lib\/mongodb['"]/g, 
      "from '@/lib/mongodb'"
    );
    
    // Fix relative imports to middleware/authMiddleware
    content = content.replace(
      /from ['"]\.\.\/middleware\/authMiddleware['"]/g, 
      "from '@/middleware/authMiddleware'"
    );
    
    // Fix relative imports to models
    content = content.replace(
      /from ['"]\.\.\/models\/([^'"]+)['"]/g, 
      "from '@/models/$1'"
    );
    
    // Fix paths for components
    content = content.replace(
      /from ['"]\.\.\/components\/([^'"]+)['"]/g, 
      "from '@/components/$1'"
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated imports in ${filePath}`);
  } catch (error) {
    console.error(`✗ Error updating ${filePath}:`, error.message);
  }
};

// Get all files in the src directory
const srcDir = path.join(__dirname, 'src');
const files = getAllFiles(srcDir);

// Update import paths in all files
console.log('Updating import paths...');
files.forEach(file => {
  updateImportPaths(file);
});

console.log('Done!');
