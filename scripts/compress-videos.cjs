// Comprime los 3 vídeos de la home con CRF 28 + scale 720p + sin audio
// + faststart. Reemplaza los originales atómicamente.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const DIR = path.resolve(__dirname, '../public/videos/proyectos');
const FILES = ['proyecto-01.mp4', 'proyecto-02.mp4', 'proyecto-03.mp4'];

(async () => {
  let totalBefore = 0, totalAfter = 0;
  for (const f of FILES) {
    const src = path.join(DIR, f);
    const tmp = path.join(DIR, f.replace('.mp4', '-tmp.mp4'));
    const before = fs.statSync(src).size;
    totalBefore += before;

    console.log(`\n[${f}] ${(before / 1024 / 1024).toFixed(2)} MB → comprimiendo...`);

    execFileSync(ffmpegPath, [
      '-y', '-i', src,
      '-c:v', 'libx264',
      '-crf', '28',
      '-preset', 'slow',
      '-profile:v', 'main',
      '-pix_fmt', 'yuv420p',
      // Scale: si la altura > 720, baja a 720; si no, mantener
      '-vf', "scale='if(gt(ih,1280),-2,iw)':'if(gt(ih,1280),1280,ih)'",
      '-an', // sin audio
      '-movflags', '+faststart',
      tmp,
    ], { stdio: 'pipe' });

    fs.unlinkSync(src);
    fs.renameSync(tmp, src);
    const after = fs.statSync(src).size;
    totalAfter += after;
    const pct = Math.round((1 - after / before) * 100);
    console.log(`  → ${(after / 1024 / 1024).toFixed(2)} MB  (-${pct}%)`);
  }

  const totalPct = Math.round((1 - totalAfter / totalBefore) * 100);
  console.log(`\n✓ Total: ${(totalBefore / 1024 / 1024).toFixed(2)} MB → ${(totalAfter / 1024 / 1024).toFixed(2)} MB (-${totalPct}%)`);
})();
