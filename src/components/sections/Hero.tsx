'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowIcon } from '@/components/ui/icons';
import Photo from '@/components/ui/Photo';
import { EASE, gsap, onIntroDone, prefersReducedMotion, SplitText, useGSAP } from '@/components/motion/gsap';

/**
 * Video de fondo del hero (generado con `npm run optimize:video` desde assets-src/video).
 * Con `null` se muestra HERO_PHOTO en su lugar.
 */
const HERO_VIDEO: { src1080: string; src720: string; poster: string } | null = {
    src1080: '/media/hero-1080.mp4',
    src720: '/media/hero-720.mp4',
    poster: '/media/hero-poster.jpg',
};
const HERO_PHOTO = 'chief-plataforma-extendible' as const;
/** Tarjeta de producto junto al titular. Oculta por ahora; se retomará después. */
const SHOW_HERO_CARD = false;

export default function Hero() {
    const root = useRef<HTMLElement>(null);
    const video = useRef<HTMLVideoElement>(null);

    // Reproduce solo mientras el hero está en pantalla; con "reducir movimiento" queda el póster.
    useEffect(() => {
        const node = video.current;
        if (!node) return;
        if (prefersReducedMotion()) {
            node.removeAttribute('autoplay');
            node.pause();
            return;
        }
        let inView = true;
        const sync = () => {
            if (inView && document.visibilityState === 'visible') node.play().catch(() => {});
            else node.pause();
        };
        const observer = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            sync();
        });
        observer.observe(node);
        // Al volver a la pestaña el navegador puede dejarlo en pausa: se reanuda si el hero está a la vista.
        document.addEventListener('visibilitychange', sync);
        return () => {
            observer.disconnect();
            document.removeEventListener('visibilitychange', sync);
        };
    }, []);

    useGSAP(
        () => {
            if (prefersReducedMotion()) return;

            // Parallax del fondo mientras el hero sale de pantalla.
            gsap.to('.hr-media', {
                yPercent: 18,
                ease: 'none',
                scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
            });

            const split = SplitText.create('.hr-title', { type: 'lines', mask: 'lines', linesClass: 'split-line' });
            const tl = gsap.timeline({ paused: true, defaults: { ease: EASE } });
            tl.from('.hr-media img, .hr-media video', { scale: 1.25, duration: 2.2 }, 0)
                .from(split.lines, { yPercent: 110, duration: 1.4, stagger: 0.1 }, 0.15)
                .from('.hr-grid-line', { scaleY: 0, transformOrigin: 'top', duration: 1.6, ease: 'expo.inOut', stagger: 0.08 }, 0)
                .from('.hr-foot-line', { scaleX: 0, transformOrigin: 'left', duration: 1.6, ease: 'expo.inOut' }, 0.2)
                .from('.hr-lead', { y: 30, autoAlpha: 0, duration: 1 }, 0.6)
                .from('.hr-scroll', { autoAlpha: 0, duration: 0.8 }, 1);
            if (SHOW_HERO_CARD) {
                tl.from('.hr-card', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' }, 0.5)
                    .from('.hr-card img', { scale: 1.3, xPercent: 12, duration: 1.8 }, 0.6);
            }

            const off = onIntroDone(() => tl.play());
            return () => {
                off();
                split.revert();
            };
        },
        { scope: root },
    );

    return (
        <section ref={root} id="inicio" className="hr">
            <div className="hr-media" aria-hidden="true">
                {HERO_VIDEO ? (
                    <video
                        ref={video}
                        muted
                        loop
                        playsInline
                        disablePictureInPicture
                        preload="metadata"
                        poster={HERO_VIDEO.poster}
                    >
                        <source src={HERO_VIDEO.src720} type="video/mp4" media="(max-width: 900px)" />
                        <source src={HERO_VIDEO.src1080} type="video/mp4" />
                    </video>
                ) : (
                    <Photo name={HERO_PHOTO} alt="" priority />
                )}
            </div>

            <div className="hr-grid" aria-hidden="true">
                <span className="hr-grid-line" />
                <span className="hr-grid-line" />
                <span className="hr-grid-line" />
            </div>

            <div className="hr-body">
                <div className="hr-copy">
                    <h1 className="hr-title">
                        Ingeniería <em>mexicana</em>
                        <br />
                        con visión global.
                    </h1>
                    <p className="hr-lead">
                        Fabricantes de remolques y plataformas de alta resistencia, con diseño e ingeniería 100%
                        mexicana. En Chief Trailers del Norte, la calidad es primero.
                    </p>
                </div>

                {SHOW_HERO_CARD && (
                    <aside className="hr-card">
                        <div className="hr-card-media">
                            <Photo
                                name="chief-cama-baja-trasera-taller"
                                position="30% 55%"
                                alt="Cama baja Chief Trailers en la planta"
                                sizes="420px"
                            />
                        </div>
                        <div className="hr-actions">
                            <Link href="/#contacto" className="btn btn-ink">
                                Cotizar
                            </Link>
                            <Link href="/catalogo" className="btn btn-red">
                                Ver catálogo <ArrowIcon />
                            </Link>
                        </div>
                    </aside>
                )}
            </div>

            <span className="hr-foot-line" aria-hidden="true" />
            <a href="#productos" className="hr-scroll">
                Scroll
            </a>
        </section>
    );
}
