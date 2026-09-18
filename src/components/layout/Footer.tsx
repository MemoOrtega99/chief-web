'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { catalogProducts, contact } from '@/data/catalog';
import { gsap, prefersReducedMotion, useGSAP } from '@/components/motion/gsap';
import { getLenis } from '@/components/motion/SmoothScroll';
import { useReveal } from '@/components/motion/useReveal';

export default function Footer() {
    const root = useRef<HTMLElement>(null);
    useReveal(root);

    useGSAP(
        () => {
            if (prefersReducedMotion()) return;
            gsap.from('.ft-word span', {
                yPercent: 100,
                ease: 'none',
                stagger: 0.04,
                scrollTrigger: { trigger: '.ft-word', start: 'top bottom', end: 'bottom bottom', scrub: 0.8 },
            });
        },
        { scope: root },
    );

    const toTop = () => {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer ref={root} className="ft">
            <div className="ft-grid">
                <div className="ft-cell ft-brand">
                    <p className="ft-claim" data-split>
                        Remolques y plataformas de alta resistencia, con diseño e ingeniería 100% mexicana.
                    </p>
                </div>
                <div className="ft-cell">
                    <p className="mono ft-label">Sitio</p>
                    <ul>
                        <li><Link href="/">Inicio</Link></li>
                        <li><Link href="/catalogo">Catálogo</Link></li>
                        <li><Link href="/#contacto">Cotizar</Link></li>
                    </ul>
                </div>
                <div className="ft-cell">
                    <p className="mono ft-label">Productos</p>
                    <ul>
                        {catalogProducts.map((product) => (
                            <li key={product.slug}>
                                <Link href={`/catalogo?modelo=${product.slug}`}>
                                    {product.line} {product.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="ft-cell">
                    <p className="mono ft-label">Planta</p>
                    <ul>
                        <li><a href={contact.phoneHref}>{contact.phoneDisplay}</a></li>
                        {contact.addressLines.map((line) => (
                            <li key={line}>{line}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <p className="ft-word" aria-hidden="true">
                {'CHIEF'.split('').map((letter, index) => (
                    <span key={index}>{letter}</span>
                ))}
            </p>

            <div className="ft-bottom">
                <span className="mono">© {new Date().getFullYear()} Chief Trailers del Norte</span>
                <span className="mono">Cadereyta Jiménez, N.L. · México</span>
                <button type="button" className="ft-top mono" onClick={toTop}>
                    Volver arriba ↑
                </button>
            </div>
        </footer>
    );
}
