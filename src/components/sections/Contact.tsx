'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section id="contacto" className="section-padding bg-surface relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left - Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-sm text-text-muted tracking-[0.2em] uppercase mb-4">
                            Contacto
                        </p>
                        <h2 className="text-huge mb-12">
                            Hablemos
                        </h2>

                        <div className="space-y-8">
                            <div>
                                <p className="text-sm text-text-muted mb-2">Teléfono</p>
                                <a href="tel:+528001234567" className="text-xl hover:opacity-60 transition-opacity">
                                    +52 (800) 123-4567
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-text-muted mb-2">Email</p>
                                <a href="mailto:info@chieflogs.mx" className="text-xl hover:opacity-60 transition-opacity">
                                    info@chieflogs.mx
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-text-muted mb-2">Ubicación</p>
                                <p className="text-xl">Monterrey, N.L., México</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Nombre"
                                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none transition-colors placeholder:text-text-light"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Email"
                                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none transition-colors placeholder:text-text-light"
                                />
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Teléfono (opcional)"
                                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none transition-colors placeholder:text-text-light"
                                />
                            </div>
                            <div>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="¿Cómo podemos ayudarte?"
                                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none transition-colors resize-none placeholder:text-text-light"
                                />
                            </div>

                            {isSubmitted && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-foreground"
                                >
                                    ✓ Mensaje enviado. Te contactaremos pronto.
                                </motion.p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-solid w-full justify-center mt-8"
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
