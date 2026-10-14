/**
 * Crea un solo GLB animado para el PE53 a partir de sus estados cerrado y abierto.
 *
 * Uso:
 *   node scripts/create-pe53-animation.mjs cerrado.glb abierto.glb salida.glb
 *
 * Se parte del GLB cerrado y se conserva la jerarquía de piezas. La optimización
 * evita aplanar o instanciar nodos, porque el movimiento real ocurre en decenas
 * de componentes individuales del mecanismo telescópico.
 */
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import {
    dedup, join, meshopt, quantize, simplify, textureCompress, weld,
} from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import sharp from 'sharp';

const [closedPath, openPath, outputPath] = process.argv.slice(2);

if (!closedPath || !openPath || !outputPath) {
    console.error('Uso: node scripts/create-pe53-animation.mjs cerrado.glb abierto.glb salida.glb');
    process.exit(1);
}

await MeshoptDecoder.ready;
await MeshoptEncoder.ready;
await MeshoptSimplifier.ready;

const io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({
        'meshopt.decoder': MeshoptDecoder,
        'meshopt.encoder': MeshoptEncoder,
    });

const closedDoc = await io.read(closedPath);
const openDoc = await io.read(openPath);

// Optimización no destructiva para la animación: se reducen mallas y texturas,
// pero se conserva un nodo por pieza para poder animar el desplazamiento real.
const optimizePreservingNodes = async (doc) => {
    doc.getRoot().listMaterials()[0]?.setName('paint_body');
    await doc.transform(
        dedup(),
        join(),
        weld(),
        simplify({ simplifier: MeshoptSimplifier, ratio: 0, error: 0.0005, lockBorder: false }),
        textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [1024, 1024] }),
        quantize(),
        meshopt({ encoder: MeshoptEncoder, level: 'medium' }),
    );
};

await optimizePreservingNodes(closedDoc);
await optimizePreservingNodes(openDoc);

const closedNodes = closedDoc.getRoot().listNodes();
const openNodes = openDoc.getRoot().listNodes();

if (closedNodes.length !== openNodes.length) {
    throw new Error(`Las jerarquías no coinciden: cerrado=${closedNodes.length}, abierto=${openNodes.length}`);
}

for (let index = 0; index < closedNodes.length; index += 1) {
    const closedName = closedNodes[index].getName();
    const openName = openNodes[index].getName();
    if (closedName !== openName) {
        throw new Error(`El nodo ${index} no coincide: cerrado="${closedName}", abierto="${openName}"`);
    }
}

// GLTFLoader convierte el nombre del nodo en el identificador de las pistas de
// Three.js. Los archivos de origen repiten nombres para reflectores, barras y
// subensambles; sin un nombre único varias pistas pueden terminar apuntando a
// la misma pieza durante la animación. Conservamos el nombre descriptivo y
// añadimos el índice estable del nodo para que cada transformación sea única.
for (let index = 0; index < closedNodes.length; index += 1) {
    const baseName = closedNodes[index].getName() || 'Node';
    const uniqueName = `${baseName}__PE53_${index}`;
    closedNodes[index].setName(uniqueName);
    openNodes[index].setName(uniqueName);
}

const duration = 1.8;
const time = closedDoc
    .createAccessor('PE53 Extension Time')
    .setType('SCALAR')
    .setArray(new Float32Array([0, duration]));
const animation = closedDoc.createAnimation('PE53 Extension');

const tracks = [
    { path: 'translation', type: 'VEC3', fallback: [0, 0, 0] },
    { path: 'rotation', type: 'VEC4', fallback: [0, 0, 0, 1] },
    { path: 'scale', type: 'VEC3', fallback: [1, 1, 1] },
];

const sameValues = (a, b) => a.length === b.length && a.every((value, index) => Math.abs(value - b[index]) < 1e-6);
let channelCount = 0;

for (let index = 0; index < closedNodes.length; index += 1) {
    const closedNode = closedNodes[index];
    const openNode = openNodes[index];

    // Las cámaras no forman parte del mecanismo y no deben entrar en la animación.
    if (closedNode.getCamera() || openNode.getCamera()) continue;

    for (const track of tracks) {
        const start = Array.from(closedNode[`get${track.path[0].toUpperCase()}${track.path.slice(1)}`]() ?? track.fallback);
        const end = Array.from(openNode[`get${track.path[0].toUpperCase()}${track.path.slice(1)}`]() ?? track.fallback);
        if (sameValues(start, end)) continue;

        const output = closedDoc
            .createAccessor(`PE53 ${closedNode.getName() || `Node ${index}`} ${track.path}`)
            .setType(track.type)
            .setArray(new Float32Array([...start, ...end]));
        const sampler = closedDoc
            .createAnimationSampler(`PE53 ${track.path} ${index}`)
            .setInput(time)
            .setOutput(output)
            .setInterpolation('LINEAR');
        const channel = closedDoc
            .createAnimationChannel(`PE53 ${track.path} ${index}`)
            .setSampler(sampler)
            .setTargetNode(closedNode)
            .setTargetPath(track.path);

        animation.addSampler(sampler).addChannel(channel);
        channelCount += 1;
    }
}

if (channelCount === 0) {
    throw new Error('No se encontraron transformaciones distintas entre cerrado y abierto.');
}

await io.write(outputPath, closedDoc);
console.log(`Listo: ${outputPath} (${channelCount} tracks, ${duration}s)`);
