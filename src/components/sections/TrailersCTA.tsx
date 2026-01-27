'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function TrailersCTA() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="remolques" className="section-padding bg-foreground text-background relative overflow-hidden">
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-sm text-background/60 tracking-[0.2em] uppercase mb-4">
                            Catálogo 3D
                        </p>
                        <h2 className="text-huge mb-8">
                            Explora nuestros remolques
                        </h2>
                        <p className="text-xl text-background/70 leading-relaxed mb-10 max-w-lg">
                            Visualiza cada modelo en detalle con nuestro visor 3D interactivo.
                            Gira, acerca y conoce las especificaciones técnicas.
                        </p>
                        <Link
                            href="/remolques"
                            className="inline-flex items-center gap-3 text-background border border-background/30 px-8 py-4 hover:bg-background hover:text-foreground transition-all duration-300 group"
                        >
                            <span className="text-sm font-medium tracking-wide uppercase">Ver Catálogo</span>
                            <svg
                                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>

                    {/* Right - Preview cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-4"
                    >
                        {[
                            { name: 'Caja Seca 53"', type: 'Carga General', capacity: '30,000 kg' },
                            { name: 'Refrigerado 53"', type: 'Temperatura Controlada', capacity: '26,000 kg' },
                            { name: 'Plataforma 48"', type: 'Carga Especial', capacity: '35,000 kg' },
                        ].map((trailer, index) => (
                            <motion.div
                                key={trailer.name}
                                initial={{ opacity: 0, x: 40 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                className="p-6 border border-background/10 hover:border-background/30 transition-colors group cursor-pointer"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-medium mb-1">{trailer.name}</h3>
                                        <p className="text-sm text-background/50">{trailer.type}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-background/50">Capacidad</p>
                                        <p className="font-medium">{trailer.capacity}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
