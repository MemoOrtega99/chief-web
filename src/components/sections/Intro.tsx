'use client';

import { useRef } from 'react';
import { catalogProducts } from '@/data/catalog';
import { useReveal } from '@/components/motion/useReveal';

const facts = [
    { value: '100%', label: 'Diseño e ingeniería mexicana' },
    { value: String(catalogProducts.length).padStart(2, '0'), label: 'Líneas de producto' },
    { value: 'N.L.', label: 'Planta en Cadereyta Jiménez' },
];

export default function Intro() {
    const root = useRef<HTMLElement>(null);
    useReveal(root);

    return (
        <section ref={root} id="catalogo" className="in">
            <div className="shell in-head">
                <p className="tag" data-fade>
                    Catálogo interactivo
                </p>
                <h2 className="display in-title" data-split>
                    Explora nuestra línea en 3D, <em>antes de cotizar.</em>
                </h2>
            </div>

            <span className="rule" data-line="x" />

            <div className="in-facts">
                {facts.map((fact, index) => (
                    <div className={`in-fact in-fact-${index + 1}`} key={fact.label}>
                        {index > 0 && <span className="in-fact-line" data-line="y" />}
                        <div data-fade>
                            <strong>{fact.value}</strong>
                            <span>{fact.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
