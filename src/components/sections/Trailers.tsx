'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled to avoid hydration issues
const TrailerViewer = dynamic(() => import('@/components/3d/TrailerViewer'), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex items-center justify-center bg-surface rounded-2xl">
            <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
    ),
});

// Trailer model data
const trailerModels = [
    {
        id: 'remolque-1',
        name: 'Remolque 40-20 Fijo Molino',
        category: 'Carga General',
        modelPath: '/models/40-20-fijo-molino-remake.glb',
        specs: {
            Largo: '16.15 m',
            Ancho: '2.60 m',
            Alto: '2.90 m',
            Capacidad: '30,000 kg',
            Volumen: '120 m³',
        },
        color: '#dc2626',
        description: 'Remolque fijo tipo molino 40-20. Construcción robusta para carga pesada.',
    },
    {
        id: 'remolque-2',
        name: 'Remolque 40-20 Variante 2',
        category: 'Carga Especial',
        modelPath: '/models/40-20-fijo-molino-remake-2.glb',
        specs: {
            Largo: '16.10 m',
            Ancho: '2.55 m',
            Alto: '2.75 m',
            Capacidad: '28,000 kg',
            Tipo: 'Fijo Molino',
        },
        color: '#3b82f6',
        description: 'Segunda variante del remolque 40-20, con configuración adaptada para aplicaciones específicas.',
    },
    {
        id: 'remolque-3',
        name: 'Remolque 40-20 Variante 3',
        category: 'Carga Industrial',
        modelPath: '/models/40-20-fijo-molino-remake-3.glb',
        specs: {
            Largo: '14.63 m',
            Ancho: '2.60 m',
            Alto: '1.52 m',
            Capacidad: '35,000 kg',
            Tipo: 'Molino Industrial',
        },
        color: '#22c55e',
        description: 'Tercera variante optimizada para aplicaciones industriales y de alto rendimiento.',
    },
];

export default function Trailers() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [selectedTrailer, setSelectedTrailer] = useState(trailerModels[0]);

    return (
        <section id="remolques" className="py-32 bg-surface relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-surface" />

            <div className="relative max-w-7xl mx-auto px-6" ref={ref}>
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
                        Catálogo 3D
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Nuestros <span className="text-accent">Remolques</span>
                    </h2>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        Explora nuestra línea de remolques en 3D. Gira y visualiza cada modelo con sus especificaciones técnicas.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* 3D Viewer */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-2xl bg-gradient-to-br from-surface-light to-background border border-white/5 overflow-hidden relative">
                            <TrailerViewer modelPath={selectedTrailer.modelPath} bodyColor={selectedTrailer.color} />

                            {/* Controls hint */}
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-text-muted text-sm bg-background/80 px-3 py-2 rounded-lg backdrop-blur-sm z-10">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                </svg>
                                <span>Arrastra para rotar</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Trailer selection and specs */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Model selector */}
                        <div className="flex flex-wrap gap-3">
                            {trailerModels.map((trailer) => (
                                <button
                                    key={trailer.id}
                                    onClick={() => setSelectedTrailer(trailer)}
                                    className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 ${selectedTrailer.id === trailer.id
                                        ? 'bg-accent text-white'
                                        : 'bg-surface-light text-text-muted hover:text-white hover:bg-surface-light/80'
                                        }`}
                                >
                                    {trailer.name}
                                </button>
                            ))}
                        </div>

                        {/* Selected trailer info */}
                        <div className="p-8 rounded-2xl bg-background border border-white/5">
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: selectedTrailer.color }}
                                />
                                <span className="text-text-muted text-sm">{selectedTrailer.category}</span>
                            </div>

                            <h3 className="text-3xl font-bold mb-4">{selectedTrailer.name}</h3>
                            <p className="text-text-muted mb-8 leading-relaxed">{selectedTrailer.description}</p>

                            {/* Specifications */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                                    Especificaciones
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(selectedTrailer.specs).map(([key, value]) => (
                                        <div key={key} className="p-4 rounded-xl bg-surface">
                                            <div className="text-text-muted text-sm capitalize mb-1">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </div>
                                            <div className="text-xl font-semibold">{value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <button className="w-full mt-8 bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                                Solicitar Cotización
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
