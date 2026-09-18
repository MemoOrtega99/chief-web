'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowIcon } from '@/components/ui/icons';
import { useReveal } from '@/components/motion/useReveal';

export default function CatalogInvite() {
    const root = useRef<HTMLElement>(null);
    useReveal(root);

    return (
        <section ref={root} className="ci">
            <div className="ci-copy">
                <p className="tag" data-fade>
                    Catálogo
                </p>
                <h2 className="display" data-split>
                    Explora nuestro catálogo y <em>personaliza tu unidad.</em>
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

            <Link href="/catalogo" className="ci-media" aria-label="Ver catálogo" data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/renders/phc-rojo-34.webp" alt="Plataforma High Cube 40 pies" loading="lazy" />
            </Link>
        </section>
    );
}
