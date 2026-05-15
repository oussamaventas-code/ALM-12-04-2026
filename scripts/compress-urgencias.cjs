/**
 * Compress urgencias images — writes _compressed versions, then swaps.
 * Run this with NO dev server running, or run the swap step manually after.
 *
 * Two-phase approach:
 *   Phase 1: Create compressed versions (always works)
 *   Phase 2: Swap files (requires no locks)
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'public', 'video  seccion de urgencias');

// Per-file quality settings to ensure all end up under 150KB
const CONFIG = {
  'img 1.webp': { quality: 72, resize: null },      // 160KB → target ~80KB
  'img 2.webp': { quality: 70, resize: null },      // 215KB → target ~120KB
  'img 3.webp': { quality: 55, resize: 1600 },      // 327KB → target ~130KB
  'img 4.webp': { quality: 40, resize: 1400 },      // 744KB → target ~140KB
  'img 5.webp': { quality: 55, resize: 1600 },      // 327KB → target ~130KB
};

async function main() {
  const mode = process.argv[2] || 'compress'; // 'compress' or 'swap'

  if (mode === 'swap') {
    console.log('\n=== Phase 2: Swapping compressed files ===\n');
    const compressed = fs.readdirSync(DIR).filter(f => f.includes('_compressed'));
    for (const cFile of compressed) {
      const original = cFile.replace('_compressed', '');
      const cPath = path.join(DIR, cFile);
      const oPath = path.join(DIR, original);
      try {
        if (fs.existsSync(oPath)) fs.unlinkSync(oPath);
        fs.renameSync(cPath, oPath);
        console.log(`  SWAPPED ${cFile} → ${original}`);
      } catch (err) {
        console.error(`  FAIL ${cFile}: ${err.message}`);
      }
    }
    console.log('\nDone.\n');
    return;
  }

  console.log('\n=== Phase 1: Creating compressed versions ===\n');

  for (const [fileName, cfg] of Object.entries(CONFIG)) {
    const srcPath = path.join(DIR, fileName);
    const outName = fileName.replace('.webp', '_compressed.webp');
    const outPath = path.join(DIR, outName);

    if (!fs.existsSync(srcPath)) {
      console.log(`  SKIP ${fileName} — not found`);
      continue;
    }

    const srcSize = Math.round(fs.statSync(srcPath).size / 1024);

    try {
      let pipeline = sharp(srcPath);
      if (cfg.resize) {
        pipeline = pipeline.resize(cfg.resize, null, { withoutEnlargement: true });
      }
      const buf = await pipeline.webp({ quality: cfg.quality }).toBuffer();
      fs.writeFileSync(outPath, buf);
      const newSize = Math.round(buf.length / 1024);
      console.log(`  OK   ${fileName}: ${srcSize}KB → ${newSize}KB (q${cfg.quality}${cfg.resize ? `, w${cfg.resize}` : ''})`);
    } catch (err) {
      console.error(`  FAIL ${fileName}: ${err.message}`);
    }
  }

  console.log('\n  Phase 1 complete. Run "node scripts/compress-urgencias.cjs swap" to swap files.');
  console.log('  (Make sure no dev server is running first)\n');
}

main().catch(console.error);
