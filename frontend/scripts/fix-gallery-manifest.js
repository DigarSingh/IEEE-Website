const fs = require("fs");
const path = require("path");

// Read the gallery manifest
const manifestPath = path.join(__dirname, "../src/gallery-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// Function to update file extensions from .jpg to .JPG
function updateFileExtensions(obj) {
  if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        // Update filename and src fields
        if (key === "filename" && obj[key].endsWith(".jpg")) {
          obj[key] = obj[key].replace(".jpg", ".JPG");
        }
        if (key === "src" && obj[key].includes(".jpg")) {
          obj[key] = obj[key].replace(/\.jpg/g, ".JPG");
        }
      } else if (typeof obj[key] === "object") {
        updateFileExtensions(obj[key]);
      }
    }
  }
}

// Update all file extensions
updateFileExtensions(manifest);

// Write the updated manifest back to file
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log("✅ Gallery manifest updated successfully!");
console.log("📝 All .jpg extensions have been changed to .JPG");

// Log some examples of changes
let changeCount = 0;
Object.keys(manifest).forEach((folder) => {
  if (manifest[folder].images) {
    manifest[folder].images.forEach((image) => {
      if (image.filename && image.filename.endsWith(".JPG")) {
        changeCount++;
        if (changeCount <= 5) {
          console.log(`📸 Updated: ${image.filename}`);
        }
      }
    });
  }
});

console.log(`📊 Total files updated: ${changeCount}`);
