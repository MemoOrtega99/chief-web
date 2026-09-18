'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, OrbitControls, useGLTF, useProgress } from '@react-three/drei';
import {
    Component,
    ReactNode,
    Suspense,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export type ViewName = 'perspectiva' | 'lateral' | 'frontal' | 'superior';

/** Direcciones de cámara por vista. El remolque queda con su largo sobre el eje X. */
const VIEW_DIRECTIONS: Record<ViewName, THREE.Vector3> = {
    perspectiva: new THREE.Vector3(-0.72, 0.36, 0.6),
    lateral: new THREE.Vector3(0, 0.08, 1),
    frontal: new THREE.Vector3(-1, 0.12, 0.001),
    superior: new THREE.Vector3(0.001, 1, 0.35),
};

const PAINT_MATERIALS = new Set(['paint_body', 'paint_accent']);

export type TrailerViewerHandle = {
    setView: (view: ViewName) => void;
};

/**
 * Caja envolvente real del modelo. Box3.setFromObject infla la caja de las piezas
 * instanciadas cuando están rotadas, así que se recorren los vértices (muestreados).
 */
function computeBounds(root: THREE.Object3D) {
    const box = new THREE.Box3();
    const vertex = new THREE.Vector3();
    const instance = new THREE.Matrix4();
    const world = new THREE.Matrix4();
    // Coordenadas relativas al contenedor del modelo, sin el desplazamiento que le aplicamos.
    root.updateWorldMatrix(true, true);
    const parentInverse = root.parent ? root.parent.matrixWorld.clone().invert() : new THREE.Matrix4();
    root.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const position = child.geometry.getAttribute('position');
        if (!position) return;
        const step = Math.max(1, Math.floor(position.count / 4000));
        const count = child instanceof THREE.InstancedMesh ? child.count : 1;
        for (let i = 0; i < count; i++) {
            world.multiplyMatrices(parentInverse, child.matrixWorld);
            if (child instanceof THREE.InstancedMesh) {
                child.getMatrixAt(i, instance);
                world.multiply(instance);
            }
            for (let v = 0; v < position.count; v += step) {
                box.expandByPoint(vertex.fromBufferAttribute(position, v).applyMatrix4(world));
            }
        }
    });
    return box;
}

type ModelProps = {
    path: string;
    color: string;
    onBounds: (box: THREE.Box3) => void;
};

function TrailerModel({ path, color, onBounds }: ModelProps) {
    const { scene } = useGLTF(path);

    // Centra el modelo sobre el origen y lo apoya en el piso (y = 0).
    const offset = useMemo(() => {
        const box = computeBounds(scene);
        const center = box.getCenter(new THREE.Vector3());
        return new THREE.Vector3(-center.x, -box.min.y, -center.z);
    }, [scene]);

    useLayoutEffect(() => {
        scene.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return;
            child.castShadow = true;
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            materials.forEach((material) => {
                if (!(material instanceof THREE.MeshStandardMaterial)) return;
                if (material instanceof THREE.MeshPhysicalMaterial && material.transmission > 0) {
                    // La transmisión obliga a un render extra por cuadro; para micas basta la transparencia.
                    material.transmission = 0;
                    material.transparent = true;
                    material.opacity = 0.55;
                }
                if (PAINT_MATERIALS.has(material.name)) {
                    // Esmalte automotriz: brillo medio, reflejo suave.
                    material.metalness = 0.25;
                    material.roughness = 0.38;
                    if (material instanceof THREE.MeshPhysicalMaterial) {
                        material.clearcoat = 0.6;
                        material.clearcoatRoughness = 0.25;
                    }
                } else if (material.name === 'polished pine 2d') {
                    // Piso de pino: mate, sin reflejos de barniz.
                    material.roughness = 0.8;
                    material.metalness = 0;
                    material.color.set('#c9a477');
                } else if (material.metalness === 0 && material.roughness <= 0.2) {
                    // SolidWorks exporta los componentes genéricos como plástico brillante.
                    material.roughness = 0.5;
                    material.metalness = 0.35;
                }
                material.envMapIntensity = 0.85;
            });
        });
    }, [scene]);

    useEffect(() => {
        scene.traverse((child) => {
            if (!(child instanceof THREE.Mesh)) return;
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            materials.forEach((material) => {
                if (material instanceof THREE.MeshStandardMaterial && PAINT_MATERIALS.has(material.name)) {
                    material.color.set(color);
                }
            });
        });
    }, [scene, color]);

    useEffect(() => {
        const box = computeBounds(scene).translate(offset);
        onBounds(box);
    }, [scene, offset, onBounds]);

    return (
        <group position={offset}>
            <primitive object={scene} />
        </group>
    );
}

