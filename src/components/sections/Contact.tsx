'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <section id="contacto" className="ct-section ct-contact">
            <div className="ct-shell ct-contact-grid">
                <motion.div
                    className="ct-contact-copy"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="ct-kicker ct-kicker-light">Hablemos de tu operación</p>
                    <h2>
                        En Chief,
                        <br />
                        <span>la calidad</span> es primero.
                    </h2>
                    <p>
                        Cuéntanos qué necesitas y nuestro equipo te ayudará a encontrar la configuración adecuada.
                    </p>

                    <div className="ct-contact-details">
                        <a href="tel:+528116365258">
                            <small>Teléfono</small>
                            81 1636 5258
                        </a>
                        <div>
                            <small>Planta</small>
                            Carretera Monterrey–Reynosa Km. 40.5
                            <br />
                            Ejido La Fragua, Cadereyta Jiménez, N.L.
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="ct-contact-form-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <p className="ct-form-kicker">Solicita información</p>
                    <form onSubmit={handleSubmit} className="ct-form">
                        <label>
                            <span>Nombre</span>
                            <input type="text" name="name" required placeholder="Tu nombre" />
                        </label>
                        <label>
                            <span>Teléfono</span>
                            <input type="tel" name="phone" required placeholder="81 0000 0000" />
                        </label>
                        <label>
                            <span>Correo electrónico</span>
                            <input type="email" name="email" placeholder="tu@empresa.com" />
                        </label>
                        <label>
                            <span>¿Qué remolque necesitas?</span>
                            <textarea name="message" rows={4} placeholder="Cuéntanos sobre tu operación" />
                        </label>
                        {isSubmitted && (
                            <p className="ct-form-success" role="status">
                                Gracias. Tu solicitud quedó lista para conectarse al CRM.
                            </p>
                        )}
                        <button type="submit" className="ct-button ct-button-primary">
                            Enviar solicitud <span aria-hidden="true">→</span>
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
