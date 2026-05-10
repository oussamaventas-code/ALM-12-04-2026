# Vídeos de proyectos

Coloca aquí 3 vídeos en formato MP4 con estos nombres exactos:

- proyecto-01.mp4
- proyecto-02.mp4
- proyecto-03.mp4

Y opcionalmente, sus posters (imagen del primer frame) en WebP:

- proyecto-01-poster.webp
- proyecto-02-poster.webp
- proyecto-03-poster.webp

Recomendaciones:
- Resolución: 1280x720 (720p) o 1920x1080 (1080p)
- Codec: H.264 (libx264)
- CRF: 26 (buen balance calidad/tamaño)
- Sin audio si no aporta nada (-an)
- moov atom al principio (-movflags +faststart)

Para comprimir con ffmpeg (ya instalado en node_modules):
./node_modules/ffmpeg-static/ffmpeg.exe -i input.mp4 -c:v libx264 -crf 26 -preset slow -profile:v main -an -movflags +faststart proyecto-01.mp4

Tamaño objetivo: cada vídeo debería pesar 2-5 MB.
