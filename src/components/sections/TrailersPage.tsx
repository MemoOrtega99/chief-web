'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { colorOptions, homeProducts, viewerModels, ViewerModel } from '@/data/catalog';

const TrailerViewer = dynamic(() => import('@/components/3d/TrailerViewer'), {
    ssr: false,
    loading: () => <div className="ct-viewer-loading">Cargando modelo 3D...</div>,
});

const specificationGroups = [
    {
        title: 'Estructura',
        items: [
            'Vigas principales tipo I en acero G50 o Strenx',
            'Doble cuello con vigas A36 o Strenx',
            'Corazas de ¼ pulgada grado 50',
            'Piso de madera de pino traslapada de 1½ pulgadas',
            'Borda lateral con canal estructural de 6 pulgadas',
        ],
    },
    {
        title: 'Patines y suspensión neumática',
        items: [
            'Patines Holland Mark V, Ampro o Jost',
            'Suspensión neumática de 30,000 lbs',
            'Eje tipo Propar con capacidad de 30,000 lbs',
        ],
    },
    {
        title: 'Sistema de arrastre',
        items: [
            'Gancho de arrastre Wallace Force R50-10',
            'Patín Ampro de dos velocidades',
            'Sistema de arrastre configurado para trabajo pesado',
        ],
    },
    {
        title: 'Accesorios y opcionales',
        items: [
            'Sistema ABS Bendix de 2 o 4 sensores',
            'Luces y arnés marca Grote',
            'Rines de acero o aluminio de 22.5 pulgadas',
            'Sistema de autoinflado y logotipo de empresa',
        ],
    },
];

export default function TrailersPage() {
    const [selectedTrailer, setSelectedTrailer] = useState<ViewerModel>(viewerModels[0]);
    const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
    const [openGroup, setOpenGroup] = useState(specificationGroups[0].title);

    const selectTrailer = (trailer: ViewerModel) => {
        setSelectedTrailer(trailer);
        const matchingColor = colorOptions.find((color) => color.value === trailer.defaultColor);
        if (matchingColor) setSelectedColor(matchingColor);
    };

    return (
        <div className="ct-product-page">
            <section className="ct-product-hero">
                <div className="ct-shell ct-product-split">
                    <div className="ct-product-viewer">
                        <TrailerViewer
                            modelPath={selectedTrailer.modelPath}
                            bodyColor={selectedColor.value}
                        />
                        <div className="ct-viewer-hint">Arrastra para girar · Scroll para zoom</div>
                    </div>

                    <div className="ct-product-info">
                        <Link href="/" className="ct-back-link">← Volver al inicio</Link>
                        <h1>{selectedTrailer.name}</h1>
                        <p className="ct-lead">{selectedTrailer.description}</p>

                        <div className="ct-model-selector" aria-label="Seleccionar modelo 3D">
                            {viewerModels.map((trailer) => (
                                <button
                                    key={trailer.id}
                                    type="button"
                                    onClick={() => selectTrailer(trailer)}
                                    className={selectedTrailer.id === trailer.id ? 'is-active' : ''}
                                >
                                    {trailer.name}
                                </button>
                            ))}
                        </div>

                        <div className="ct-spec-summary">
                            {Object.entries(selectedTrailer.specs).slice(0, 3).map(([key, value]) => (
                                <div key={key}>
                                    <span>{key}</span>
                                    <strong>{value}</strong>
                                </div>
                            ))}
                        </div>

                        <div className="ct-capacity-strip">
                            <span>Capacidad de carga</span>
                            <strong>{selectedTrailer.specs.Capacidad}</strong>
                        </div>

                        <div className="ct-color-picker">
                            <div>
                                <span>Color de carrocería</span>
                                <small>{selectedColor.name}</small>
                            </div>
                            <div className="ct-color-options">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() => setSelectedColor(color)}
                                        className={selectedColor.value === color.value ? 'is-active' : ''}
                                        style={{ backgroundColor: color.value }}
                                        aria-label={`Seleccionar color ${color.name}`}
                                        aria-pressed={selectedColor.value === color.value}
                                    />
                                ))}
                            </div>
                        </div>

                        <Link href="/#contacto" className="ct-button ct-button-primary ct-button-wide">
                            Cotizar esta configuración <span aria-hidden="true">→</span>
                        </Link>
                        <Link href="/#contacto" className="ct-button ct-button-outline ct-button-wide">
                            Solicitar ficha técnica (PDF)
                        </Link>
                    </div>
                </div>
            </section>

            <section className="ct-product-specs">
                <div className="ct-narrow-shell">
                    <div className="ct-section-heading">
                        <div>
                            <p className="ct-kicker">Datos de ingeniería</p>
                            <h2>
                                Especificaciones
                                <br />
                                <span>técnicas</span>
                            </h2>
                        </div>
                        <p>Conoce la estructura, suspensión, sistema de arrastre y opciones disponibles para esta línea.</p>
                    </div>

                    <div className="ct-accordion">
                        {specificationGroups.map((group) => {
                            const isOpen = openGroup === group.title;
                            return (
                                <div className={`ct-accordion-item ${isOpen ? 'is-open' : ''}`} key={group.title}>
                                    <button
                                        type="button"
                                        className="ct-accordion-trigger"
                                        onClick={() => setOpenGroup(isOpen ? '' : group.title)}
                                        aria-expanded={isOpen}
                                    >
                                        <span>{group.title}</span>
                                        <strong aria-hidden="true">+</strong>
                                    </button>
                                    {isOpen && (
                                        <ul className="ct-accordion-content">
                                            {group.items.map((item) => <li key={item}>{item}</li>)}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="ct-product-gallery">
                <div className="ct-shell">
                    <div className="ct-section-heading ct-gallery-heading">
                        <div>
                            <p className="ct-kicker">Trabajo que se ve</p>
                            <h2>Unidades <span>entregadas</span></h2>
                        </div>
                        <p>Imágenes de referencia mientras incorporamos la galería fotográfica de cada línea.</p>
                    </div>
                    <div className="ct-gallery-grid">
                        <div className="ct-gallery-image ct-gallery-large">
                            <Image src="/trailer-day.png" alt="Unidad de carga en carretera" fill sizes="(max-width: 800px) 100vw, 50vw" className="ct-cover-image" />
                        </div>
                        <div className="ct-gallery-image">
                            <Image src="/hero-background-v2.jpg" alt="Transporte en operación" fill sizes="(max-width: 800px) 50vw, 25vw" className="ct-cover-image" />
                        </div>
                        <div className="ct-gallery-image">
                            <Image src="/hero-background-user.png" alt="Ruta de transporte" fill sizes="(max-width: 800px) 50vw, 25vw" className="ct-cover-image" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="ct-product-closing">
                <p className="ct-kicker ct-kicker-light">Da el siguiente paso</p>
                <h2>¿Este modelo es <span>el ideal</span> para tu operación?</h2>
                <Link href="/#contacto" className="ct-button ct-button-primary">Cotizar ahora <span aria-hidden="true">→</span></Link>
            </section>

            <section className="ct-related">
                <div className="ct-shell">
                    <p className="ct-kicker">Explora más</p>
                    <h2>También te puede <span>interesar</span></h2>
                    <div className="ct-related-grid">
                        {homeProducts.slice(0, 4).map((product) => (
                            <Link href="/#productos" className="ct-related-card" key={product.slug}>
                                <span className="ct-related-mark" aria-hidden="true">+</span>
                                <span>{product.family}</span>
                                <strong>{product.name}</strong>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
