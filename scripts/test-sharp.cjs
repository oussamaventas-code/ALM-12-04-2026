const sharp = require('sharp');
const fs = require('fs');
const src = 'public/imagenes patrocinios/imag 1.webp';
sharp(src).webp({ quality: 78, effort: 5 }).toFile('public/imagenes patrocinios/imag1-out.webp')
  .then(info => { console.log('OK', JSON.stringify(info)); })
  .catch(e => console.error('ERR', e.message));
