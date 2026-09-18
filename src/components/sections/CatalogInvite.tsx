'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { catalogProducts, paintColors } from '@/data/catalog';
import { ArrowIcon } from '@/components/ui/icons';
import { useReveal } from '@/components/motion/useReveal';

const TrailerViewer = dynamic(() => import('@/components/3d/TrailerViewer'), { ssr: false });

const featured = catalogProducts.find((product) => product.model)!;
const COLOR_INTERVAL_MS = 3000;

export default function CatalogInvite() {
    const root = useRef<HTMLElement>(null);
    const media = useRef<HTMLAnchorElement>(null);
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [colorIndex, setColorIndex] = useState(0);
    useReveal(root);

    // Carga el modelo al acercarse a la sección y solo anima mientras está en pantalla.
    useEffect(() => {
        const node = media.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
                if (entry.isIntersecting) setMounted(true);
            },
            { rootMargin: '400px 0px' },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visible) return;
        const timer = setInterval(() => setColorIndex((index) => (index + 1) % paintColors.length), COLOR_INTERVAL_MS);
        return () => clearInterval(timer);
    }, [visible]);

    const color = paintColors[colorIndex];

    return (
        <section ref={root} className="ci">
            <div className="ci-copy">
                <p className="tag" data-fade>
                    Catálogo 3D
                </p>
                <h2 className="display" data-split>
                    Explora nuestro catálogo 3D y <em>personaliza tu unidad.</em>
                </h2>
                <p className="ci-lead" data-fade>
                    Revisa cada remolque a detalle, elige el color de tu flota y envíanos tu configuración para
                    cotizar.
                </p>
                <div data-fade>
                    <Link href="/catalogo" className="btn btn-red btn-lg">
                        Ver catálogo <ArrowIcon />
                    </Link>
                </div>
            </div>

            <Link ref={media} href="/catalogo" className="ci-media" aria-label="Ver catálogo 3D">
                {mounted && (
                    <TrailerViewer
                        modelPath={featured.model!.path}
                        color={color.value}
                        interactive={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                )}
                <span className="ci-color mono" aria-live="off">
                    <i style={{ backgroundColor: color.value }} />
                    {color.name}
                </span>
            </Link>
        </section>
    );
}
