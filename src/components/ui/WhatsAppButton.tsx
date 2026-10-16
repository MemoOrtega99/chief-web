'use client';

import Link from 'next/link';
import { type AnimationEvent, useEffect, useState } from 'react';
import { ArrowIcon } from './icons';

type LaunchPhase = 'waiting' | 'entering' | 'settled';

const WHATSAPP_HREF = `https://wa.me/528116365258?text=${encodeURIComponent(
    'Hola, me gustaría recibir información sobre sus remolques.',
)}`;

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.52 3.48A11.78 11.78 0 0 0 12.08 0C5.56 0 .26 5.3.26 11.82c0 2.08.54 4.1 1.57 5.88L.16 24l6.44-1.69a11.8 11.8 0 0 0 5.48 1.35h.01c6.52 0 11.82-5.3 11.82-11.82 0-3.16-1.23-6.13-3.39-8.36zM12.09 21.7h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.22-3.82 1 1.02-3.72-.24-.38a9.8 9.8 0 0 1-1.5-5.2C2.18 6.4 6.62 1.96 12.08 1.96c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 7c0 5.46-4.44 9.9-9.88 9.9z" />
            <path d="M17.67 14.33c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.2-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
        </svg>
    );
}

function MobileContactBar() {
    return (
        <div className="mobile-contact-bar" aria-label="Opciones de contacto">
            <a
                className="mobile-contact-bar__link mobile-contact-bar__whatsapp"
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer"
                aria-label="Contactar a Chief Trailers del Norte por WhatsApp"
            >
                <WhatsAppIcon className="mobile-contact-bar__icon" />
                <span>WhatsApp</span>
            </a>
            <Link className="mobile-contact-bar__link mobile-contact-bar__quote" href="/#contacto">
                <span>Cotizar</span>
                <ArrowIcon />
            </Link>
        </div>
    );
}

export default function WhatsAppButton() {
    const [phase, setPhase] = useState<LaunchPhase>('waiting');

    useEffect(() => {
        const timer = window.setTimeout(() => setPhase('entering'), 3000);
        return () => window.clearTimeout(timer);
    }, []);

    const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
        if (event.animationName === 'wa-wheel-translation') setPhase('settled');
    };

    return (
        <div className={`whatsapp-launcher whatsapp-launcher--${phase}`}>
            <MobileContactBar />

            <div className="wa-arrival" onAnimationEnd={handleAnimationEnd}>
                <div className="wa-wheel-spin">
                    <div className="wa-entrance-sparks" aria-hidden="true">
                        {Array.from({ length: 7 }, (_, index) => (
                            <span className="wa-spark" key={index} />
                        ))}
                    </div>
                    <a
                        className="wa-action"
                        href={WHATSAPP_HREF}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Contactar a Chief Trailers del Norte por WhatsApp"
                    >
                        <WhatsAppIcon className="wa-icon" />
                        <span className="wa-tooltip" aria-hidden="true">
                            Cotiza por WhatsApp
                        </span>
                    </a>
                </div>
                <div className="wa-smoke" aria-hidden="true">
                    <span className="wa-smoke-puff" />
                    <span className="wa-smoke-puff" />
                    <span className="wa-smoke-puff" />
                </div>
            </div>
        </div>
    );
}
