import Image from 'next/image';
import { processSteps } from '@/data/catalog';

export default function ManufacturingProcess() {
    return (
        <section id="proceso" className="pf-section" aria-labelledby="process-title">
            <div className="pf-shell">
                <div className="pf-heading">
                    <div>
                        <p className="tag tag-light pf-kicker">02 / Fabricación</p>
                        <h2 id="process-title" className="display pf-title">
                            Proceso de <em>fabricación</em>
                        </h2>
                    </div>
                    <p className="pf-lead">
                        Del corte de la materia prima a la entrega, cada unidad avanza por una ruta de fabricación
                        definida.
                    </p>
                </div>

                <div className="pf-steps">
                    {processSteps.map((step) => (
                        <article className="pf-step" key={step.number}>
                            <div className="pf-step-media">
                                <Image
                                    src={step.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 720px) 50vw, (max-width: 1100px) 25vw, 14vw"
                                />
                                <span className="pf-step-number">{step.number}</span>
                            </div>
                            <div className="pf-step-top">
                                <span className="pf-step-line" aria-hidden="true" />
                            </div>
                            <h3>{step.title}</h3>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
