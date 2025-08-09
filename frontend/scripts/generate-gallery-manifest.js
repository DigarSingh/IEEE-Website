const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const galleryRoot = path.join(projectRoot, 'public', 'images', 'gallery');
const outFileSrc = path.join(projectRoot, 'src', 'gallery-manifest.json');
const outFilePublic = path.join(projectRoot, 'public', 'gallery-manifest.json');

const validExt = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg', '.JPG', '.JPEG', '.PNG']);

function walk(dir, baseUrl) {
  const items = fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }) : [];
  let results = [];
  for (const item of items) {
    const abs = path.join(dir, item.name);
    const url = `${baseUrl}/${item.name}`.replace(/\\/g, '/');
    if (item.isDirectory()) {
      results = results.concat(walk(abs, url));
    } else {
      const ext = path.extname(item.name);
      if (validExt.has(ext)) {
        results.push(url);
      }
    }
  }
  return results;
}

(function main() {
  try {
    const images = walk(galleryRoot, '/images/gallery').sort((a, b) => a.localeCompare(b));
    // write to src for optional imports/tools
    const dirSrc = path.dirname(outFileSrc);
    if (!fs.existsSync(dirSrc)) fs.mkdirSync(dirSrc, { recursive: true });
    fs.writeFileSync(outFileSrc, JSON.stringify({ images }, null, 2), 'utf8');
    // also write to public for runtime/serverless access
    const dirPub = path.dirname(outFilePublic);
    if (!fs.existsSync(dirPub)) fs.mkdirSync(dirPub, { recursive: true });
    fs.writeFileSync(outFilePublic, JSON.stringify({ images }, null, 2), 'utf8');
    console.log(`Gallery manifest written to:\n - ${outFileSrc}\n - ${outFilePublic}\nwith ${images.length} images.`);
    process.exit(0);
  } catch (err) {
    console.warn('Gallery manifest generation skipped:', err.message);
    // ensure a minimal file exists so imports don’t crash
    try {
      const dirSrc = path.dirname(outFileSrc);
      if (!fs.existsSync(dirSrc)) fs.mkdirSync(dirSrc, { recursive: true });
      fs.writeFileSync(outFileSrc, JSON.stringify({ images: [] }, null, 2), 'utf8');
      const dirPub = path.dirname(outFilePublic);
      if (!fs.existsSync(dirPub)) fs.mkdirSync(dirPub, { recursive: true });
      fs.writeFileSync(outFilePublic, JSON.stringify({ images: [] }, null, 2), 'utf8');
    } catch {}
    process.exit(0);
  }
})();
