import Link from 'next/link';
import { ArrowIcon } from '@/components/ui/icons';

/**
 * Video de fondo del hero. Mientras no exista, se muestra el póster.
 * Para activarlo: colocar el archivo en /public/media y poner aquí su ruta (ej. '/media/hero.mp4').
 */
const HERO_VIDEO_SRC: string | null = null;
const HERO_POSTER_SRC = '/media/hero-poster.jpg';

const facts = [
    { title: 'Diseño 3D', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Acero G50 / G100', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Pruebas antes de entregar', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

export default function Hero() {
    return (
        <section id="inicio" className="ch-hero">
            <div className="ch-hero-media" aria-hidden="true">
                {HERO_VIDEO_SRC ? (
                    <video autoPlay muted loop playsInline preload="metadata" poster={HERO_POSTER_SRC}>
                        <source src={HERO_VIDEO_SRC} type="video/mp4" />
                    </video>
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={HERO_POSTER_SRC} alt="" fetchPriority="high" />
                )}
            </div>

            <div className="ch-hero-inner">
                <div className="ch-hero-copy">
                    <p className="ch-label ch-label-light">Fabricantes de remolques · Cadereyta, N.L.</p>
                    <h1 className="ch-display">
                        <span>Ingeniería</span>
                        <span><em>mexicana</em></span>
                        <span>con visión global</span>
                    </h1>
                    <p className="ch-hero-lead">
                        Remolques y plataformas de alta resistencia, diseñados y fabricados en Nuevo León.
                        En Chief Trailers del Norte, la calidad es primero.
                    </p>
                    <div className="ch-hero-actions">
                        <Link href="/#contacto" className="ch-btn ch-btn-red">
                            Cotiza tu remolque <ArrowIcon />
                        </Link>
                        <Link href="/catalogo" className="ch-btn ch-btn-ghost">
                            Ver catálogo 3D
                        </Link>
                    </div>
                </div>

                <div className="ch-hero-facts">
                    {facts.map((fact, index) => (
                        <div className="ch-hero-fact" key={fact.title}>
                            <b>{String(index + 1).padStart(2, '0')}</b>
                            <div>
                                <strong>{fact.title}</strong>
                                <span>{fact.text}</span>
                            </div>
                        </div>
                    ))}
                    <a href="#catalogo" className="ch-hero-scroll">Explorar</a>
                </div>
            </div>
        </section>
    );
}
