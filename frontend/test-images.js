const fs = require('fs');
const path = require('path');

// Read the gallery manifest
const manifestPath = path.join(__dirname, 'src/gallery-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log('🔍 Testing gallery image paths...\n');

let totalImages = 0;
let accessibleImages = 0;
let missingImages = 0;

Object.keys(manifest).forEach(folder => {
  console.log(`📁 Checking folder: ${folder}`);
  
  if (manifest[folder].images) {
    manifest[folder].images.forEach(image => {
      totalImages++;
      const imagePath = path.join(__dirname, 'public', image.src);
      
      if (fs.existsSync(imagePath)) {
        accessibleImages++;
        console.log(`  ✅ ${image.filename}`);
      } else {
        missingImages++;
        console.log(`  ❌ ${image.filename} - NOT FOUND`);
        console.log(`     Expected path: ${imagePath}`);
      }
    });
  }
});

console.log('\n📊 Summary:');
console.log(`Total images in manifest: ${totalImages}`);
console.log(`✅ Accessible images: ${accessibleImages}`);
console.log(`❌ Missing images: ${missingImages}`);
console.log(`📈 Success rate: ${((accessibleImages / totalImages) * 100).toFixed(1)}%`);

if (missingImages > 0) {
  console.log('\n🔧 Issues found:');
  console.log('1. Check if image files exist in the correct locations');
  console.log('2. Verify file extensions match (.jpg vs .JPG)');
  console.log('3. Ensure image paths in manifest are correct');
} else {
  console.log('\n🎉 All images are accessible!');
} 