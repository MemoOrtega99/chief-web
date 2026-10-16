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
                    <span className="tag">01 / Nosotros</span>
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
                        <div className="ab-tile">
                            <Image
                                src="/fotos/chief-proceso-corte-plasma-1200.webp"
                                alt="Proceso de corte y fabricación de remolques"
                                fill
                                sizes="(max-width: 900px) 50vw, 22vw"
                                className="ab-image"
                            />
                        </div>
                        <div className="ab-tile">
                            <Image
                                src="/fotos/chief-producto-high-cube-40-3-ejes-1200.webp"
                                alt="Plataforma High Cube de 3 ejes"
                                fill
                                sizes="(max-width: 900px) 50vw, 22vw"
                                className="ab-image"
                            />
                        </div>
                        <div className="ab-tile">
                            <Image
                                src="/fotos/chief-producto-cama-baja-53-3-ejes-1200.webp"
                                alt="Cama baja Chief de 53 FT y 3 ejes"
                                fill
                                sizes="(max-width: 900px) 50vw, 22vw"
                                className="ab-image"
                            />
                        </div>
                        <div className="ab-tile">
                            <Image
                                src="/fotos/chief-proceso-personalizacion-1200.webp"
                                alt="Unidades Chief listas para personalización"
                                fill
                                sizes="(max-width: 900px) 50vw, 22vw"
                                className="ab-image"
                            />
                        </div>
                        <div className="ab-brand-mark" aria-hidden="true">
                            <Image src="/chief-logo-iso.png" alt="" width={240} height={240} className="ab-brand-logo" />
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
