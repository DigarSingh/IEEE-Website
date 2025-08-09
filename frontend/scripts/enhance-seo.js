#!/usr/bin/env node
/*
  Lightweight SEO enhancer: generates sitemap.xml and robots.txt into public/.
  - Safe to run multiple times.
  - Never fails the build: logs warnings and exits 0 on error.
*/
const fs = require('fs');
const path = require('path');

function getBaseUrl() {
  try {
    const fromEnv = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
    if (fromEnv) return fromEnv.replace(/\/$/, '');
    const vercel = process.env.VERCEL_URL;
    if (vercel) return `https://${vercel.replace(/\/$/, '')}`;
  } catch {}
  return 'http://localhost:3000';
}

function ensureDir(p) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFileSafe(filePath, contents) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, contents, 'utf8');
}

function buildSitemapXml(baseUrl) {
  const routes = [
    '/',
    '/about',
    '/events',
    '/gallery',
    '/contact',
    '/resources',
    '/membership',
    '/faq',
    '/privacy',
    '/terms',
  ];
  const now = new Date().toISOString();
  const urls = routes
    .map((r) => `  <url>\n    <loc>${baseUrl}${r}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${r === '/' ? '1.0' : '0.7'}</priority>\n  </url>`) 
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobotsTxt(baseUrl) {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
    '',
  ].join('\n');
}

(function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const publicDir = path.join(projectRoot, 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  const robotsPath = path.join(publicDir, 'robots.txt');
  const baseUrl = getBaseUrl();
  try {
    const sitemapXml = buildSitemapXml(baseUrl);
    writeFileSafe(sitemapPath, sitemapXml);
    const robotsTxt = buildRobotsTxt(baseUrl);
    writeFileSafe(robotsPath, robotsTxt);
    console.log(`SEO files generated:\n - ${sitemapPath}\n - ${robotsPath}`);
    process.exit(0);
  } catch (err) {
    console.warn('enhance-seo: skipped with warning:', err?.message || err);
    // Never fail the build
    try {
      if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
      if (!fs.existsSync(sitemapPath)) writeFileSafe(sitemapPath, buildSitemapXml(baseUrl));
      if (!fs.existsSync(robotsPath)) writeFileSafe(robotsPath, buildRobotsTxt(baseUrl));
    } catch {}
    process.exit(0);
  }
})();
