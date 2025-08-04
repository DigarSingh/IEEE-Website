const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { glob } = require('glob');

// Configuration
const GALLERY_FOLDER = path.join(__dirname, '../public/images/gallery');
const OUTPUT_FOLDER = path.join(__dirname, '../public/images/gallery-optimized');
const TARGET_WIDTH = 1200; // Maximum width
const QUALITY = 80; // JPEG quality

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_FOLDER)) {
  fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
}

// Get all image files recursively
glob(path.join(GALLERY_FOLDER, '**/*.{jpg,JPG,jpeg,JPEG}'), async (err, files) => {
  if (err) {
    console.error('Error finding files:', err);
    return;
  }

  console.log(`Found ${files.length} images to optimize`);
  
  // Process each file
  for (const file of files) {
    try {
      const relativePath = path.relative(GALLERY_FOLDER, file);
      const outputPath = path.join(OUTPUT_FOLDER, relativePath);
      
      // Create directory structure if it doesn't exist
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Original file size
      const originalSize = fs.statSync(file).size;

      // Process with Sharp
      await sharp(file)
        .resize(TARGET_WIDTH, null, { withoutEnlargement: true }) // Resize to max width while maintaining aspect ratio
        .jpeg({ quality: QUALITY, mozjpeg: true }) // Use mozjpeg for better compression
        .toFile(outputPath);

      // New file size
      const newSize = fs.statSync(outputPath).size;
      const percentSaved = ((originalSize - newSize) / originalSize * 100).toFixed(2);

      console.log(`Optimized ${relativePath}: ${(originalSize/1024/1024).toFixed(2)} MB → ${(newSize/1024/1024).toFixed(2)} MB (saved ${percentSaved}%)`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  
  console.log('Image optimization complete!');
});
