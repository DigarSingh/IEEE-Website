const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const axios = require("axios");

// You'll need to get a free API key from https://api.imgbb.com/
const IMGBB_API_KEY = "YOUR_IMGBB_API_KEY"; // Replace with your actual API key

const uploadImageToImgBB = async (imagePath) => {
  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));
    formData.append("key", IMGBB_API_KEY);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    return response.data.data.url;
  } catch (error) {
    console.error(`Failed to upload ${imagePath}:`, error.message);
    return null;
  }
};

const processGalleryImages = async () => {
  const galleryPath = path.join(
    __dirname,
    "../public/images/gallery-optimized"
  );
  const manifestPath = path.join(__dirname, "../src/gallery-manifest.json");

  // Read existing manifest
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const newManifest = {};

  for (const [folder, folderData] of Object.entries(manifest)) {
    console.log(`Processing folder: ${folder}`);

    newManifest[folder] = {
      metadata: folderData.metadata,
      images: [],
    };

    for (const image of folderData.images) {
      const imagePath = path.join(galleryPath, folder, image.filename);

      if (fs.existsSync(imagePath)) {
        console.log(`Uploading: ${image.filename}`);
        const hostedUrl = await uploadImageToImgBB(imagePath);

        if (hostedUrl) {
          newManifest[folder].images.push({
            ...image,
            src: hostedUrl,
          });
        } else {
          // Keep original path if upload fails
          newManifest[folder].images.push(image);
        }
      } else {
        console.log(`File not found: ${imagePath}`);
        newManifest[folder].images.push(image);
      }
    }
  }

  // Save new manifest
  fs.writeFileSync(
    path.join(__dirname, "../src/gallery-manifest-hosted.json"),
    JSON.stringify(newManifest, null, 2)
  );

  console.log("Upload complete! Check gallery-manifest-hosted.json");
};

// Run the script
