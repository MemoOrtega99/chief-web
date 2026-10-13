'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const attributes = [
    'Diseño 3D',
    'Acero de alta resistencia grado 50 y 100',
    'Pruebas antes de entregar',
];

export default function About() {
    return (
        <section id="nosotros" className="ab-section">
            <div className="ab-shell">
                <div className="ab-section-head">
                    <span className="mono">01 / Nosotros</span>
                    <span className="ab-section-rule" aria-hidden="true" />
                </div>

                <div className="ab-grid">
                    <motion.div
                        className="ab-media"
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="ab-tile ab-tile-main">
                            <Image
                                src="/trailer-day.png"
                                alt="Unidad de carga en carretera"
                                fill
                                sizes="(max-width: 900px) 100vw, 34vw"
                                className="ab-image"
                            />
                            <span className="ab-tile-label"><i>01</i> Operación</span>
                        </div>
                        <div className="ab-tile">
                            <Image
                                src="/hero-background-v2.jpg"
                                alt="Detalle industrial de transporte"
                                fill
                                sizes="(max-width: 900px) 50vw, 18vw"
                                className="ab-image"
                            />
                            <span className="ab-tile-label"><i>02</i> Resistencia</span>
                        </div>
                        <div className="ab-tile">
                            <Image
                                src="/hero-background-user.png"
                                alt="Diseño de transporte para largas rutas"
                                fill
                                sizes="(max-width: 900px) 50vw, 18vw"
                                className="ab-image"
                            />
                            <span className="ab-tile-label"><i>03</i> Diseño 3D</span>
                        </div>
                    </motion.div>

                <motion.div
                    className="ab-copy"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <p className="mono ab-kicker">¿Quiénes somos?</p>
                    <h2 className="display ab-title">
                        Detrás de cada remolque hay <em>un equipo</em>
                    </h2>
                    <p className="ab-lead">
                        Fabricantes de remolques y plataformas de alta resistencia para el
                        transporte de carga pesada, con diseño e ingeniería 100% mexicana.
                    </p>

                    <div className="ab-attributes">
                        {attributes.map((attribute, index) => (
                            <div className="ab-attribute" key={attribute}>
                                <span className="ab-attribute-index">{String(index + 1).padStart(2, '0')}</span>
                                <span>{attribute}</span>
                            </div>
                        ))}
                    </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
