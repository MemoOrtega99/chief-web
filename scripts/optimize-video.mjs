/**
 * Genera las versiones web del video del hero. Requiere ffmpeg instalado.
 *
 * Uso: npm run optimize:video
 *
 * Lee    assets-src/video/chief-hero.mp4  (original, sin modificar, en Git LFS)
 * Escribe public/media/hero-1080.mp4      H.264 alta calidad, sin audio, listo para streaming
 *         public/media/hero-720.mp4       versión ligera para celulares
 *         public/media/hero-poster.webp   primer cuadro, se ve mientras carga el video
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';

const SOURCE = 'assets-src/video/chief-hero.mp4';
const OUTPUT = 'public/media';

mkdirSync(OUTPUT, { recursive: true });

const run = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
const size = (file) => `${(statSync(file).size / 1024 / 1024).toFixed(1)} MB`;

// El hero siempre va en silencio (autoplay lo exige), así que se quita el audio.
// El tope de bitrate mantiene el peso razonable en tomas con mucho detalle (gravilla, vegetación).
const h264 = (height, crf, maxrate) => [
    '-vf', `scale=-2:${height}:flags=lanczos`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf),
    '-maxrate', maxrate, '-bufsize', `${parseFloat(maxrate) * 2}M`,
    '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-an', '-movflags', '+faststart',
];

run(['-i', SOURCE, ...h264(1080, 21, '5M'), `${OUTPUT}/hero-1080.mp4`]);
console.log(`hero-1080.mp4  ${size(`${OUTPUT}/hero-1080.mp4`)}`);

run(['-i', SOURCE, ...h264(720, 23, '2.5M'), `${OUTPUT}/hero-720.mp4`]);
console.log(`hero-720.mp4   ${size(`${OUTPUT}/hero-720.mp4`)}`);

run(['-ss', '0.3', '-i', SOURCE, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '86', `${OUTPUT}/hero-poster.webp`]);
console.log(`hero-poster.webp ${size(`${OUTPUT}/hero-poster.webp`)}`);
