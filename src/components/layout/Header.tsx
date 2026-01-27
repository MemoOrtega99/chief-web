'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '/#servicios', label: 'Servicios' },
        { href: '/remolques', label: 'Remolques' },
        { href: '/#nosotros', label: 'Nosotros' },
        { href: '/#contacto', label: 'Contacto' },
    ];

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-[95%] max-w-6xl">
            {/* Navbar estandar con fondo solido */}
            <nav
                className="bg-white rounded-2xl shadow-lg border border-border px-4 lg:px-6 overflow-visible"
            >
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/chief-logo-iso.png"
                            alt="Chief Logo"
                            width={48}
                            height={48}
                            className="h-10 w-10 object-contain"
                            unoptimized
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation - Fondo rojo ultra sutil (5%) y blureado */}
                    <div className="hidden md:flex items-center bg-[#dc2626]/5 backdrop-blur-md rounded-2xl p-1 border border-[#dc2626]/10">
                        <div className="flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-bold px-4 py-2 rounded-xl transition-all duration-300 text-[#dc2626] hover:bg-[#dc2626] hover:text-[#fee2e2]"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="hidden md:block">
                        <Link
                            href="/#contacto"
                            className="bg-black text-white px-5 py-2 rounded-2xl text-sm font-medium hover:bg-surface hover:text-black border border-transparent hover:border-border transition-all shadow-md shadow-black/10"
                        >
                            Cotizar
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-black"
                    >
                        <div className="w-6 flex flex-col gap-1.5">
                            <span className="h-px bg-current" />
                            <span className="h-px bg-current" />
                            <span className="h-px bg-current" />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                {
                    isMobileMenuOpen && (
                        <div className="md:hidden py-8 border-t border-border bg-white/95 backdrop-blur-xl rounded-b-3xl px-6">
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl font-bold text-[#dc2626]"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
                }
            </nav >
        </header >
    );
}
