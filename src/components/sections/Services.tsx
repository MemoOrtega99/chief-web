'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { processSteps } from '@/data/catalog';

export default function Services() {
    return (
        <section id="proceso" className="ct-section ct-process">
            <div className="ct-shell">
                <div className="ct-process-heading">
                    <div>
                        <p className="ct-kicker">De la materia prima a la entrega</p>
                        <h2>
                            Nuestro <span>proceso</span>
                        </h2>
                    </div>
                    <p>Desliza para conocer las siete etapas que convierten el acero en una unidad lista para trabajar.</p>
                </div>

                <div className="ct-process-track" aria-label="Etapas del proceso de fabricación">
                    {processSteps.map((step, index) => (
                        <motion.article
                            key={step.number}
                            className="ct-process-card"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.45, delay: index * 0.04 }}
                        >
                            <div className="ct-process-photo">
                                <Image
                                    src={step.image}
                                    alt=""
                                    fill
                                    sizes="260px"
                                    className="ct-cover-image"
                                />
                                <span className="ct-process-number">{step.number}</span>
                            </div>
                            <div className="ct-process-body">
                                <p>{step.tag}</p>
                                <h3>{step.title}</h3>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
