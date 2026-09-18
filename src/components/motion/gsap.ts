'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export const EASE = 'expo.out';

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Se dispara cuando termina el preloader (o de inmediato si no se muestra). */
export function onIntroDone(callback: () => void) {
    if (typeof window === 'undefined') return () => {};
    const w = window as Window & { __chiefIntroDone?: boolean };
    if (w.__chiefIntroDone) {
        callback();
        return () => {};
    }
    window.addEventListener('chief:intro-done', callback, { once: true });
    return () => window.removeEventListener('chief:intro-done', callback);
}

export function markIntroDone() {
    const w = window as Window & { __chiefIntroDone?: boolean };
    if (w.__chiefIntroDone) return;
    w.__chiefIntroDone = true;
    window.dispatchEvent(new Event('chief:intro-done'));
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
