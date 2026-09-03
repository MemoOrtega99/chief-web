import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="ct-footer">
            <div className="ct-shell">
                <div className="ct-footer-grid">
                    <div className="ct-footer-brand">
                        <Link href="/" className="ct-footer-logo" aria-label="Chief Trailers del Norte, inicio">
                            <Image
                                src="/chief-logo-iso.png"
                                alt="Chief Trailers del Norte"
                                width={58}
                                height={58}
                                unoptimized
                            />
                            <span>CHIEF<small>TRAILERS DEL NORTE</small></span>
                        </Link>
                        <p>Ingeniería mexicana para mover lo que importa.</p>
                    </div>

                    <div>
                        <p className="ct-footer-label">Navegación</p>
                        <div className="ct-footer-links">
                            <Link href="/#productos">Productos</Link>
                            <Link href="/#nosotros">Nosotros</Link>
                            <Link href="/#proceso">Proceso</Link>
                            <Link href="/#contacto">Contacto</Link>
                        </div>
                    </div>

                    <div>
                        <p className="ct-footer-label">Contacto</p>
                        <div className="ct-footer-contact">
                            <a href="tel:+528116365258">81 1636 5258</a>
                            <span>Cadereyta Jiménez, N.L.</span>
                        </div>
                    </div>
                </div>

                <div className="ct-footer-bottom">
                    <span>© {new Date().getFullYear()} Chief Trailers del Norte</span>
                    <span>La calidad es primero.</span>
                </div>
            </div>
        </footer>
    );
}
