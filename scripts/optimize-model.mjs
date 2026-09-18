/**
 * Convierte un GLB exportado de SolidWorks en una versión ligera para web.
 *
 * Uso:
 *   node scripts/optimize-model.mjs <entrada.glb> <salida.glb> --paint 0 [--accent 1] [--error 0.0005]
 *
 * --paint   índice(s) de material que representan la pintura del chasis (separados por coma).
 *           Se renombran a "paint_body" y son los únicos que el visor recolorea.
 * --accent  índice(s) de material de pintura secundaria (se renombran a "paint_accent").
 * --error   tolerancia de simplificación de meshoptimizer (relativa al tamaño del modelo).
 *
 * Para ver índices y colores de materiales:
 *   npx @gltf-transform/cli inspect <entrada.glb>
 */
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import {
    dedup, flatten, instance, join, meshopt, prune, quantize, simplify, textureCompress, weld,
} from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import sharp from 'sharp';

const [input, output, ...flags] = process.argv.slice(2);
if (!input || !output) {
    console.error('Uso: node scripts/optimize-model.mjs <entrada.glb> <salida.glb> --paint 0 [--accent 1] [--error 0.0005]');
    process.exit(1);
}

const flag = (name, fallback) => {
    const i = flags.indexOf(`--${name}`);
    return i === -1 ? fallback : flags[i + 1];
};
const indices = (value) => (value ? value.split(',').map(Number) : []);

await MeshoptSimplifier.ready;
await MeshoptEncoder.ready;

const io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({ 'meshopt.encoder': MeshoptEncoder });

const doc = await io.read(input);
const root = doc.getRoot();
const materials = root.listMaterials();

indices(flag('paint')).forEach((i) => materials[i]?.setName('paint_body'));
indices(flag('accent')).forEach((i) => materials[i]?.setName('paint_accent'));

// SolidWorks exporta una cámara embebida que no usamos.
root.listCameras().forEach((camera) => camera.dispose());

await doc.transform(
    dedup(),
    instance({ min: 2 }),
    flatten(),
    join(),
    weld(),
    simplify({ simplifier: MeshoptSimplifier, ratio: 0, error: Number(flag('error', 0.0005)), lockBorder: false }),
    prune(),
    textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [1024, 1024] }),
    quantize(),
    meshopt({ encoder: MeshoptEncoder, level: 'medium' }),
);

await io.write(output, doc);
console.log(`Listo: ${output}`);
