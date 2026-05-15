/**
 * Compress portfolio images >250KB.
 * Two-phase approach to avoid Windows EBUSY locks.
 * Run Phase 1, then stop dev server and run Phase 2 to swap.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'public', 'images', 'portfolio');
const TARGET_QUALITY = 78;
const MAX_KB = 250;

async function main() {
  const mode = process.argv[2] || 'compress';

  if (mode === 'swap') {
    console.log('\n=== Phase 2: Swapping portfolio files ===\n');
    const compressed = fs.readdirSync(DIR).filter(f => f.includes('_compressed'));
    let count = 0;
    for (const cFile of compressed) {
      const original = cFile.replace('_compressed', '');
      const cPath = path.join(DIR, cFile);
      const oPath = path.join(DIR, original);
      try {
        if (fs.existsSync(oPath)) fs.unlinkSync(oPath);
        fs.renameSync(cPath, oPath);
        console.log(`  SWAPPED ${cFile} → ${original}`);
        count++;
      } catch (err) {
        console.error(`  FAIL ${cFile}: ${err.message}`);
      }
    }
    console.log(`\nSwapped ${count} files.\n`);
    return;
  }

  console.log('\n=== Phase 1: Creating compressed versions for >250KB ===\n');

  const files = fs.readdirSync(DIR)
    .filter(f => f.endsWith('.webp') && !f.includes('_compressed'))
    .map(f => path.join(DIR, f))
    .sort((a, b) => fs.statSync(b).size - fs.statSync(a).size);

  let count = 0;
  for (const file of files) {
    const fileName = path.basename(file);
    const srcSize = Math.round(fs.statSync(file).size / 1024);

    if (srcSize <= MAX_KB) continue;

    const outName = fileName.replace('.webp', '_compressed.webp');
    const outPath = path.join(DIR, outName);

    try {
      const buf = await sharp(file)
        .webp({ quality: TARGET_QUALITY })
        .toBuffer();
      
      fs.writeFileSync(outPath, buf);
      const newSize = Math.round(buf.length / 1024);
      console.log(`  OK   ${fileName}: ${srcSize}KB → ${newSize}KB`);
      count++;
    } catch (err) {
      console.error(`  FAIL ${fileName}: ${err.message}`);
    }
  }

  console.log(`\n  Phase 1 complete. Compressed ${count} files.`);
  console.log('  Run "node scripts/compress-portfolio.cjs swap" to swap files.');
  console.log('  (Make sure no dev server is running first)\n');
}

main().catch(console.error);
