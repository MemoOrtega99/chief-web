'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamic import with SSR disabled
const TrailerViewer = dynamic(() => import('@/components/3d/TrailerViewer'), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex items-center justify-center bg-surface">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-text-light border-t-foreground rounded-full animate-spin" />
                <span className="text-sm text-text-muted">Cargando modelo...</span>
            </div>
        </div>
    ),
});

// Trailer model data
const trailerModels = [
    {
        id: 'remolque-1',
        name: 'Remolque 40-20 Fijo Molino',
        category: 'Carga General',
        modelPath: '/models/40-20 Fijo Molino Remake.glb',
        specs: {
            Largo: '16.15 m',
            Ancho: '2.60 m',
            Alto: '2.90 m',
            Capacidad: '30,000 kg',
            Volumen: '120 m³',
        },
        description: 'Remolque fijo tipo molino 40-20. Construcción robusta para carga pesada.',
        features: ['Estructura reforzada', 'Piso de acero', 'Alta capacidad de carga', 'Diseño optimizado'],
    },
    {
        id: 'remolque-2',
        name: 'Remolque 40-20 Variante 2',
        category: 'Carga Especial',
        modelPath: '/models/40-20 Fijo Molino Remake-2.glb',
        specs: {
            Largo: '16.10 m',
            Ancho: '2.55 m',
            Alto: '2.75 m',
            Capacidad: '28,000 kg',
            Tipo: 'Fijo Molino',
        },
        description: 'Segunda variante del remolque 40-20, con configuración adaptada para aplicaciones específicas.',
        features: ['Configuración personalizada', 'Estructura reforzada', 'Versatilidad de uso', 'Diseño industrial'],
    },
    {
        id: 'remolque-3',
        name: 'Remolque 40-20 Variante 3',
        category: 'Carga Industrial',
        modelPath: '/models/40-20 Fijo Molino Remake-3.glb',
        specs: {
            Largo: '14.63 m',
            Ancho: '2.60 m',
            Alto: '1.52 m',
            Capacidad: '35,000 kg',
            Tipo: 'Molino Industrial',
        },
        description: 'Tercera variante optimizada para aplicaciones industriales y de alto rendimiento.',
        features: ['Diseño compacto', 'Alta resistencia', 'Fácil mantenimiento', 'Aplicación industrial'],
    },
];

// Available colors for the trailer body
const colorOptions = [
    { name: 'Rojo Chief', value: '#dc2626' },
    { name: 'Azul', value: '#2563eb' },
    { name: 'Verde', value: '#16a34a' },
    { name: 'Amarillo', value: '#eab308' },
    { name: 'Blanco', value: '#f5f5f5' },
    { name: 'Negro', value: '#171717' },
];

export default function TrailersPage() {
    const [selectedTrailer, setSelectedTrailer] = useState(trailerModels[0]);
    const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero section */}
            <section className="pt-24 pb-8 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-foreground transition-colors mb-12"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                            </svg>
                            Volver
                        </Link>

                        <p className="text-sm text-text-muted tracking-[0.2em] uppercase mb-4">
                            Catálogo 3D
                        </p>
                        <h1 className="text-huge max-w-3xl">
                            Explora nuestros remolques
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Model selector - Sticky */}
            <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-xl border-y border-border">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 -mb-2">
                        {trailerModels.map((trailer) => (
                            <button
                                key={trailer.id}
                                onClick={() => setSelectedTrailer(trailer)}
                                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 ${selectedTrailer.id === trailer.id
                                    ? 'bg-foreground text-background'
                                    : 'text-text-muted hover:text-foreground'
                                    }`}
                            >
                                {trailer.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3D Viewer and specs */}
            <section className="relative pb-[450px] lg:pb-0">
                {/* Full width 3D Viewer */}
                <motion.div
                    key={selectedTrailer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                >
                    <div className="h-[80vh] bg-surface overflow-hidden relative">
                        <TrailerViewer modelPath={selectedTrailer.modelPath} bodyColor={selectedColor.value} />



                        {/* Controls hint */}
                        <div className="absolute bottom-6 left-6 text-sm text-text-muted bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
                            Arrastra para rotar • Scroll para zoom
                        </div>
                    </div>
                </motion.div>

                {/* Floating Specs panel */}
                <motion.div
                    key={`specs-${selectedTrailer.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-4 right-4 lg:top-8 lg:right-8 w-[calc(100%-2rem)] lg:w-full max-w-sm lg:max-w-md bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 lg:p-8 space-y-4 lg:space-y-6 border border-border"
                >
                    {/* Title */}
                    <div>
                        <p className="text-xs text-text-muted tracking-[0.2em] uppercase mb-2">{selectedTrailer.category}</p>
                        <h2 className="text-2xl font-semibold">{selectedTrailer.name}</h2>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-muted leading-relaxed">
                        {selectedTrailer.description}
                    </p>

                    {/* Specs */}
                    <div className="border-t border-border pt-6">
                        <p className="text-xs text-text-muted tracking-[0.15em] uppercase mb-4">
                            Especificaciones
                        </p>
                        <div className="space-y-2">
                            {Object.entries(selectedTrailer.specs).map(([key, value]) => (
                                <div key={key} className="flex justify-between py-1.5 text-sm border-b border-border/50">
                                    <span className="text-text-muted">{key}</span>
                                    <span className="font-medium">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <p className="text-xs text-text-muted tracking-[0.15em] uppercase mb-4">
                            Características
                        </p>
                        <ul className="space-y-2">
                            {selectedTrailer.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                    <span className="w-1 h-1 bg-foreground rounded-full" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Color picker */}
                    <div>
                        <p className="text-xs text-text-muted tracking-[0.15em] uppercase mb-4">
                            Color de Carrocería
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {colorOptions.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor.value === color.value
                                        ? 'border-foreground scale-110 shadow-lg'
                                        : 'border-border hover:scale-105'
                                        }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-text-muted mt-2">{selectedColor.name}</p>
                    </div>

                    {/* CTA */}
                    <button className="btn-solid w-full justify-center">
                        Solicitar Cotización
                    </button>
                </motion.div>
            </section>

            {/* Additional info */}
            <section className="py-24 px-6 lg:px-12 bg-surface">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: 'Garantía',
                                description: '2 años en estructura y componentes principales.',
                            },
                            {
                                title: 'Financiamiento',
                                description: 'Opciones de crédito hasta 60 meses.',
                            },
                            {
                                title: 'Servicio',
                                description: 'Soporte técnico y refacciones 24/7.',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                                <p className="text-text-muted">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
