'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { homeProducts, ProductGlyph } from '@/data/catalog';

function ProductGlyphIcon({ type }: { type: ProductGlyph }) {
    if (type === 'dolly') {
        return (
            <svg viewBox="0 0 160 90" aria-hidden="true">
                <path d="M20 55h40l10-20h30l10 20h30" />
                <circle cx="45" cy="68" r="10" />
                <circle cx="115" cy="68" r="10" />
            </svg>
        );
    }

    if (type === 'special') {
        return (
            <svg viewBox="0 0 100 90" aria-hidden="true">
                <path d="M50 10 90 30v30L50 80 10 60V30z" />
                <path d="M30 45h40M50 25v40" />
            </svg>
        );
    }

    if (type === 'platform') {
        return (
            <svg viewBox="0 0 200 80" aria-hidden="true">
                <path d="M8 42h184V27H20z" />
                <circle cx="42" cy="56" r="8" />
                <circle cx="70" cy="56" r="8" />
                {type === 'platform' && <circle cx="98" cy="56" r="8" />}
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 200 90" aria-hidden="true">
            <path d="M10 60h140V45H60L50 30H10z" />
            <circle cx="35" cy="70" r="9" />
            <circle cx="65" cy="70" r="9" />
        </svg>
    );
}

export default function TrailersCTA() {
    return (
        <section id="productos" className="ct-section ct-products">
            <div className="ct-shell">
                <div className="ct-section-heading ct-products-heading">
                    <div>
                        <p className="ct-kicker">Línea completa</p>
                        <h2>
                            Nuestros
                            <br />
                            <span>productos</span>
                        </h2>
                    </div>
                    <p>
                        Cada línea con su modelado 3D. Explora las especificaciones y visualiza
                        el remolque antes de cotizar.
                    </p>
                </div>

                <div className="ct-product-grid">
                    {homeProducts.map((product, index) => {
                        const href = product.slug === 'proyectos-especiales' || product.status
                            ? '/#contacto'
                            : '/remolques';

                        return (
                            <motion.div
                                key={product.slug}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.45, delay: index * 0.04 }}
                            >
                                <Link
                                    href={href}
                                    className={`ct-product-card ${product.status ? 'is-pending' : ''}`}
                                    aria-label={`${product.name}, ${product.status || 'ver catálogo 3D'}`}
                                >
                                    <div className="ct-product-visual">
                                        <ProductGlyphIcon type={product.glyph} />
                                        {product.status && <span className="ct-product-status">{product.status}</span>}
                                    </div>
                                    <div className="ct-product-body">
                                        <div>
                                            <p className="ct-product-family">{product.family}</p>
                                            <h3>{product.name}</h3>
                                        </div>
                                        <span className="ct-product-link">
                                            {product.status ? 'Solicitar información' : 'Ver modelos 3D'} <span aria-hidden="true">→</span>
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
