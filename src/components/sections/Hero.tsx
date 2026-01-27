'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

    return (
        <section id="inicio" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src="/trailer-day.png"
                    alt="Remolque Chief"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <motion.div
                style={{ opacity, scale, y }}
                className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-32"
            >
                {/* Main content */}
                <div className="text-center">
                    {/* Small tag */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-sm text-accent tracking-[0.2em] uppercase mb-8 font-medium"
                    >
                        Fabricantes de Remolques
                    </motion.p>

                    {/* Giant title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-giant mb-8 text-white"
                    >
                        Fabrica
                        <br />
                        <span className="text-accent">tu Éxito</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-light"
                    >
                        Fabricamos remolques de alta calidad para impulsar
                        el crecimiento de tu negocio.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/remolques" className="btn-solid">
                            Ver Remolques
                        </Link>
                        <Link href="#servicios" className="btn-minimal">
                            Conocer Más
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-3 text-text-muted"
                >
                    <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
