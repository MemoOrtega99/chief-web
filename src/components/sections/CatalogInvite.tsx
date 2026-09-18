'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { catalogProducts, paintColors } from '@/data/catalog';
import { ArrowIcon } from '@/components/ui/icons';

const TrailerViewer = dynamic(() => import('@/components/3d/TrailerViewer'), { ssr: false });

const featured = catalogProducts.find((product) => product.model)!;
const previewColors = paintColors.slice(0, 5);

/** Monta el visor solo cuando la sección se acerca al viewport. */
function useNearViewport<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [near, setNear] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node || near) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setNear(true);
            },
            { rootMargin: '300px 0px' },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [near]);

    return [ref, near] as const;
}

export default function CatalogInvite() {
    const [color, setColor] = useState(featured.model!.defaultColor);
    const [stageRef, showViewer] = useNearViewport<HTMLDivElement>();
    const colorName = paintColors.find((option) => option.value === color)?.name ?? color;

    return (
        <section id="catalogo" className="ch-invite">
            <div className="ch-shell">
                <div className="ch-section-head">
                    <p className="ch-label">Catálogo interactivo</p>
                    <h2 className="ch-display">
                        Conoce tu remolque
                        <br />
                        <em>antes de fabricarlo</em>
                    </h2>
                    <p>
                        Nuestra línea está modelada en 3D a partir de los mismos archivos de ingeniería con los
                        que la fabricamos. Gírala, acércate a los detalles y elige el color de tu flota.
                    </p>
                </div>

                <div className="ch-stage">
                    <div className="ch-stage-canvas" ref={stageRef}>
                        <div className="ch-stage-tag">
                            <span>{featured.code}</span>
                            <strong>
                                {featured.line} {featured.name}
                            </strong>
                        </div>
                        {showViewer ? (
                            <TrailerViewer
                                modelPath={featured.model!.path}
                                color={color}
                                autoRotate
                                interactive={false}
                            />
                        ) : (
                            <div className="ch-stage-poster">Modelo 3D</div>
                        )}
                    </div>

                    <div className="ch-stage-panel">
                        <h3>
                            <small>{featured.line}</small>
                            {featured.name} · 2 ejes
                        </h3>

                        {featured.dimensions && (
                            <dl className="ch-dims">
                                <div>
                                    <dt>Largo</dt>
                                    <dd>{featured.dimensions.length}</dd>
                                </div>
                                <div>
                                    <dt>Ancho</dt>
                                    <dd>{featured.dimensions.width}</dd>
                                </div>
                                <div>
                                    <dt>Alto</dt>
                                    <dd>{featured.dimensions.height}</dd>
                                </div>
                                <div>
                                    <dt>Capacidad</dt>
                                    <dd>{featured.capacity}</dd>
                                </div>
                            </dl>
                        )}

                        <div>
                            <div className="ch-field-label">
                                Color
                                <b>{colorName}</b>
                            </div>
                            <div className="ch-swatch-row">
                                {previewColors.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        className="ch-swatch"
                                        style={{ backgroundColor: option.value }}
                                        aria-label={option.name}
                                        aria-pressed={color === option.value}
                                        onClick={() => setColor(option.value)}
                                    />
                                ))}
                            </div>
                        </div>

                        <Link href="/catalogo" className="ch-btn ch-btn-red">
                            Abrir catálogo 3D <ArrowIcon />
                        </Link>
                    </div>
                </div>

                <div className="ch-lines">
                    {catalogProducts.map((product) => (
                        <Link
                            key={product.slug}
                            href={`/catalogo?modelo=${product.slug}`}
                            className="ch-line-item"
                        >
                            <div>
                                <span>{product.line}</span>
                                <strong>{product.name}</strong>
                            </div>
                            <em className={`ch-status ${product.model ? 'is-live' : ''}`}>
                                {product.model ? '3D' : 'Próximamente'}
                            </em>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
