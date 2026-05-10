// dHash perceptual + Hamming distance — detecta duplicados aunque tengan
// compresión distinta o leve recorte.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIR = path.resolve(__dirname, '../public/images/portfolio');
const ARCHIVE = path.resolve(__dirname, '../_archived/portfolio-dedup-v2-' + Date.now());
const HAMMING_THRESHOLD = 12; // ≤12 bits = casi-duplicados (más permisivo)

async function dHash(file) {
  // 9x8 grayscale → diferencias horizontales = 64 bits
  const buf = await sharp(file)
    .resize(9, 8, { fit: 'fill' })
    .grayscale()
    .raw()
    .toBuffer();
  let bits = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const left = buf[row * 9 + col];
      const right = buf[row * 9 + col + 1];
      bits += left < right ? '1' : '0';
    }
  }
  return bits;
}

function hamming(a, b) {
  let d = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
  return d;
}

(async () => {
  const files = fs.readdirSync(DIR)
    .filter(f => /\.webp$/i.test(f))
    .map(f => path.join(DIR, f));

  console.log(`Analizando ${files.length} imágenes con dHash...`);

  const hashes = [];
  for (const f of files) {
    try {
      hashes.push({ file: f, hash: await dHash(f), size: fs.statSync(f).size });
    } catch (e) {
      console.error('FAIL', f, e.message);
    }
  }

  // Agrupar por similitud (Hamming ≤ threshold)
  const visited = new Set();
  const groups = [];
  for (let i = 0; i < hashes.length; i++) {
    if (visited.has(i)) continue;
    const group = [hashes[i]];
    visited.add(i);
    for (let j = i + 1; j < hashes.length; j++) {
      if (visited.has(j)) continue;
      if (hamming(hashes[i].hash, hashes[j].hash) <= HAMMING_THRESHOLD) {
        group.push(hashes[j]);
        visited.add(j);
      }
    }
    groups.push(group);
  }

  if (!fs.existsSync(ARCHIVE)) fs.mkdirSync(ARCHIVE, { recursive: true });

  let kept = 0, removed = 0;
  for (const group of groups) {
    if (group.length === 1) { kept++; continue; }
    // De cada grupo de duplicados, conservar el archivo MÁS GRANDE
    // (probablemente la mejor calidad)
    group.sort((a, b) => b.size - a.size);
    kept++;
    for (let i = 1; i < group.length; i++) {
      const f = group[i].file;
      console.log(`DUP: ${path.basename(f)} ≈ ${path.basename(group[0].file)}`);
      const dest = path.join(ARCHIVE, path.basename(f));
      // Copy + unlink con retry para EBUSY
      let ok = false;
      for (let tries = 0; tries < 5 && !ok; tries++) {
        try {
          fs.copyFileSync(f, dest);
          fs.unlinkSync(f);
          ok = true;
        } catch (err) {
          if (err.code === 'EBUSY' || err.code === 'EPERM') {
            await new Promise(r => setTimeout(r, 300));
          } else throw err;
        }
      }
      if (!ok) console.warn('SKIP (locked):', path.basename(f));
      else removed++;
    }
  }

  console.log(`\n✓ Únicas: ${kept}`);
  console.log(`✓ Duplicados archivados: ${removed}`);
  console.log(`Archive: ${ARCHIVE}`);
})();
