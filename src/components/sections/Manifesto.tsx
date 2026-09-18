'use client';

import { useRef } from 'react';
import { gsap, prefersReducedMotion, useGSAP } from '@/components/motion/gsap';
import { useReveal } from '@/components/motion/useReveal';

const words = ['Diseño', 'e ingeniería', '100% mexicana.'];

export default function Manifesto() {
    const root = useRef<HTMLElement>(null);
    useReveal(root);

    useGSAP(
        () => {
            if (prefersReducedMotion()) return;
            gsap.utils.toArray<HTMLElement>('.mf-word-inner').forEach((word, index) => {
                gsap.from(word, {
                    yPercent: 115,
                    ease: 'expo.out',
                    duration: 1.4,
                    delay: index * 0.12,
                    scrollTrigger: { trigger: root.current, start: 'top 65%' },
                });
            });
        },
        { scope: root },
    );

    return (
        <section ref={root} className="mf" aria-label="Diseño e ingeniería 100% mexicana">
            <span className="rule" data-line="x" />
            <div className="mf-grid">
                {words.map((word, index) => (
                    <div className={`mf-col mf-col-${index + 1}`} key={word}>
                        {index > 0 && <span className="mf-line" data-line="y" />}
                        <p className="mf-word">
                            <span className="mf-word-inner">{word}</span>
                        </p>
                    </div>
                ))}
            </div>
            <div className="shell mf-foot">
                <p className="mono">Chief Trailers del Norte</p>
                <p className="mf-slogan" data-split>
                    En Chief Trailers del Norte, la calidad es primero.
                </p>
            </div>
        </section>
    );
}
