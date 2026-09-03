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
        <section id="nosotros" className="ct-section ct-about">
            <div className="ct-shell ct-about-grid">
                <motion.div
                    className="ct-mosaic"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="ct-mosaic-tile ct-mosaic-main">
                        <Image
                            src="/trailer-day.png"
                            alt="Unidad de carga en carretera"
                            fill
                            sizes="(max-width: 900px) 100vw, 34vw"
                            className="ct-cover-image"
                        />
                        <span>Operación</span>
                    </div>
                    <div className="ct-mosaic-tile ct-mosaic-top">
                        <Image
                            src="/hero-background-v2.jpg"
                            alt="Detalle industrial de transporte"
                            fill
                            sizes="(max-width: 900px) 50vw, 18vw"
                            className="ct-cover-image"
                        />
                        <span>Resistencia</span>
                    </div>
                    <div className="ct-mosaic-tile ct-mosaic-bottom">
                        <Image
                            src="/hero-background-user.png"
                            alt="Diseño de transporte para largas rutas"
                            fill
                            sizes="(max-width: 900px) 50vw, 18vw"
                            className="ct-cover-image"
                        />
                        <span>Diseño 3D</span>
                    </div>
                </motion.div>

                <motion.div
                    className="ct-about-copy"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <p className="ct-kicker">¿Quiénes somos?</p>
                    <h2>
                        Detrás de cada
                        <br />
                        remolque hay <span>un equipo</span>
                    </h2>
                    <p className="ct-lead">
                        Fabricantes de remolques y plataformas de alta resistencia para el
                        transporte de carga pesada, con diseño e ingeniería 100% mexicana.
                    </p>

                    <div className="ct-attribute-list">
                        {attributes.map((attribute) => (
                            <div className="ct-attribute" key={attribute}>
                                <span className="ct-attribute-icon" aria-hidden="true">✓</span>
                                <span>{attribute}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
