'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { CatalogProduct, catalogProducts, paintColors } from '@/data/catalog';
import type { TrailerViewerHandle, ViewName } from '@/components/3d/TrailerViewer';
import { ArrowIcon, ExpandIcon, RotateIcon } from '@/components/ui/icons';

const TrailerViewer = dynamic(() => import('@/components/3d/TrailerViewer'), { ssr: false });

const views: { id: ViewName; label: string }[] = [
    { id: 'perspectiva', label: '3/4' },
    { id: 'lateral', label: 'Lateral' },
    { id: 'frontal', label: 'Frontal' },
    { id: 'superior', label: 'Superior' },
];

function TrailerOutline() {
    return (
        <svg viewBox="0 0 520 120" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M10 58h92l10-16h398v18H120l-10 14H10z" />
            <path d="M112 42v32M200 60v10h260V60" strokeDasharray="4 4" />
            <path d="M40 74v20M34 94h12" />
            <circle cx="392" cy="92" r="16" />
            <circle cx="436" cy="92" r="16" />
            <circle cx="392" cy="92" r="6" />
            <circle cx="436" cy="92" r="6" />
            <path d="M10 112h500" strokeDasharray="2 6" />
        </svg>
    );
}

export default function Catalog3D() {
    const searchParams = useSearchParams();
    const [product, setProduct] = useState<CatalogProduct>(
        () => catalogProducts.find((item) => item.slug === searchParams.get('modelo')) ?? catalogProducts[0],
    );
    const [color, setColor] = useState(product.model?.defaultColor ?? paintColors[0].value);
    const [view, setView] = useState<ViewName>('perspectiva');
    const [autoRotate, setAutoRotate] = useState(false);
    const stageRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<TrailerViewerHandle>(null);

    const preset = paintColors.find((option) => option.value.toLowerCase() === color.toLowerCase());

    const selectProduct = (next: CatalogProduct) => {
        setProduct(next);
        if (next.model) setColor(next.model.defaultColor);
        const url = new URL(window.location.href);
        url.searchParams.set('modelo', next.slug);
        window.history.replaceState(null, '', url);
    };

    const changeView = (next: ViewName) => {
        setView(next);
        setAutoRotate(false);
        viewerRef.current?.setView(next);
    };

    const toggleFullscreen = () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else stageRef.current?.requestFullscreen?.();
    };

    const quoteHref = `/?modelo=${product.slug}${product.model ? `&color=${encodeURIComponent(color)}` : ''}#contacto`;

    return (
        <div className="ch-catalog">
            <div className="ch-catalog-stage" ref={stageRef}>
                <div className="ch-stage-meta">
                    <div>
                        <span>{product.line}</span>
                        <strong>{product.code}</strong>
                    </div>
                    {product.model && (
                        <div className="is-right">
                            <span>Color</span>
                            <strong>{preset?.name ?? color.toUpperCase()}</strong>
                        </div>
                    )}
                </div>

                {product.model ? (
                    <>
                        <TrailerViewer
                            ref={viewerRef}
                            key={product.model.path}
                            modelPath={product.model.path}
                            color={color}
                            autoRotate={autoRotate}
                        />
                        <div className="ch-toolbar" role="toolbar" aria-label="Controles del visor">
                            {views.map((option) => (
                                <button
                                    key={option.id}
                                    type="button"
                                    className="ch-tool"
                                    aria-pressed={view === option.id && !autoRotate}
                                    onClick={() => changeView(option.id)}
                                >
                                    {option.label}
                                </button>
                            ))}
                            <span className="ch-toolbar-sep" />
                            <button
                                type="button"
                                className="ch-tool ch-tool-icon"
                                aria-pressed={autoRotate}
                                aria-label="Giro automático"
                                title="Giro automático"
                                onClick={() => setAutoRotate((value) => !value)}
                            >
                                <RotateIcon />
                            </button>
                            <button
                                type="button"
                                className="ch-tool ch-tool-icon"
                                aria-label="Pantalla completa"
                                title="Pantalla completa"
                                onClick={toggleFullscreen}
                            >
                                <ExpandIcon />
                            </button>
                        </div>
                        <p className="ch-stage-hint">Arrastra para girar · Rueda o pellizco para acercar</p>
                    </>
                ) : (
                    <div className="ch-placeholder">
                        <TrailerOutline />
                        <p>
                            <strong>Modelo 3D en preparación</strong>
                            Estamos integrando esta línea al catálogo interactivo. Solicita su ficha técnica y te la
                            enviamos.
                        </p>
                    </div>
                )}
            </div>

            <aside className="ch-catalog-panel">
                <fieldset className="ch-line-picker">
                    <legend className="ch-label">Líneas de producto</legend>
                    {catalogProducts.map((item) => (
                        <button
                            key={item.slug}
                            type="button"
                            className="ch-line-option"
                            aria-pressed={item.slug === product.slug}
                            onClick={() => selectProduct(item)}
                        >
                            <div>
                                <span>{item.line}</span>
                                <strong>{item.name}</strong>
                            </div>
                            <em className={`ch-status ${item.model ? 'is-live' : ''}`}>
                                {item.model ? '3D' : 'Pronto'}
                            </em>
                        </button>
                    ))}
                </fieldset>

                <div className="ch-product-head">
                    <p className="ch-label">{product.line} · {product.code}</p>
                    <h1 className="ch-display">{product.name}</h1>
                    <p>{product.summary}</p>
                </div>

                {(product.dimensions || product.capacity) && (
                    <dl className="ch-dims">
                        {product.dimensions && (
                            <>
                                <div>
                                    <dt>Largo</dt>
                                    <dd>{product.dimensions.length}</dd>
                                </div>
                                <div>
                                    <dt>Ancho</dt>
                                    <dd>{product.dimensions.width}</dd>
                                </div>
                                <div>
                                    <dt>Alto</dt>
                                    <dd>{product.dimensions.height}</dd>
                                </div>
                            </>
                        )}
                        {product.capacity && (
                            <div>
                                <dt>Capacidad</dt>
                                <dd>{product.capacity}</dd>
                            </div>
                        )}
                    </dl>
                )}

                {product.model && (
                    <div>
                        <div className="ch-field-label">
                            Color de pintura
                            <b>{preset?.name ?? 'Personalizado'} · {color.toUpperCase()}</b>
                        </div>
                        <div className="ch-swatch-row">
                            {paintColors.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className="ch-swatch"
                                    style={{ backgroundColor: option.value }}
                                    aria-label={option.name}
                                    title={option.name}
                                    aria-pressed={color.toLowerCase() === option.value.toLowerCase()}
                                    onClick={() => setColor(option.value)}
                                />
                            ))}
                            <label
                                className={`ch-custom-color ${preset ? '' : 'is-active'}`}
                                title="Elegir cualquier color"
                            >
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(event) => setColor(event.target.value)}
                                    aria-label="Elegir color personalizado"
                                />
                            </label>
                        </div>
                    </div>
                )}

                <div className="ch-cta-stack">
                    <Link href={quoteHref} className="ch-btn ch-btn-red">
                        Cotizar esta configuración <ArrowIcon />
                    </Link>
                    <Link href={quoteHref} className="ch-btn ch-btn-outline-dark">
                        Solicitar ficha técnica
                    </Link>
                </div>

                <section className="ch-specs" aria-label="Especificaciones técnicas">
                    <h2>Especificaciones técnicas</h2>
                    {product.specs.map((group, index) => (
                        <details key={`${product.slug}-${group.title}`} open={index === 0}>
                            <summary>{group.title}</summary>
                            <ul>
                                {group.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </details>
                    ))}
                </section>
            </aside>
        </div>
    );
}
