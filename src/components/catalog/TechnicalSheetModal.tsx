'use client';

import { FormEvent, useEffect, useState } from 'react';
import type { CatalogProduct } from '@/data/catalog';
import styles from './TechnicalSheetModal.module.css';

type TechnicalSheetModalProps = {
    product: CatalogProduct;
    open: boolean;
    onClose: () => void;
};

export default function TechnicalSheetModal({ product, open, onClose }: TechnicalSheetModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, open]);

    if (!open) return null;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const downloadLink = document.createElement('a');
        downloadLink.href = `/fichas/${product.slug}.pdf`;
        downloadLink.download = `ficha-tecnica-${product.slug}.pdf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        onClose();
    };

    return (
        <div className={styles.backdrop} onMouseDown={onClose}>
            <div
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby="technical-sheet-title"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className={styles.header}>
                    <p className={styles.eyebrow}>
                        <span aria-hidden="true" /> Ficha técnica
                    </p>
                    <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar ventana">
                        ×
                    </button>
                </div>

                <div className={styles.content}>
                    <h2 id="technical-sheet-title">Descarga la ficha técnica</h2>
                    <p className={styles.description}>
                        Déjanos tus datos para descargar la información de{' '}
                        <strong>{product.name}</strong>.
                    </p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label className={styles.field}>
                            <span>Nombre</span>
                            <input
                                autoFocus
                                type="text"
                                name="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Tu nombre"
                                autoComplete="name"
                                required
                            />
                        </label>
                        <label className={styles.field}>
                            <span>Correo electrónico</span>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="tu@empresa.com"
                                autoComplete="email"
                                required
                            />
                        </label>
                        <button type="submit" className={styles.submit}>
                            Descargar ficha técnica
                            <span aria-hidden="true">→</span>
                        </button>
                    </form>

                    <p className={styles.privacy}>Tus datos se usan únicamente para dar seguimiento a tu solicitud.</p>
                </div>
            </div>
        </div>
    );
}
