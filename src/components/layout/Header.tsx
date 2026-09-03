'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '/#productos', label: 'Productos' },
        { href: '/#nosotros', label: 'Nosotros' },
        { href: '/#proceso', label: 'Proceso' },
        { href: '/#contacto', label: 'Contacto' },
    ];

    return (
        <header className="ct-header">
            <nav className="ct-nav" aria-label="Navegación principal">
                <div className="ct-nav-inner">
                    <Link href="/" className="ct-brand" aria-label="Chief Trailers del Norte, inicio">
                        <Image
                            src="/chief-logo-iso.png"
                            alt="Chief Logo"
                            width={44}
                            height={44}
                            className="ct-brand-mark"
                            unoptimized
                            priority
                        />
                        <span className="ct-brand-copy">
                            CHIEF
                            <small>TRAILERS DEL NORTE</small>
                        </span>
                    </Link>

                    <div className="ct-desktop-nav">
                        <div className="ct-nav-links">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="ct-nav-link"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="ct-desktop-cta">
                        <Link
                            href="/#contacto"
                            className="ct-nav-cta"
                        >
                            Cotizar
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="ct-menu-button"
                        aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="ct-mobile-menu">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="ct-mobile-link"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/#contacto"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="ct-mobile-cta"
                        >
                            Cotizar tu remolque
                        </Link>
                    </div>
                )}
            </nav >
        </header >
    );
}
