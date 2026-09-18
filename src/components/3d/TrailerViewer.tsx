'use client';

import { Canvas } from '@react-three/fiber';
import { Center, Environment, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { Component, ReactNode, Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const originalColorsMap = new WeakMap<THREE.Material, THREE.Color>();

function TrailerModel({ modelPath, bodyColor }: { modelPath: string; bodyColor: string }) {
    const { scene } = useGLTF(modelPath);
    const hasStoredOriginals = useRef(false);

    const clonedScene = useMemo(() => {
        hasStoredOriginals.current = false;
        return scene.clone(true);
    }, [scene]);

    useEffect(() => {
        clonedScene.traverse((child) => {
            if (!(child instanceof THREE.Mesh) || !child.material) return;

            const processMaterial = (material: THREE.Material) => {
                if (!(material instanceof THREE.MeshStandardMaterial)) return;

                if (!hasStoredOriginals.current && !originalColorsMap.has(material)) {
                    originalColorsMap.set(material, material.color.clone());
                }

                const originalColor = originalColorsMap.get(material);
                if (!originalColor) return;

                const luminance =
                    0.299 * originalColor.r +
                    0.587 * originalColor.g +
                    0.114 * originalColor.b;

                if (luminance < 0.3) {
                    material.color.copy(originalColor);
                } else {
                    material.color.set(bodyColor);
                }
            };

            if (Array.isArray(child.material)) {
                child.material.forEach(processMaterial);
            } else {
                processMaterial(child.material);
            }
        });

        hasStoredOriginals.current = true;
    }, [bodyColor, clonedScene]);

    return (
        <Center>
            <primitive object={clonedScene} scale={0.005} />
        </Center>
    );
}

function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#E31E24" wireframe />
        </mesh>
    );
}

type ViewerBoundaryProps = { children: ReactNode };
type ViewerBoundaryState = { hasError: boolean };

class ViewerErrorBoundary extends Component<ViewerBoundaryProps, ViewerBoundaryState> {
    state: ViewerBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ViewerBoundaryState {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="ct-viewer-error">
                    <span>Modelo 3D en sincronización</span>
                </div>
            );
        }

        return this.props.children;
    }
}

interface TrailerViewerProps {
    modelPath: string;
    bodyColor?: string;
    className?: string;
}

export default function TrailerViewer({
    modelPath,
    bodyColor = '#E31E24',
    className = '',
}: TrailerViewerProps) {
    return (
        <div className={`ct-trailer-viewer ${className}`.trim()}>
            <div className="ct-trailer-canvas">
                <ViewerErrorBoundary>
                    <Canvas
                        gl={{ antialias: true, alpha: true }}
                        dpr={[1, 2]}
                        style={{ background: 'transparent' }}
                    >
                        <PerspectiveCamera makeDefault position={[50, 25, 50]} fov={35} />
                        <OrbitControls
                            enablePan={false}
                            enableZoom
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
                </ViewerErrorBoundary>
            </div>
        </div>
    );
}
