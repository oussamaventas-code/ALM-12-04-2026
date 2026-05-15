/**
 * Create OG images for pages that reference them but don't have them yet.
 * Uses the existing og-image.png as source, resized to 1200x630.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OG_DIR = path.join(__dirname, '..', 'public', 'og');
const WIDTH = 1200;
const HEIGHT = 630;

// Source: try og-image.png at project root, then fallback to first OG in /og/
function findSource() {
  const root = path.join(__dirname, '..', 'public', 'og-image.png');
  if (fs.existsSync(root)) return root;

  // Fallback: use first existing PNG in /og/
  const existing = fs.readdirSync(OG_DIR).filter(f => f.endsWith('.png'));
  if (existing.length > 0) return path.join(OG_DIR, existing[0]);

  throw new Error('No source image found for OG generation');
}

async function createOG(sourcePath, outputName) {
  const outPath = path.join(OG_DIR, outputName);

  if (fs.existsSync(outPath)) {
    console.log(`  SKIP ${outputName} — already exists`);
    return;
  }

  await sharp(sourcePath)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
    .png({ quality: 85 })
    .toFile(outPath);

  const size = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`  OK   ${outputName} — ${size}KB`);
}

async function main() {
  console.log('\n=== Creating missing OG images ===\n');

  const source = findSource();
  console.log(`  Source: ${path.basename(source)}\n`);

  await createOG(source, 'contacto.png');
  await createOG(source, 'historia.png');

  console.log('\nDone.\n');
}

main().catch(console.error);
