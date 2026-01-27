'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
    {
        number: '01',
        title: 'Remolques a Medida',
        description: 'Diseñamos y fabricamos remolques según las necesidades específicas de tu negocio.',
    },
    {
        number: '02',
        title: 'Catálogo Estándar',
        description: 'Amplia variedad de remolques de carga general, plataformas y especializados.',
    },
    {
        number: '03',
        title: 'Financiamiento',
        description: 'Opciones flexibles de crédito hasta 60 meses para impulsar tu inversión.',
    },
    {
        number: '04',
        title: 'Servicio Postventa',
        description: 'Mantenimiento, refacciones y servicio técnico especializado para tu equipo.',
    },
];

const stats = [
    { value: '20+', label: 'Años' },
    { value: '1000+', label: 'Remolques' },
    { value: '98%', label: 'Satisfacción' },
];

export default function Services() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="servicios" className="section-padding bg-background relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <p className="text-sm text-text-muted tracking-[0.2em] uppercase mb-4">
                        Lo que hacemos
                    </p>
                    <h2 className="text-huge max-w-4xl">
                        Fabricación de remolques de alta calidad
                    </h2>
                </motion.div>

                {/* Services grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-32">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.number}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="border-t border-border pt-8">
                                <span className="text-sm text-text-light mb-4 block">{service.number}</span>
                                <h3 className="text-2xl md:text-3xl font-medium mb-4">{service.title}</h3>
                                <p className="text-text-muted leading-relaxed max-w-md">{service.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="border-t border-border pt-16"
                >
                    <div className="grid grid-cols-3 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center md:text-left">
                                <div className="text-display mb-2">{stat.value}</div>
                                <div className="text-sm text-text-muted tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
