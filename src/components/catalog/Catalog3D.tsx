'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { CatalogProduct, catalogProducts, paintColors } from '@/data/catalog';
import type { TrailerViewerHandle, ViewName } from '@/components/3d/TrailerViewer';
import Blueprint from '@/components/ui/Blueprint';
import Photo from '@/components/ui/Photo';
import { ArrowIcon, ExpandIcon, RotateIcon } from '@/components/ui/icons';
import { EASE, gsap, prefersReducedMotion, useGSAP } from '@/components/motion/gsap';

const TrailerViewer = dynamic(() => import('@/components/3d/TrailerViewer'), { ssr: false });

const views: { id: ViewName; label: string }[] = [
    { id: 'perspectiva', label: '3/4' },
    { id: 'lateral', label: 'Lateral' },
    { id: 'frontal', label: 'Frontal' },
    { id: 'superior', label: 'Superior' },
];

export default function Catalog3D() {
    const root = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<TrailerViewerHandle>(null);
    const searchParams = useSearchParams();
    const [product, setProduct] = useState<CatalogProduct>(
        () => catalogProducts.find((item) => item.slug === searchParams.get('modelo')) ?? catalogProducts[0],
    );
    const [color, setColor] = useState(product.model?.defaultColor ?? paintColors[0].value);
    const [view, setView] = useState<ViewName>('perspectiva');
    const [autoRotate, setAutoRotate] = useState(false);

    const preset = paintColors.find((option) => option.value.toLowerCase() === color.toLowerCase());
    const productIndex = catalogProducts.indexOf(product);

    useGSAP(
        () => {
            if (prefersReducedMotion()) return;
            gsap.timeline({ defaults: { ease: EASE } })
                .from('.cg-mark', { scale: 0, duration: 1.2, ease: 'expo.inOut', stagger: 0.04 }, 0.1)
                .from('.cg-panel > *', { y: 30, autoAlpha: 0, duration: 1, stagger: 0.06 }, 0.2)
                .from('.cg-toolbar', { y: 40, autoAlpha: 0, duration: 1 }, 0.5);
        },
        { scope: root },
    );

    // Transición al cambiar de producto.
    useGSAP(
        () => {
            if (prefersReducedMotion()) return;
            gsap.from('.cg-head > *', { yPercent: 40, autoAlpha: 0, duration: 0.9, ease: EASE, stagger: 0.05 });
        },
        { scope: root, dependencies: [product.slug] },
    );

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
        <div ref={root} className="cg">
            <div className="cg-stage" ref={stageRef} data-lenis-prevent>
                <span className="cg-mark cg-mark-tl" />
                <span className="cg-mark cg-mark-tr" />
                <span className="cg-mark cg-mark-bl" />
                <span className="cg-mark cg-mark-br" />

                <div className="cg-meta mono">
                    <span>
                        {String(productIndex + 1).padStart(2, '0')} — {product.code}
                    </span>
                    {product.model && <span>{color.toUpperCase()}</span>}
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
                        <p className="cg-hint mono">Arrastra para girar · Rueda o pellizco para acercar</p>
                        <div className="cg-toolbar" role="toolbar" aria-label="Controles del visor">
                            {views.map((option) => (
                                <button
                                    key={option.id}
                                    type="button"
                                    className="cg-tool"
                                    aria-pressed={view === option.id && !autoRotate}
                                    onClick={() => changeView(option.id)}
                                >
                                    {option.label}
                                </button>
                            ))}
                            <button
                                type="button"
                                className="cg-tool cg-tool-icon"
                                aria-pressed={autoRotate}
                                aria-label="Giro automático"
                                title="Giro automático"
                                onClick={() => setAutoRotate((value) => !value)}
                            >
                                <RotateIcon />
                            </button>
                            <button
                                type="button"
                                className="cg-tool cg-tool-icon"
                                aria-label="Pantalla completa"
                                title="Pantalla completa"
                                onClick={toggleFullscreen}
                            >
                                <ExpandIcon />
                            </button>
                        </div>
                    </>
                ) : product.photo ? (
                    <div className="cg-photo">
                        <Photo
                            key={product.slug}
                            name={product.photo.name}
                            alt={`${product.line} ${product.name} de Chief Trailers`}
                            sizes="(max-width: 1100px) 100vw, 68vw"
                        />
                        <p className="cg-photo-note mono">Modelo 3D en preparación</p>
                    </div>
                ) : (
                    <div className="cg-placeholder">
                        <Blueprint kind={product.blueprint} className="cg-blueprint" />
                        <p>
                            <strong>Modelo 3D en preparación.</strong>
                            Estamos integrando esta línea al catálogo interactivo.
                        </p>
                    </div>
                )}
            </div>

            <aside className="cg-panel">
                <div className="cg-block">
                    <p className="tag">Líneas de producto</p>
                    <div className="cg-lines">
                        {catalogProducts.map((item, index) => (
                            <button
                                key={item.slug}
                                type="button"
                                className="cg-line"
                                aria-pressed={item.slug === product.slug}
                                onClick={() => selectProduct(item)}
                            >
                                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                                <span className="cg-line-name">
                                    <small>{item.line}</small>
                                    {item.name}
                                </span>
                                <span className={`chip ${item.model ? 'chip-live' : ''}`}>{item.model ? '3D' : 'Pronto'}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="cg-block cg-head">
                    <p className="mono cg-kicker">
                        {product.line} · {product.code}
                    </p>
                    <h1 className="display">{product.name}</h1>
                    <p className="cg-summary">{product.summary}</p>
                </div>

                <dl className="cg-dims">
                    <div>
                        <dt className="mono">Largo</dt>
                        <dd>{product.dimensions.length}</dd>
                    </div>
                    <div>
                        <dt className="mono">Ancho</dt>
                        <dd>{product.dimensions.width}</dd>
                    </div>
                    <div>
                        <dt className="mono">Alto</dt>
                        <dd>{product.dimensions.height}</dd>
                    </div>
                    <div>
                        <dt className="mono">Capacidad</dt>
                        <dd>{product.capacity}</dd>
                    </div>
                </dl>

                {product.model && (
                    <div className="cg-block">
                        <div className="cg-color-head">
                            <p className="tag">Color de pintura</p>
                            <span className="mono">{preset?.name ?? 'Personalizado'}</span>
                        </div>
                        <div className="cg-swatches">
                            {paintColors.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className="cg-swatch"
                                    style={{ backgroundColor: option.value }}
                                    aria-label={option.name}
                                    title={option.name}
                                    aria-pressed={color.toLowerCase() === option.value.toLowerCase()}
                                    onClick={() => setColor(option.value)}
                                />
                            ))}
                            <label
                                className={`cg-swatch cg-swatch-custom ${preset ? '' : 'is-active'}`}
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

                <div className="cg-ctas">
                    <Link href={quoteHref} className="btn btn-red btn-lg">
                        Cotizar esta configuración <ArrowIcon />
                    </Link>
                    <Link href={quoteHref} className="btn btn-line btn-lg">
                        Solicitar ficha técnica
                    </Link>
                </div>

                <section className="cg-block cg-specs" aria-label="Especificaciones técnicas">
                    <p className="tag">Especificaciones técnicas</p>
                    {product.specs.length === 0 && <div className="cg-specs-empty" />}
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
