'use client';

import { useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { catalogProducts, contact, paintColors } from '@/data/catalog';
import { ArrowIcon, CheckIcon } from '@/components/ui/icons';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const productOptions = [
    ...catalogProducts.map((product) => ({ value: product.slug, label: `${product.line} ${product.name}` })),
    { value: 'proyecto-especial', label: 'Proyecto especial a medida' },
    { value: 'no-se', label: 'Aún no lo sé' },
];

export default function Contact() {
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
        <section id="contacto" className="ch-contact">
            <div className="ch-shell ch-contact-grid">
                <div>
                    <p className="ch-label ch-label-light">Contacto</p>
                    <h2 className="ch-display">
                        Cotiza tu
                        <br />
                        <em>remolque</em>
                    </h2>
                    <p className="ch-contact-intro">
                        Cuéntanos qué mueves y cómo opera tu flota. Nuestro equipo de ingeniería te ayuda a
                        definir la configuración adecuada y te envía una cotización personalizada.
                    </p>

                    <dl className="ch-contact-list">
                        <div>
                            <dt>Teléfono</dt>
                            <dd>
                                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                            </dd>
                        </div>
                        <div>
                            <dt>Planta</dt>
                            <dd>
                                {contact.addressLines.map((line) => (
                                    <span key={line} style={{ display: 'block' }}>
                                        {line}
                                    </span>
                                ))}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="ch-form" aria-live="polite">
                    {status === 'sent' ? (
                        <div className="ch-form-done">
                            <span className="ch-form-done-mark">
                                <CheckIcon />
                            </span>
                            <h3>Solicitud recibida</h3>
                            <p>
                                Gracias. Un asesor de Chief Trailers se comunicará contigo para dar seguimiento a tu
                                cotización.
                            </p>
                            <button type="button" className="ch-link-btn" onClick={() => setStatus('idle')}>
                                Enviar otra solicitud
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="ch-form-head">
                                <h3>Solicitud de cotización</h3>
                                <span>
                                    <i style={{ color: 'var(--ch-red)', fontStyle: 'normal' }}>*</i> Obligatorio
                                </span>
                            </div>

                            <div className="ch-form-grid">
                                <label className="ch-input">
                                    <span>
                                        Nombre <i>*</i>
                                    </span>
                                    <input type="text" name="nombre" required autoComplete="name" />
                                </label>
                                <label className="ch-input">
                                    <span>
                                        Teléfono / WhatsApp <i>*</i>
                                    </span>
                                    <input type="tel" name="telefono" required autoComplete="tel" inputMode="tel" />
                                </label>
                                <label className="ch-input">
                                    <span>Empresa</span>
                                    <input type="text" name="empresa" autoComplete="organization" />
                                </label>
                                <label className="ch-input">
                                    <span>Correo electrónico</span>
                                    <input type="email" name="correo" autoComplete="email" />
                                </label>
                                <label className="ch-input ch-input-wide">
                                    <span>Remolque de interés</span>
                                    <select
                                        name="remolque"
                                        value={product}
                                        onChange={(event) => setProduct(event.target.value)}
                                    >
                                        <option value="">Selecciona una opción</option>
                                        {productOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className="ch-input ch-input-wide">
                                    <span>Mensaje</span>
                                    <textarea
                                        name="mensaje"
                                        rows={4}
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                        placeholder="Unidades, tipo de carga, rutas, fecha estimada…"
                                    />
                                </label>
                                {status === 'error' && (
                                    <p className="ch-form-error" role="alert">
                                        No pudimos enviar tu solicitud. Intenta de nuevo o llámanos al{' '}
                                        {contact.phoneDisplay}.
                                    </p>
                                )}
                            </div>

                            <div className="ch-form-foot">
                                <p>Tus datos se usan únicamente para dar seguimiento a tu cotización.</p>
                                <button type="submit" className="ch-btn ch-btn-dark" disabled={status === 'sending'}>
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
