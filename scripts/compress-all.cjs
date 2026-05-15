const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imgs = [
  "public/imagenes patrocinios/imag 1.webp",
  "public/imagenes patrocinios/imag 2.webp",
  "public/imagenes patrocinios/imag 3.webp",
  "public/imagenes patrocinios/imag 4.webp",
  "public/imagenes patrocinios/imag 5.webp",
  "public/imagenes patrocinios/imag 6.webp",
  "public/images/flota/Professional_commercial_fleet_202604082305.webp",
  "public/images/flota/Professional_3_4_side_202604082308.webp",
  "public/images/flota/citroen-jumper.webp",
  "public/images/flota/fiat-fiorino.webp",
  "public/images/flota/mercedes-vito.webp",
  "public/images/flota/camion-plataforma.webp",
  "public/images/flota/Dynamic_3_4_front_202604082308.webp",
  "public/images/services/telecomunicaciones.webp",
  "public/images/services/certificados.webp",
];

async function run() {
  for (const img of imgs) {
    if (!fs.existsSync(img)) { console.log("SKIP:", img); continue; }
    const before = Math.round(fs.statSync(img).size / 1024);
    const buf = await sharp(img).webp({ quality: 80, effort: 5 }).toBuffer();
    fs.unlinkSync(img);
    fs.writeFileSync(img, buf);
    const after = Math.round(fs.statSync(img).size / 1024);
    const pct = Math.round((1 - after/before) * 100);
    console.log(path.basename(img) + ": " + before + "KB -> " + after + "KB  (-" + pct + "%)");
  }
  console.log("Done");
}
run().catch(console.error);
