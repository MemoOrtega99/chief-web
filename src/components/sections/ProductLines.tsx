'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { catalogProducts } from '@/data/catalog';
import { ArrowIcon } from '@/components/ui/icons';
import { useReveal } from '@/components/motion/useReveal';

export default function ProductLines() {
    const root = useRef<HTMLElement>(null);
    useReveal(root);

    return (
        <section ref={root} id="productos" className="pr">
            <div className="shell pr-head">
                <div>
                    <p className="tag" data-fade>
                        Productos
                    </p>
                    <h2 className="display" data-split>
                        Nuestros <em>productos.</em>
                    </h2>
                </div>
                <p className="pr-lead" data-fade>
                    Remolques y plataformas de alta resistencia para el transporte de carga pesada.
                </p>
            </div>

            <div className="pr-grid">
                {catalogProducts.map((product, index) => (
                    <Link key={product.slug} href={`/catalogo?modelo=${product.slug}`} className="pr-card">
                        <div className="pr-card-media" data-reveal>
                            {product.photo ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={product.photo} alt={`${product.line} ${product.name}`} loading="lazy" />
                            ) : (
                                <div className="pr-photo-slot" aria-hidden="true">
                                    <span className="mono">Foto de producto</span>
                                </div>
                            )}
                        </div>
                        <div className="pr-card-foot">
                            <span className="mono pr-card-index">{String(index + 1).padStart(2, '0')}</span>
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
