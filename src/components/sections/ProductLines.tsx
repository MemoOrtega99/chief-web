'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { catalogProducts } from '@/data/catalog';
import Blueprint from '@/components/ui/Blueprint';
import { ArrowIcon } from '@/components/ui/icons';
import { useReveal } from '@/components/motion/useReveal';

export default function ProductLines() {
    const root = useRef<HTMLElement>(null);
    useReveal(root);

    return (
        <section ref={root} className="pl-sec">
            <div className="shell pl-head">
                <div>
                    <p className="tag" data-fade>
                        Líneas de producto
                    </p>
                    <h2 className="display" data-split>
                        Nuestra <em>línea.</em>
                    </h2>
                </div>
                <p className="pl-count mono" data-fade>
                    ({String(catalogProducts.length).padStart(2, '0')})
                </p>
            </div>

            <span className="rule" data-line="x" />

            <div className="pl-grid">
                <span className="pl-divider" data-line="y" aria-hidden="true" />
                {catalogProducts.map((product, index) => (
                    <Link
                        key={product.slug}
                        href={`/catalogo?modelo=${product.slug}`}
                        className={`pl-card ${index % 2 ? 'is-offset' : ''}`}
                    >
                        <div className="pl-card-media" data-reveal>
                            <span className="pl-card-index mono">{String(index + 1).padStart(2, '0')}</span>
                            <span className={`chip ${product.model ? 'chip-live' : ''}`}>
                                {product.model ? 'Modelo 3D' : 'Próximamente'}
                            </span>
                            {product.render ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={product.render} alt={`${product.line} ${product.name}`} loading="lazy" />
                            ) : (
                                <Blueprint kind={product.blueprint} className="pl-card-blueprint" />
                            )}
                        </div>
                        <div className="pl-card-foot">
                            <div>
                                <span className="mono">{product.line}</span>
                                <strong>{product.name}</strong>
                            </div>
                            <span className="square-arrow" aria-hidden="true">
                                <ArrowIcon />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
