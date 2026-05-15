const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const imgs = [
  'public/imagenes patrocinios/imag 1.webp',
  'public/imagenes patrocinios/imag 2.webp',
  'public/imagenes patrocinios/imag 3.webp',
  'public/imagenes patrocinios/imag 4.webp',
  'public/imagenes patrocinios/imag 5.webp',
  'public/imagenes patrocinios/imag 6.webp',
];
async function run() {
  for (const img of imgs) {
    if (!fs.existsSync(img)) { console.log('SKIP:', img); continue; }
    const before = Math.round(fs.statSync(img).size / 1024);
    const buf = await sharp(img).webp({ quality: 78, effort: 5 }).toBuffer();
    fs.writeFileSync(img, buf);
    const after = Math.round(fs.statSync(img).size / 1024);
    console.log(path.basename(img) + ': ' + before + 'KB -> ' + after + 'KB');
  }
}
run().catch(console.error);
