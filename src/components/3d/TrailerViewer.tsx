'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, useGLTF, Center } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

// Store original colors
const originalColorsMap = new WeakMap<THREE.Material, THREE.Color>();

// GLB Model component with color support
function TrailerModel({ modelPath, bodyColor }: { modelPath: string; bodyColor: string }) {
    const { scene } = useGLTF(modelPath);
    const hasStoredOriginals = useRef(false);

    // Clone the scene to avoid modifying the cached version
    const clonedScene = useMemo(() => {
        hasStoredOriginals.current = false;
        return scene.clone(true);
    }, [scene]);

    // Apply color to body parts (preserve dark materials like wheels)
    useEffect(() => {
        clonedScene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material) {
                const processMaterial = (mat: THREE.Material) => {
                    if (mat instanceof THREE.MeshStandardMaterial) {
                        // Store original color on first run
                        if (!hasStoredOriginals.current && !originalColorsMap.has(mat)) {
                            originalColorsMap.set(mat, mat.color.clone());
                        }

                        const originalColor = originalColorsMap.get(mat);
                        if (originalColor) {
                            // Calculate luminance - dark materials (wheels, tires) stay dark
                            const luminance = 0.299 * originalColor.r + 0.587 * originalColor.g + 0.114 * originalColor.b;

                            // If original material is dark (luminance < 0.3), keep it dark
                            // Otherwise apply the body color
                            if (luminance < 0.3) {
                                mat.color.copy(originalColor);
                            } else {
                                mat.color.set(bodyColor);
                            }
                        }
                    }
                };

                if (Array.isArray(child.material)) {
                    child.material.forEach(processMaterial);
                } else {
                    processMaterial(child.material);
                }
            }
        });
        hasStoredOriginals.current = true;
    }, [clonedScene, bodyColor]);

    return (
        <Center>
            <primitive object={clonedScene} scale={0.005} />
        </Center>
    );
}

// Loading fallback inside Canvas
function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#404040" wireframe />
        </mesh>
    );
}

interface TrailerViewerProps {
    modelPath: string;
    bodyColor?: string;
}

export default function TrailerViewer({ modelPath, bodyColor = '#dc2626' }: TrailerViewerProps) {
    return (
        <Canvas
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            style={{ background: 'transparent' }}
        >
            <PerspectiveCamera makeDefault position={[50, 25, 50]} fov={35} />
            <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={10}
                maxDistance={200}
                autoRotate
                autoRotateSpeed={0.5}
            />
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, 5, -5]} intensity={0.5} />
            <Suspense fallback={<LoadingFallback />}>
                <Environment preset="studio" />
                <TrailerModel modelPath={modelPath} bodyColor={bodyColor} />
            </Suspense>
        </Canvas>
    );
}
