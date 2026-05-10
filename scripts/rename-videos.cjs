// Renombra los vídeos de WhatsApp a proyecto-01/02/03.mp4
// y genera el poster (primer frame) en WebP a partir de cada uno.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const sharp = require('sharp');
const ffmpegPath = require('ffmpeg-static');

const DIR = path.resolve(__dirname, '../public/videos/proyectos');

(async () => {
  const sources = fs.readdirSync(DIR)
    .filter(f => f.startsWith('WhatsApp') && f.endsWith('.mp4'))
    .sort();

  if (sources.length !== 3) {
    console.error(`Esperaba 3 vídeos WhatsApp, encontrados ${sources.length}`);
    process.exit(1);
  }

  for (let i = 0; i < sources.length; i++) {
    const src = path.join(DIR, sources[i]);
    const num = String(i + 1).padStart(2, '0');
    const newVideo = path.join(DIR, `proyecto-${num}.mp4`);
    const tempFrame = path.join(DIR, `_tmp-${num}.png`);
    const posterPath = path.join(DIR, `proyecto-${num}-poster.webp`);

    console.log(`\n[${num}] ${sources[i]}`);

    // 1. Extraer primer frame (a 0.5s para evitar frames negros del inicio)
    try {
      execFileSync(ffmpegPath, [
        '-y', '-ss', '0.5', '-i', src,
        '-vframes', '1', '-q:v', '2',
        tempFrame,
      ], { stdio: 'pipe' });
    } catch (e) {
      // Si falla en 0.5s, probar con 0
      execFileSync(ffmpegPath, [
        '-y', '-i', src,
        '-vframes', '1', '-q:v', '2',
        tempFrame,
      ], { stdio: 'pipe' });
    }

    // 2. Convertir el frame a WebP comprimido
    const info = await sharp(tempFrame)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(posterPath);
    fs.unlinkSync(tempFrame);
    console.log(`  poster:  proyecto-${num}-poster.webp (${Math.round(info.size/1024)} KB)`);

    // 3. Renombrar el vídeo
    fs.renameSync(src, newVideo);
    const stat = fs.statSync(newVideo);
    console.log(`  vídeo:   proyecto-${num}.mp4 (${Math.round(stat.size/1024)} KB)`);
  }

  console.log('\n✓ Listo');
})();
