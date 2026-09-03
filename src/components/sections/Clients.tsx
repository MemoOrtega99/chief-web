'use client';

import { motion } from 'framer-motion';
import { clientNames } from '@/data/catalog';

export default function Clients() {
    return (
        <section className="ct-section ct-clients">
            <div className="ct-shell">
                <motion.div
                    className="ct-clients-heading"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="ct-kicker">Confianza</p>
                    <h2>
                        Empresas que <span>confían</span> en nosotros
                    </h2>
                </motion.div>

                <div className="ct-client-grid">
                    {clientNames.map((client, index) => (
                        <motion.div
                            key={client}
                            className="ct-client-cell"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.35, delay: index * 0.025 }}
                        >
                            <span>{client}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
