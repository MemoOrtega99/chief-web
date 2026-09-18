'use client';

import { RefObject } from 'react';
import { EASE, gsap, prefersReducedMotion, SplitText, useGSAP } from './gsap';

/**
 * Animaciones declarativas por atributo dentro de `scope`:
 *  data-line="x|y"      línea que se dibuja
 *  data-split           texto que sube línea por línea (con máscara)
 *  data-fade            aparece desde abajo (data-fade="stagger" anima a sus hijos)
 *  data-reveal          imagen que se descubre de abajo hacia arriba
 *  data-parallax="n"    desplazamiento vertical de ±n% con el scroll
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
    useGSAP(
        () => {
            const root = scope.current;
            if (!root || prefersReducedMotion()) return;
            const q = <T extends Element = HTMLElement>(selector: string) =>
                Array.from(root.querySelectorAll<T & HTMLElement>(selector));
            const start = 'top 88%';

            q('[data-line]').forEach((el) => {
                const vertical = el.dataset.line === 'y';
                gsap.from(el, {
                    [vertical ? 'scaleY' : 'scaleX']: 0,
                    transformOrigin: vertical ? 'top center' : 'left center',
                    duration: 1.6,
                    ease: 'expo.inOut',
                    scrollTrigger: { trigger: el, start: 'top 95%' },
                });
            });

            q('[data-split]').forEach((el) => {
                SplitText.create(el, {
                    type: 'lines',
                    mask: 'lines',
                    autoSplit: true,
                    linesClass: 'split-line',
                    onSplit: (self) =>
                        gsap.from(self.lines, {
                            yPercent: 110,
                            duration: 1.3,
                            ease: EASE,
                            stagger: 0.09,
                            delay: Number(el.dataset.delay ?? 0),
                            scrollTrigger: { trigger: el, start },
                        }),
                });
            });

            q('[data-fade]').forEach((el) => {
                const targets = el.dataset.fade === 'stagger' ? Array.from(el.children) : el;
                gsap.from(targets, {
                    y: 40,
                    autoAlpha: 0,
                    duration: 1.1,
                    ease: EASE,
                    stagger: 0.08,
                    delay: Number(el.dataset.delay ?? 0),
                    scrollTrigger: { trigger: el, start },
                });
            });

            q('[data-reveal]').forEach((el) => {
                const media = el.querySelector('img, video, svg');
                const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%' } });
                tl.from(el, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' });
                if (media) tl.from(media, { scale: 1.25, duration: 1.8, ease: EASE }, 0);
            });

            q('[data-parallax]').forEach((el) => {
                const amount = Number(el.dataset.parallax || 10);
                gsap.fromTo(
                    el,
                    { yPercent: -amount },
                    {
                        yPercent: amount,
                        ease: 'none',
                        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
                    },
                );
            });
        },
        { scope },
    );
}
