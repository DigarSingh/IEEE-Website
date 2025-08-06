/**
 * SEO Enhancement Script for GEU IEEE Website
 * 
 * This script generates additional SEO files to improve search engine ranking:
 * - robots.txt (updated version)
 * - sitemap.xml (static version for bots that don't execute JS)
 * - manifest.json (PWA support)
 * - browserconfig.xml (Microsoft browsers)
 */

const fs = require('fs');
const path = require('path');

// Base URL configuration
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://geuieee.com';

// Create directory if it doesn't exist
const createDirIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Generate manifest.json for PWA support
const generateManifest = () => {
  const manifest = {
    "name": "GEU IEEE - Graphic Era University IEEE Student Branch",
    "short_name": "GEU IEEE",
    "description": "Official IEEE Student Branch at Graphic Era University, Dehradun",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#0066B3", // IEEE blue color
    "icons": [
      {
        "src": "/images/logo.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/images/logo.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  };

  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('✅ Generated manifest.json');
};

// Generate browserconfig.xml for Microsoft browsers
const generateBrowserconfig = () => {
  const browserconfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/images/logo.png"/>
      <TileColor>#0066B3</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;

  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'browserconfig.xml'),
    browserconfig
  );
  console.log('✅ Generated browserconfig.xml');
};

// Generate static sitemap.xml for bots that don't execute JS
const generateStaticSitemap = () => {
  const pages = [
    '',
    '/about',
    '/events',
    '/gallery',
    '/membership',
    '/contact',
    '/resources',
    '/faq',
    '/privacy',
    '/terms'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
  ${pages.map(page => {
    // Set custom priorities and change frequencies based on the page importance
    let priority = '0.8';
    let changefreq = 'weekly';
    
    if (page === '') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (page === '/events' || page === '/gallery') {
      priority = '0.9';
      changefreq = 'daily';
    } else if (page === '/about' || page === '/membership') {
      priority = '0.9';
      changefreq = 'weekly';
    }
    
    return `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${page === '' ? `
    <image:image>
      <image:loc>${BASE_URL}/images/logo.png</image:loc>
      <image:title>GEU IEEE Logo</image:title>
      <image:caption>Official IEEE Student Branch at Graphic Era University</image:caption>
    </image:image>` : ''}
  </url>`}).join('')}
</urlset>`;

  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'sitemap.xml'),
    sitemap
  );
  console.log('✅ Generated static sitemap.xml');
};

// Create .well-known directory for verification files
const setupWellKnown = () => {
  const wellKnownDir = path.join(process.cwd(), 'public', '.well-known');
  createDirIfNotExists(wellKnownDir);
  
  // Create a basic security.txt file
  fs.writeFileSync(
    path.join(wellKnownDir, 'security.txt'),
    `Contact: mailto:security@geuieee.com
Expires: ${new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString()}
Preferred-Languages: en
Canonical: ${BASE_URL}/.well-known/security.txt`
  );
  console.log('✅ Generated security.txt');
};

// Run all SEO enhancement functions
const enhanceSEO = () => {
  try {
    generateManifest();
    generateBrowserconfig();
    generateStaticSitemap();
    setupWellKnown();
    console.log('\n🚀 SEO Enhancement Complete!\n');
    console.log('For best SEO results, please also:');
    console.log('1. Register your site on Google Search Console');
    console.log('2. Submit your sitemap at: https://search.google.com/search-console');
    console.log('3. Create Google Business profile for GEU IEEE');
    console.log('4. Add structured data for events using Event schema');
    console.log('5. Implement canonical URLs across all pages');
  } catch (error) {
    console.error('❌ Error enhancing SEO:', error);
  }
};

enhanceSEO();
