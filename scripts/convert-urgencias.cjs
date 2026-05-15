const sharp = require('sharp');
const path = require('path');

const folder = path.join(__dirname, '../public/video  seccion de urgencias');

const files = [
  { src: path.join(folder, 'img 1.png'),  dst: path.join(folder, 'img 1.webp') },
  { src: path.join(folder, 'img 2.jpeg'), dst: path.join(folder, 'img 2.webp') },
  { src: path.join(folder, 'img 3.jpeg'), dst: path.join(folder, 'img 3.webp') },
  { src: path.join(folder, 'img 5.jpeg'), dst: path.join(folder, 'img 5.webp') },
];

(async () => {
  for (const f of files) {
    const info = await sharp(f.src).webp({ quality: 82 }).toFile(f.dst);
    const kb = Math.round(info.size / 1024);
    console.log(`OK: ${path.basename(f.dst)} — ${kb} KB`);
  }
  console.log('Listo.');
})();
