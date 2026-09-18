'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';

const TrailerViewer = dynamic(() => import('@/components/3d/TrailerViewer'), {
    ssr: false,
    loading: () => <div className="ct-viewer-loading">Cargando modelo 3D...</div>,
});

const highlights = ['Diseño 3D', 'Acero G50 / G100', 'Pruebas antes de entregar'];

export default function Hero() {
    return (
        <section id="inicio" className="ct-hero">
            <div className="ct-hero-arc ct-hero-arc-one" />
            <div className="ct-hero-arc ct-hero-arc-two" />

            <div className="ct-shell ct-hero-grid">
                <motion.div
                    className="ct-hero-copy"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="ct-kicker ct-kicker-light">Fabricación de remolques industriales</p>
                    <h1>
                        Ingeniería <span>Mexicana</span>
                        <br />
                        con Visión Global
                    </h1>
                    <p className="ct-hero-subtitle">
                        En Chief Trailers del Norte, la calidad es primero.
                    </p>
                    <Link href="/#contacto" className="ct-button ct-button-primary">
                        Cotiza tu remolque
                        <span aria-hidden="true">→</span>
                    </Link>

                    <div className="ct-checks" aria-label="Atributos de calidad">
                        {highlights.map((item) => (
                            <div className="ct-check" key={item}>
                                <span className="ct-check-icon" aria-hidden="true">✓</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="ct-hero-stage"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.15 }}
                >
                    <div className="ct-red-panel ct-red-panel-one" />
                    <div className="ct-red-panel ct-red-panel-two" />
                    <div className="ct-red-panel ct-red-panel-three" />
                    <div className="ct-hero-model">
                        <TrailerViewer
                            modelPath="/models/40-20-fijo-molino-remake.glb"
                            bodyColor="#E31E24"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
