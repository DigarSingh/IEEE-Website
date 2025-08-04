const fs = require('fs');
const path = require('path');

// Use the optimized images folder
const galleryDir = path.join(__dirname, '../public/images/gallery-optimized');
const output = {};

// Event metadata - you can customize these details
const eventMetadata = {
  'Cyber_Workshop': {
    name: 'Cybersecurity Workshop',
    category: 'workshops',
    date: '2024-07-29',
    description: 'Comprehensive cybersecurity workshop covering latest threats and defense strategies.',
    photographer: 'IEEE Team'
  },
  'GenAI_Workshop': {
    name: 'Generative AI Workshop',
    category: 'workshops',
    date: '2024-07-28',
    description: 'Hands-on workshop on generative AI technologies and applications.',
    photographer: 'IEEE Team'
  },
  'WebDev_Workshop': {
    name: 'Web Development Workshop',
    category: 'workshops',
    date: '2024-07-27',
    description: 'Modern web development workshop covering frontend and backend technologies.',
    photographer: 'IEEE Team'
  },
  'Robotics_Workshop': {
    name: 'Robotics Workshop',
    category: 'workshops',
    date: '2024-07-26',
    description: 'Interactive robotics workshop with hands-on robot programming and control.',
    photographer: 'IEEE Team'
  },
  '1K+Follower_on_insta': {
    name: '1K+ Instagram Followers Celebration',
    category: 'events',
    date: '2024-07-25',
    description: 'Celebration event for reaching 1000+ followers on Instagram.',
    photographer: 'IEEE Team'
  }
};

try {
  fs.readdirSync(galleryDir).forEach(folder => {
    const folderPath = path.join(galleryDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const files = fs.readdirSync(folderPath)
        .filter(file => /\.(jpe?g|png|webp|heic)$/i.test(file))
        .map(file => ({
          filename: file,
          src: `/images/gallery-optimized/${folder}/${file}`,
          event: folder,
          ...eventMetadata[folder]
        }));
      
      output[folder] = {
        metadata: eventMetadata[folder] || {
          name: folder,
          category: 'events',
          date: '2024-01-01',
          description: `${folder} event photos`,
          photographer: 'IEEE Team'
        },
        images: files
      };
    }
  });

  fs.writeFileSync(
    path.join(__dirname, '../src/gallery-manifest.json'),
    JSON.stringify(output, null, 2)
  );

  console.log('✅ Gallery manifest generated successfully!');
  console.log(`📁 Found ${Object.keys(output).length} event folders:`);
  Object.keys(output).forEach(folder => {
    console.log(`   - ${folder}: ${output[folder].images.length} images`);
  });
} catch (error) {
  console.error('❌ Error generating gallery manifest:', error);
} 