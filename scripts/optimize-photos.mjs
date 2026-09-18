/**
 * Genera las versiones web de las fotos originales.
 *
 * Uso: npm run optimize:photos
 *
 * Lee    assets-src/fotos/*.jpg  (originales, sin modificar, en Git LFS)
 * Escribe public/fotos/<nombre>-<ancho>.webp  en 1200 y 2400 px (sin ampliar si el original es menor)
 *         src/data/photos.generated.json      con dimensiones para cada foto
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE = 'assets-src/fotos';
const OUTPUT = 'public/fotos';
const MANIFEST = 'src/data/photos.generated.json';
const WIDTHS = [1200, 2400];
// Calidad alta: a estos tamaños la diferencia con el original no es perceptible.
const WEBP = { quality: 88, effort: 6, smartSubsample: true };

await mkdir(OUTPUT, { recursive: true });
const files = (await readdir(SOURCE)).filter((file) => /\.(jpe?g|png)$/i.test(file)).sort();
const manifest = {};

for (const file of files) {
    const name = path.parse(file).name;
    const input = path.join(SOURCE, file);
    const { width, height } = await sharp(input).rotate().metadata();
    const widths = WIDTHS.filter((w) => w < width).concat(width < WIDTHS.at(-1) ? [width] : []);

    for (const w of widths) {
        await sharp(input)
            .rotate()
            .resize({ width: w, withoutEnlargement: true })
            .webp(WEBP)
            .toFile(path.join(OUTPUT, `${name}-${w}.webp`));
    }

    manifest[name] = { width, height, widths };
    console.log(`${name}: ${width}×${height} → ${widths.join(', ')} px`);
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Listo: ${files.length} fotos`);
