'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { catalogProducts } from '@/data/catalog';
import { ArrowIcon } from '@/components/ui/icons';
import Photo from '@/components/ui/Photo';
import { useReveal } from '@/components/motion/useReveal';

// Las líneas con foto primero; las que aún no tienen quedan al final.
const products = [...catalogProducts].sort((a, b) => Number(!a.photo) - Number(!b.photo));

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
                {products.map((product, index) => (
                    <Link key={product.slug} href={`/catalogo?modelo=${product.slug}`} className="pr-card">
                        <div className="pr-card-media" data-reveal>
                            {product.photo ? (
                                <Photo
                                    name={product.photo.name}
                                    position={product.photo.position}
                                    alt={`${product.line} ${product.name} de Chief Trailers`}
                                    sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                                />
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
