/**
 * Genera las versiones web del video del hero. Requiere ffmpeg instalado.
 *
 * Uso: npm run optimize:video
 *
 * Lee    assets-src/video/chief-hero.mp4  (original, sin modificar, en Git LFS)
 * Escribe public/media/hero-1080.mp4      H.264 alta calidad, sin audio, listo para streaming
 *         public/media/hero-720.mp4       versión ligera para celulares
 *         public/media/hero-poster.jpg    primer cuadro, se ve mientras carga el video
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';

const SOURCE = 'assets-src/video/chief-hero.mp4';
const OUTPUT = 'public/media';

mkdirSync(OUTPUT, { recursive: true });

const run = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
const size = (file) => `${(statSync(file).size / 1024 / 1024).toFixed(1)} MB`;

// El hero siempre va en silencio (la reproducción automática lo exige), así que se quita el audio.
// El tope de bitrate mantiene el peso razonable en tomas con mucho detalle (gravilla, vegetación)
// sin perder la definición visible del hero. En un video de 31 s produce aprox. 11 MB y 5.5 MB.
const h264 = (height, crf, maxrate) => [
    '-vf', `scale=-2:${height}:flags=lanczos`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf),
    '-maxrate', maxrate, '-bufsize', `${parseFloat(maxrate) * 2}M`,
    '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-an', '-movflags', '+faststart',
];

run(['-i', SOURCE, ...h264(1080, 24, '3M'), `${OUTPUT}/hero-1080.mp4`]);
console.log(`hero-1080.mp4  ${size(`${OUTPUT}/hero-1080.mp4`)}`);

run(['-i', SOURCE, ...h264(720, 26, '1.5M'), `${OUTPUT}/hero-720.mp4`]);
console.log(`hero-720.mp4   ${size(`${OUTPUT}/hero-720.mp4`)}`);

// JPEG mantiene el póster ligero y funciona con la instalación estándar de ffmpeg.
run(['-ss', '0.3', '-i', SOURCE, '-frames:v', '1', '-q:v', '5', `${OUTPUT}/hero-poster.jpg`]);
console.log(`hero-poster.jpg  ${size(`${OUTPUT}/hero-poster.jpg`)}`);
