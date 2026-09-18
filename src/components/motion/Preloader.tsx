'use client';

import { useRef } from 'react';
import { gsap, markIntroDone, prefersReducedMotion, useGSAP } from './gsap';

const SESSION_KEY = 'chief-intro-seen';
const PANELS = 4;

/** Intro de marca: se muestra una vez por sesión y luego libera las animaciones del hero. */
export default function Preloader() {
    const root = useRef<HTMLDivElement>(null);
    const counter = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const el = root.current!;
            let seen = false;
            try {
                seen = sessionStorage.getItem(SESSION_KEY) === '1';
                sessionStorage.setItem(SESSION_KEY, '1');
            } catch {
                // Sin almacenamiento: se muestra la intro normalmente.
            }

            if (seen || prefersReducedMotion()) {
                gsap.set(el, { display: 'none' });
                markIntroDone();
                return;
            }

            const count = { value: 0 };
            const tl = gsap.timeline({
                defaults: { ease: 'expo.inOut' },
                onComplete: () => {
                    gsap.set(el, { display: 'none' });
                },
            });

            tl.from('.pl-edge-top, .pl-edge-bottom', { scaleX: 0, duration: 1.1, stagger: 0.1 })
                .from('.pl-edge-left, .pl-edge-right', { scaleY: 0, duration: 1.1, stagger: 0.1 }, 0.15)
                .to(
                    count,
                    {
                        value: 100,
                        duration: 1.6,
                        ease: 'power2.inOut',
                        onUpdate: () => {
                            if (counter.current) counter.current.textContent = String(Math.round(count.value)).padStart(3, '0');
                        },
                    },
                    0,
                )
                .from('.pl-mark', { yPercent: 110, duration: 1, ease: 'expo.out' }, 0.35)
                .from('.pl-meta', { autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, 0.5)
                .to('.pl-frame, .pl-meta, .pl-mark-wrap', { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, 1.8)
                .add(() => markIntroDone(), 2.05)
                .to('.pl-panel', { yPercent: -100, duration: 1.1, stagger: 0.07 }, 2.05);
        },
        { scope: root },
    );

    return (
        <div ref={root} className="pl" aria-hidden="true">
            <div className="pl-panels">
                {Array.from({ length: PANELS }, (_, i) => (
                    <span className="pl-panel" key={i} />
                ))}
            </div>
            <div className="pl-frame">
                <span className="pl-edge-top" />
                <span className="pl-edge-right" />
                <span className="pl-edge-bottom" />
                <span className="pl-edge-left" />
                <div className="pl-mark-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="pl-mark" src="/chief-logo-iso.png" alt="" width={88} height={88} />
                </div>
            </div>
            <div className="pl-meta">
                <span>Chief Trailers del Norte</span>
                <span ref={counter}>000</span>
            </div>
        </div>
    );
}
