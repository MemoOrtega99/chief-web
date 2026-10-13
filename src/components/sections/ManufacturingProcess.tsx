const processSteps = [
    'Corte con plasma mecanizado',
    'Oxicorte y doblez',
    'Soldadura',
    'Sandblast',
    'Pintura',
    'Personalización',
    'Logística de entrega',
];

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
                    {processSteps.map((step, index) => (
                        <article className="pf-step" key={step}>
                            <div className="pf-step-top">
                                <span className="pf-step-number">{String(index + 1).padStart(2, '0')}</span>
                                <span className="pf-step-line" aria-hidden="true" />
                            </div>
                            <h3>{step}</h3>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
