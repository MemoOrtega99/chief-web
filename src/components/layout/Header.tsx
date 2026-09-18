'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { contact } from '@/data/catalog';
import { ArrowIcon } from '@/components/ui/icons';
import { gsap, useGSAP } from '@/components/motion/gsap';
import { getLenis } from '@/components/motion/SmoothScroll';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/catalogo', label: 'Catálogo 3D' },
    { href: '/#contacto', label: 'Contacto' },
];

export default function Header() {
    const pathname = usePathname();
    const bar = useRef<HTMLElement>(null);
    const menu = useRef<HTMLDivElement>(null);
    const menuTl = useRef<gsap.core.Timeline | null>(null);
    const [open, setOpen] = useState(false);

    // Se oculta al bajar y reaparece al subir (solo en el inicio; el catálogo lo necesita fijo).
    useEffect(() => {
        if (pathname !== '/') {
            gsap.set(bar.current, { yPercent: 0 });
            return;
        }
        let last = window.scrollY;
        let hidden = false;
        const onScroll = () => {
            const y = window.scrollY;
            const shouldHide = y > last && y > 160;
            if (shouldHide !== hidden) {
                hidden = shouldHide;
                gsap.to(bar.current, { yPercent: hidden ? -100 : 0, duration: 0.6, ease: 'expo.out' });
            }
            last = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [pathname]);

    useGSAP(
        () => {
            menuTl.current = gsap
                .timeline({ paused: true, defaults: { ease: 'expo.inOut' } })
                .set(menu.current, { display: 'grid' })
                .fromTo(menu.current, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9 })
                .from('.mn-line', { scaleX: 0, transformOrigin: 'left center', duration: 1, stagger: 0.06 }, 0.3)
                .from('.mn-link-inner', { yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.07 }, 0.45)
                .from('.mn-aside > *', { autoAlpha: 0, y: 20, duration: 0.6, ease: 'power2.out', stagger: 0.05 }, 0.6);
        },
        { scope: menu },
    );

    useEffect(() => {
        const lenis = getLenis();
        if (open) {
            lenis?.stop();
            menuTl.current?.timeScale(1).play();
        } else {
            lenis?.start();
            menuTl.current?.timeScale(1.6).reverse();
        }
    }, [open]);

    // Anclas dentro de la misma página: cerrar el menú y desplazar con Lenis.
    const goTo = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setOpen(false);
        const [path, hash] = href.split('#');
        if (!hash || (path || '/') !== pathname) return;
        event.preventDefault();
        const lenis = getLenis();
        requestAnimationFrame(() => {
            if (lenis) {
                lenis.start();
                lenis.scrollTo(`#${hash}`, { offset: -64, duration: 1.4 });
            } else {
                document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    };

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <>
            <header ref={bar} className="hd">
                <Link href="/" className="hd-cell hd-logo" aria-label="Chief Trailers del Norte, inicio">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/chief-logo-iso.png" alt="" width={36} height={36} />
                    <span className="hd-word">
                        Chief
                        <small>Trailers del Norte</small>
                    </span>
                </Link>

                <nav className="hd-cell hd-nav" aria-label="Navegación principal">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="hd-link"
                            onClick={(event) => goTo(event, link.href)}
                            aria-current={pathname === link.href ? 'page' : undefined}
                        >
                            <i>{String(index + 1).padStart(2, '0')}</i>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <span className="hd-cell hd-spacer" aria-hidden="true" />

                <a href={contact.phoneHref} className="hd-cell hd-phone">
                    <i>Tel</i> {contact.phoneDisplay}
                </a>

                <Link href="/#contacto" className="hd-cell hd-cta" onClick={(event) => goTo(event, '/#contacto')}>
                    Cotizar <ArrowIcon />
                </Link>

                <button
                    type="button"
                    className="hd-cell hd-menu"
                    onClick={() => setOpen((value) => !value)}
                    aria-expanded={open}
                    aria-controls="mn"
                >
                    <span className="hd-menu-label">{open ? 'Cerrar' : 'Menú'}</span>
                    <span className={`hd-burger ${open ? 'is-open' : ''}`} aria-hidden="true">
                        <span />
                        <span />
                    </span>
                </button>
            </header>

            <div ref={menu} id="mn" className="mn" aria-hidden={!open} inert={!open}>
                <nav className="mn-links" aria-label="Menú">
                    {navLinks.map((link, index) => (
                        <div key={link.href} className="mn-row">
                            <span className="mn-line" />
                            <Link href={link.href} className="mn-link" onClick={(event) => goTo(event, link.href)}>
                                <span className="mn-link-inner">
                                    <i>{String(index + 1).padStart(2, '0')}</i>
                                    {link.label}
                                </span>
                            </Link>
                        </div>
                    ))}
                    <span className="mn-line" />
                </nav>
                <aside className="mn-aside">
                    <p className="tag tag-dark">Planta</p>
                    <p>
                        {contact.addressLines.map((line) => (
                            <span key={line}>{line}</span>
                        ))}
                    </p>
                    <a href={contact.phoneHref} className="mn-phone">
                        {contact.phoneDisplay}
                    </a>
                </aside>
            </div>
        </>
    );
}
