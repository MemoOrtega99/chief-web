'use client';

import { useEffect, useRef, useState } from 'react';

type Stat = {
    value: number;
    suffix: string;
    label: string;
};

const stats: Stat[] = [
    { value: 10, suffix: '+', label: 'años de experiencia' },
    { value: 1500, suffix: '+', label: 'remolques fabricados' },
    { value: 50, suffix: '+', label: 'clientes atendidos' },
];

const numberFormat = new Intl.NumberFormat('es-MX');

function CountUp({ value, suffix }: Pick<Stat, 'value' | 'suffix'>) {
    const target = useRef<HTMLSpanElement>(null);
    const started = useRef(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const node = target.current;
        if (!node) return;

        const finish = () => setCount(value);
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let frame = 0;

        const animate = () => {
            if (reducedMotion) {
                finish();
                return;
            }

            const startedAt = performance.now();
            const duration = 1500;
            const tick = (now: number) => {
                const progress = Math.min((now - startedAt) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.round(value * eased));
                if (progress < 1) frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || started.current) return;
                started.current = true;
                animate();
            },
            { threshold: 0.35 },
        );

        observer.observe(node);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [value]);

    return (
        <span ref={target} className="stats-number">
            {numberFormat.format(count)}
            {suffix}
        </span>
    );
}

export default function ExperienceStats() {
    return (
        <section className="stats-band" aria-labelledby="stats-title">
            <div className="stats-intro">
                <h2 id="stats-title">
                    Más de una década moviendo <em>grandes cargas.</em>
                </h2>
            </div>

            <div className="stats-grid">
                {stats.map((stat) => (
                    <div className="stats-cell" key={stat.label}>
                        <CountUp value={stat.value} suffix={stat.suffix} />
                        <span className="stats-label">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
