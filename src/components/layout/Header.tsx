'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { contact } from '@/data/catalog';
import { ArrowIcon } from '@/components/ui/icons';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/catalogo', label: 'Catálogo 3D' },
    { href: '/#contacto', label: 'Contacto' },
];

export default function Header({ solid = false }: { solid?: boolean }) {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (solid) return;
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [solid]);

    const isSolid = solid || scrolled || menuOpen;

    return (
        <header className={`ch-header ${isSolid ? 'is-solid' : ''}`}>
            <div className="ch-shell ch-header-inner">
                <Link href="/" className="ch-brand" aria-label="Chief Trailers del Norte, inicio">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/chief-logo-iso.png" alt="" width={42} height={42} />
                    <span className="ch-brand-word">
                        CHIEF
                        <small>TRAILERS DEL NORTE</small>
                    </span>
                </Link>

                <nav className="ch-nav" aria-label="Navegación principal">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={pathname === link.href ? 'page' : undefined}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="ch-header-actions">
                    <a href={contact.phoneHref} className="ch-header-phone">
                        {contact.phoneDisplay}
                    </a>
                    <Link href="/#contacto" className="ch-btn ch-btn-red">
                        Cotizar <ArrowIcon />
                    </Link>
                </div>

                <button
                    type="button"
                    className="ch-menu-toggle"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={menuOpen}
                    aria-controls="ch-mobile-nav"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {menuOpen && (
                <nav id="ch-mobile-nav" className="ch-mobile-nav" aria-label="Navegación móvil">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                    <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                </nav>
            )}
        </header>
    );
}