type RigProps = {
    box: THREE.Box3 | null;
    initialView: ViewName;
    autoRotate: boolean;
    interactive: boolean;
    controlsRef: React.RefObject<OrbitControlsImpl | null>;
    goalRef: React.RefObject<{ position: THREE.Vector3; target: THREE.Vector3 } | null>;
    fitRef: React.RefObject<((view: ViewName) => void) | null>;
    frameMargin: number;
};

/** Encuadra la cámara al modelo y anima los cambios de vista. */
function CameraRig({ box, initialView, autoRotate, interactive, controlsRef, goalRef, fitRef, frameMargin }: RigProps) {
    const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;
    const size = useThree((state) => state.size);

    const fitDirection = useCallback(
        (direction: THREE.Vector3) => {
            if (!box) return null;
            const extent = box.getSize(new THREE.Vector3());
            const target = box.getCenter(new THREE.Vector3()).setY(extent.y * 0.35);

            // Base de la cámara para esta dirección.
            const back = direction.clone().normalize();
            const right = new THREE.Vector3(0, 1, 0).cross(back).normalize();
            const up = back.clone().cross(right).normalize();

            // Distancia mínima para que las 8 esquinas de la caja queden dentro del encuadre.
            const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
            const tanH = tanV * camera.aspect;
            let distance = 0;
            for (let i = 0; i < 8; i++) {
                const corner = new THREE.Vector3(
                    i & 1 ? box.max.x : box.min.x,
                    i & 2 ? box.max.y : box.min.y,
                    i & 4 ? box.max.z : box.min.z,
                ).sub(target);
                const depth = corner.dot(back);
                distance = Math.max(
                    distance,
                    depth + Math.abs(corner.dot(right)) / tanH,
                    depth + Math.abs(corner.dot(up)) / tanV,
                );
            }
            return { target, distance: distance * frameMargin };
        },
        [box, camera, frameMargin],
    );

    const computeGoal = useCallback(
        (view: ViewName) => {
            const direction = VIEW_DIRECTIONS[view].clone().normalize();
            const fit = fitDirection(direction);
            if (!fit) return null;
            const { distance } = fit;
            const position = fit.target.clone().addScaledVector(direction, distance);
            return { position, target: fit.target, distance };
        },
        [fitDirection],
    );

    useEffect(() => {
        fitRef.current = (view: ViewName) => {
            const goal = computeGoal(view);
            if (goal) goalRef.current = { position: goal.position, target: goal.target };
        };
    }, [computeGoal, fitRef, goalRef]);

    // Encuadre inicial sin animación, y reencuadre cuando cambia el tamaño del lienzo.
    useEffect(() => {
        const goal = computeGoal(initialView);
        if (!goal) return;
        camera.position.copy(goal.position);
        camera.near = goal.distance / 100;
        camera.far = goal.distance * 20;
        camera.updateProjectionMatrix();
        const controls = controlsRef.current;
        if (controls) {
            controls.target.copy(goal.target);
            controls.minDistance = goal.distance * 0.35;
            controls.maxDistance = goal.distance * 1.8;
            controls.update();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [box, size.width, size.height]);

    useFrame((_, delta) => {
        const goal = goalRef.current;
        const controls = controlsRef.current;
        if (!goal || !controls) return;
        const t = 1 - Math.exp(-delta * 5);
        camera.position.lerp(goal.position, t);
        controls.target.lerp(goal.target, t);
        controls.update();
        if (camera.position.distanceTo(goal.position) < 0.01) goalRef.current = null;
    });

    return (
        <OrbitControls
            ref={controlsRef}
            makeDefault
            enableDamping
            dampingFactor={0.08}
            enablePan={false}
            enableZoom={interactive}
            enableRotate={interactive}
            autoRotate={autoRotate}
            autoRotateSpeed={0.6}
            maxPolarAngle={Math.PI / 2 - 0.04}
            onStart={() => {
                goalRef.current = null;
            }}
        />
    );
}

function Studio() {
    return (
        <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
                <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
                <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
                <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
                <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
                <Lightformer form="ring" color="#ffffff" intensity={1.5} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
            </group>
        </Environment>
    );
}

function LoadingOverlay() {
    const { loaded, total, progress } = useProgress();
    const done = total > 0 && loaded === total;

    return (
        <div className={`ch-viewer-loading ${done ? 'is-done' : ''}`} role="status" aria-hidden={done}>
            <span className="ch-viewer-loading-label">Cargando modelo</span>
            <span className="ch-viewer-loading-value">{Math.round(progress)}%</span>
            <span className="ch-viewer-loading-bar">
                <span style={{ transform: `scaleX(${progress / 100})` }} />
            </span>
        </div>
    );
}

type BoundaryState = { hasError: boolean };

class ViewerErrorBoundary extends Component<{ children: ReactNode }, BoundaryState> {
    state: BoundaryState = { hasError: false };

    static getDerivedStateFromError(): BoundaryState {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <div className="ch-viewer-error">No se pudo cargar el modelo 3D.</div>;
        }
        return this.props.children;
    }
}

type TrailerViewerProps = {
    modelPath: string;
    color: string;
    initialView?: ViewName;
    autoRotate?: boolean;
    interactive?: boolean;
    /** Holgura del encuadre: 1 = el modelo toca los bordes. */
    frameMargin?: number;
    /** Permite leer el lienzo con toDataURL (para generar renders). */
    preserveDrawingBuffer?: boolean;
    className?: string;
};

const TrailerViewer = forwardRef<TrailerViewerHandle, TrailerViewerProps>(function TrailerViewer(
    {
        modelPath,
        color,
        initialView = 'perspectiva',
        autoRotate = false,
        interactive = true,
        frameMargin = 1.12,
        preserveDrawingBuffer = false,
        className = '',
    },
    ref,
) {
    const [box, setBox] = useState<THREE.Box3 | null>(null);
    const controlsRef = useRef<OrbitControlsImpl | null>(null);
    const goalRef = useRef<{ position: THREE.Vector3; target: THREE.Vector3 } | null>(null);
    const fitRef = useRef<((view: ViewName) => void) | null>(null);

    useImperativeHandle(ref, () => ({
        setView: (view) => fitRef.current?.(view),
    }));

    return (
        <div className={`ch-viewer ${className}`.trim()}>
            <ViewerErrorBoundary>
                <Canvas
                    shadows={false}
                    dpr={[1, 1.75]}
                    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer }}
                    camera={{ fov: 30, position: [-12, 5, 10] }}
                    onContextMenu={(event) => event.preventDefault()}
                >
                    <ambientLight intensity={0.2} />
                    <directionalLight position={[-6, 10, 6]} intensity={1.2} />
                    <directionalLight position={[8, 4, -6]} intensity={0.45} />
                    <Suspense fallback={null}>
                        <Studio />
                        <TrailerModel path={modelPath} color={color} onBounds={setBox} />
                        {box && (
                            <ContactShadows
                                position={[0, 0.001, 0]}
                                scale={box.getSize(new THREE.Vector3()).x * 1.4}
                                far={3}
                                blur={2.4}
                                opacity={0.55}
                                resolution={1024}
                                frames={1}
                            />
                        )}
                    </Suspense>
                    <CameraRig
                        box={box}
                        initialView={initialView}
                        autoRotate={autoRotate}
                        interactive={interactive}
                        controlsRef={controlsRef}
                        goalRef={goalRef}
                        fitRef={fitRef}
                        frameMargin={frameMargin}
                    />
                </Canvas>
            </ViewerErrorBoundary>
            <LoadingOverlay />
        </div>
    );
});

export default TrailerViewer;
