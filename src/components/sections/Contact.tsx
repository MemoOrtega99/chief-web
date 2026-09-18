'use client';

import { useSearchParams } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import { catalogProducts, contact, paintColors } from '@/data/catalog';
import { ArrowIcon, CheckIcon } from '@/components/ui/icons';
import { useReveal } from '@/components/motion/useReveal';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const productOptions = [
    ...catalogProducts.map((product) => ({ value: product.slug, label: `${product.line} ${product.name}` })),
    { value: 'proyecto-especial', label: 'Proyecto especial a medida' },
    { value: 'no-se', label: 'Aún no lo sé' },
];

export default function Contact() {
    const root = useRef<HTMLElement>(null);
    useReveal(root);

    const [status, setStatus] = useState<Status>('idle');
    // Precarga la configuración elegida en el catálogo 3D (/?modelo=...&color=...#contacto).
    const searchParams = useSearchParams();
    const [product, setProduct] = useState(() => {
        const slug = searchParams.get('modelo');
        return productOptions.some((option) => option.value === slug) ? slug! : '';
    });
    const [message, setMessage] = useState(() => {
        const color = searchParams.get('color');
        if (!color) return '';
        const name = paintColors.find((option) => option.value.toLowerCase() === color.toLowerCase())?.name;
        return `Me interesa esta configuración en color ${name ?? color.toUpperCase()}.`;
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('sending');
        const data = Object.fromEntries(new FormData(event.currentTarget));
        try {
            const response = await fetch('/api/contacto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setStatus(response.ok ? 'sent' : 'error');
        } catch {
            setStatus('error');
        }
    };

    return (
        <section ref={root} id="contacto" className="ct">
            <span className="rule" data-line="x" />
            <div className="ct-grid">
                <div className="ct-info">
                    <p className="tag" data-fade>
                        Contacto
                    </p>
                    <h2 className="display" data-split>
                        Hablemos de <em>tu operación.</em>
                    </h2>
                    <p className="ct-intro" data-fade>
                        Cuéntanos qué necesitas y te enviamos una cotización personalizada para tu remolque.
                    </p>

                    <dl className="ct-list" data-fade="stagger">
                        <div>
                            <dt className="mono">Teléfono</dt>
                            <dd>
                                <a href={contact.phoneHref} className="ct-phone">
                                    {contact.phoneDisplay}
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="mono">Planta</dt>
                            <dd>
                                {contact.addressLines.map((line) => (
                                    <span key={line}>{line}</span>
                                ))}
                            </dd>
                        </div>
                    </dl>
                </div>

                <span className="ct-divider" data-line="y" aria-hidden="true" />

                <div className="ct-form-wrap" aria-live="polite">
                    {status === 'sent' ? (
                        <div className="ct-done">
                            <span className="ct-done-mark">
                                <CheckIcon />
                            </span>
                            <h3>Solicitud recibida.</h3>
                            <p>Gracias. Un asesor de Chief Trailers se comunicará contigo para dar seguimiento.</p>
                            <button type="button" className="link-btn" onClick={() => setStatus('idle')}>
                                Enviar otra solicitud
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="ct-form" data-fade>
                            <div className="ct-form-head">
                                <span className="mono">Solicitud de cotización</span>
                                <span className="mono">* Obligatorio</span>
                            </div>

                            <label className="field">
                                <input type="text" name="nombre" required autoComplete="name" placeholder=" " />
                                <span>Nombre *</span>
                            </label>
                            <label className="field">
                                <input type="tel" name="telefono" required autoComplete="tel" inputMode="tel" placeholder=" " />
                                <span>Teléfono / WhatsApp *</span>
                            </label>
                            <label className="field">
                                <input type="text" name="empresa" autoComplete="organization" placeholder=" " />
                                <span>Empresa</span>
                            </label>
                            <label className="field">
                                <input type="email" name="correo" autoComplete="email" placeholder=" " />
                                <span>Correo electrónico</span>
                            </label>
                            <label className="field field-wide field-select">
                                <select name="remolque" value={product} onChange={(event) => setProduct(event.target.value)}>
                                    <option value="">Selecciona una opción</option>
                                    {productOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <span>Remolque de interés</span>
                            </label>
                            <label className="field field-wide">
                                <textarea
                                    name="mensaje"
                                    rows={3}
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    placeholder=" "
                                />
                                <span>Mensaje</span>
                            </label>

                            {status === 'error' && (
                                <p className="ct-error" role="alert">
                                    No pudimos enviar tu solicitud. Intenta de nuevo o llámanos al {contact.phoneDisplay}.
                                </p>
                            )}

                            <div className="ct-submit">
                                <p>Tus datos se usan únicamente para dar seguimiento a tu cotización.</p>
                                <button type="submit" className="btn btn-red btn-lg" disabled={status === 'sending'}>
                                    {status === 'sending' ? 'Enviando…' : 'Enviar solicitud'} <ArrowIcon />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
