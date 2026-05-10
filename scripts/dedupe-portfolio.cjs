// Detecta duplicados por hash perceptual (pixel-level), convierte JPEG a WebP
// y deja solo una imagen por contenido visual.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DIR = path.resolve(__dirname, '../public/images/portfolio');
const ARCHIVE = path.resolve(__dirname, '../_archived/portfolio-dedup-' + Date.now());

async function pixelHash(file) {
  // Reduce a 16x16 grayscale, hash de los bytes de pixel
  const buf = await sharp(file)
    .resize(16, 16, { fit: 'cover' })
    .grayscale()
    .raw()
    .toBuffer();
  return crypto.createHash('md5').update(buf).digest('hex');
}

(async () => {
  const files = fs.readdirSync(DIR)
    .filter(f => /\.(jpe?g|webp|png)$/i.test(f))
    .map(f => path.join(DIR, f));

  console.log(`Analizando ${files.length} imágenes...`);

  const groups = new Map(); // hash -> [files]
  for (const f of files) {
    try {
      const h = await pixelHash(f);
      if (!groups.has(h)) groups.set(h, []);
      groups.get(h).push(f);
    } catch (e) {
      console.error('FAIL', f, e.message);
    }
  }

  // Mover originales no-WebP al archivo y elegir 1 representante por grupo
  if (!fs.existsSync(ARCHIVE)) fs.mkdirSync(ARCHIVE, { recursive: true });

  let kept = 0, removed = 0, converted = 0;
  let idx = 1;

  for (const [hash, group] of groups) {
    // Preferir WebP existente, si no convertir el JPEG más grande
    const webp = group.find(f => f.toLowerCase().endsWith('.webp'));
    const jpeg = group.find(f => /\.(jpe?g|png)$/i.test(f));

    let keepFile;
    if (webp) {
      keepFile = webp;
      // Borrar el resto (los JPEG duplicados van al archive)
      group.filter(f => f !== webp).forEach(f => {
        fs.renameSync(f, path.join(ARCHIVE, path.basename(f)));
        removed++;
      });
    } else if (jpeg) {
      // Convertir a WebP con nombre limpio
      const newName = `proyecto-${String(idx).padStart(2, '0')}.webp`;
      const newPath = path.join(DIR, newName);
      await sharp(jpeg).webp({ quality: 82, effort: 6 }).toFile(newPath);
      // Mover original y los duplicados al archive
      group.forEach(f => {
        fs.renameSync(f, path.join(ARCHIVE, path.basename(f)));
      });
      keepFile = newPath;
      converted++;
      removed += group.length - 1;
    }
    if (keepFile) kept++;
    idx++;
  }

  console.log(`\n✓ Conservadas: ${kept} imágenes únicas`);
  console.log(`✓ Convertidas JPEG→WebP: ${converted}`);
  console.log(`✓ Duplicados archivados: ${removed}`);
  console.log(`Archive: ${ARCHIVE}`);
})();
