'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { catalogProducts, paintColors } from '@/data/catalog';
import { ArrowIcon } from '@/components/ui/icons';
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '@/components/motion/gsap';

const TrailerViewer = dynamic(() => import('@/components/3d/TrailerViewer'), { ssr: false });

const featured = catalogProducts.find((product) => product.model)!;

const steps = [
    { title: 'Gira el modelo', text: 'Recorre cada ángulo del remolque, como si estuvieras en el patio.', color: '#E31E24' },
    { title: 'Elige el color', text: 'Aplica el color de tu flota al chasis y compara acabados.', color: '#1F4E9C' },
    { title: 'Solicita tu cotización', text: 'Envía tu configuración y nuestro equipo te contacta.', color: '#EDEDEA' },
];

const colorName = (value: string) => paintColors.find((color) => color.value === value)?.name ?? value;

export default function Showcase3D() {
    const root = useRef<HTMLElement>(null);
    const orbit = useRef(0);
    const [step, setStep] = useState(0);
    const [mounted, setMounted] = useState(false);

    useGSAP(
        () => {
            // Monta el visor antes de que la sección entre en pantalla.
            ScrollTrigger.create({
                trigger: root.current,
                start: 'top bottom+=60%',
                once: true,
                onEnter: () => setMounted(true),
            });

            if (prefersReducedMotion()) return;

            const tl = gsap.timeline({
                defaults: { ease: 'none' },
                scrollTrigger: {
                    trigger: root.current,
                    start: 'top top',
                    end: '+=260%',
                    pin: '.sc-pin',
                    scrub: 0.6,
                    onUpdate: (self) => {
                        orbit.current = -0.35 + self.progress * Math.PI * 1.7;
                        setStep(Math.min(steps.length - 1, Math.floor(self.progress * steps.length)));
                    },
                },
            });
            tl.fromTo('.sc-progress-bar', { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);

            gsap.from('.sc-frame-line', {
                scale: 0,
                duration: 1.4,
                ease: 'expo.inOut',
                stagger: 0.05,
                scrollTrigger: { trigger: root.current, start: 'top 70%' },
            });
        },
        { scope: root },
    );

    const current = steps[step];

    return (
        <section ref={root} className="sc" aria-label="Configurador 3D">
            <div className="sc-pin">
                <div className="sc-top">
                    <p className="tag tag-light">Configurador 3D</p>
                    <p className="sc-code mono">
                        {featured.code} · {featured.line} {featured.name}
                    </p>
                    <p className="sc-count mono">
                        <span>{String(step + 1).padStart(2, '0')}</span> / {String(steps.length).padStart(2, '0')}
                    </p>
                </div>

                <div className="sc-stage">
                    <span className="sc-frame-line sc-frame-top" />
                    <span className="sc-frame-line sc-frame-bottom" />
                    <span className="sc-frame-line sc-frame-left" />
                    <span className="sc-frame-line sc-frame-right" />
                    <span className="sc-cross sc-cross-tl" />
                    <span className="sc-cross sc-cross-tr" />
                    <span className="sc-cross sc-cross-bl" />
                    <span className="sc-cross sc-cross-br" />
                    {mounted && (
                        <TrailerViewer
                            modelPath={featured.model!.path}
                            color={current.color}
                            orbitRef={orbit}
                            frameMargin={0.96}
                            interactive={false}
                        />
                    )}
                </div>

                <ol className="sc-steps">
                    {steps.map((item, index) => (
                        <li key={item.title} className={index === step ? 'is-active' : ''}>
                            <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                            <div>
                                <strong>{item.title}</strong>
                                <p>{item.text}</p>
                            </div>
                        </li>
                    ))}
                </ol>

                <div className="sc-side">
                    <div className="sc-color">
                        <span className="mono">Color</span>
                        <span className="sc-color-chip" style={{ backgroundColor: current.color }} />
                        <strong>{colorName(current.color)}</strong>
                    </div>
                    <Link href="/catalogo" className="btn btn-red">
                        Abrir catálogo 3D <ArrowIcon />
                    </Link>
                </div>

                <div className="sc-progress" aria-hidden="true">
                    <span className="sc-progress-bar" />
                </div>
            </div>
        </section>
    );
}
