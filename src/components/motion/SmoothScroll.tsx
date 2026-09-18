'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, ScrollTrigger } from './gsap';

type LenisWindow = Window & { __lenis?: Lenis };

export function getLenis() {
    return typeof window === 'undefined' ? undefined : (window as LenisWindow).__lenis;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const firstRender = useRef(true);

    useEffect(() => {
        if (prefersReducedMotion()) return;
        const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -64 } });
        (window as LenisWindow).__lenis = lenis;
        lenis.on('scroll', ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            delete (window as LenisWindow).__lenis;
        };
    }, []);

    // Al cambiar de página: arriba, o al ancla si la URL trae una.
    useEffect(() => {
        const isFirst = firstRender.current;
        firstRender.current = false;
        const lenis = getLenis();
        const hash = window.location.hash;
        const frame = requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            if (hash && document.querySelector(hash)) {
                if (lenis) lenis.scrollTo(hash, { offset: -64, immediate: true });
                else document.querySelector(hash)?.scrollIntoView();
            } else if (!isFirst) {
                lenis?.scrollTo(0, { immediate: true });
            }
        });
        return () => cancelAnimationFrame(frame);
    }, [pathname]);

    return <>{children}</>;
}
