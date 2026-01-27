'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="nosotros" className="section-padding bg-background relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left - Main content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-sm text-text-muted tracking-[0.2em] uppercase mb-4">
                            Nuestra Historia
                        </p>
                        <h2 className="text-huge mb-12">
                            20 años fabricando calidad
                        </h2>

                        <div className="space-y-6 text-lg text-text-muted leading-relaxed">
                            <p>
                                Desde 2004, nos hemos consolidado como referencia en la fabricación
                                de remolques en México. Lo que comenzó como un pequeño taller,
                                hoy es una planta con capacidad de producción de más de 1000 unidades anuales.
                            </p>
                            <p>
                                Nuestros remolques están diseñados para resistir las condiciones
                                más exigentes, con materiales de primera calidad y acabados
                                de clase mundial.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right - Values */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:pt-24"
                    >
                        <div className="space-y-8">
                            {[
                                {
                                    title: 'Compromiso',
                                    description: 'Cada remolque fabricado con los más altos estándares.',
                                },
                                {
                                    title: 'Innovación',
                                    description: 'Tecnología de vanguardia en diseño y manufactura.',
                                },
                                {
                                    title: 'Confianza',
                                    description: 'Más de 1000 clientes satisfechos en todo México.',
                                },
                            ].map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                    className="border-l-2 border-foreground pl-6"
                                >
                                    <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                                    <p className="text-text-muted">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
