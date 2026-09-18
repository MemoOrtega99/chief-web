import Link from 'next/link';
import { catalogProducts, contact } from '@/data/catalog';

export default function Footer() {
    return (
        <footer className="ch-footer">
            <div className="ch-shell ch-footer-top">
                <div>
                    <Link href="/" className="ch-brand" aria-label="Chief Trailers del Norte, inicio">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/chief-logo-iso.png" alt="" width={42} height={42} />
                        <span className="ch-brand-word">
                            CHIEF
                            <small>TRAILERS DEL NORTE</small>
                        </span>
                    </Link>
                    <p className="ch-footer-tagline">
                        Fabricantes de remolques y plataformas de alta resistencia, con diseño e ingeniería 100%
                        mexicana.
                    </p>
                </div>

                <div>
                    <h4>Sitio</h4>
                    <ul>
                        <li><Link href="/">Inicio</Link></li>
                        <li><Link href="/catalogo">Catálogo 3D</Link></li>
                        <li><Link href="/#contacto">Cotizar</Link></li>
                    </ul>
                </div>

                <div>
                    <h4>Productos</h4>
                    <ul>
                        {catalogProducts.slice(0, 5).map((product) => (
                            <li key={product.slug}>
                                <Link href={`/catalogo?modelo=${product.slug}`}>
                                    {product.line} {product.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4>Planta</h4>
                    <ul>
                        <li><a href={contact.phoneHref}>{contact.phoneDisplay}</a></li>
                        {contact.addressLines.map((line) => (
                            <li key={line}>{line}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="ch-footer-word" aria-hidden="true">
                <div className="ch-shell">
                    <p>La calidad <em>es primero</em></p>
                </div>
            </div>

            <div className="ch-shell ch-footer-bottom">
                <span>© {new Date().getFullYear()} Chief Trailers del Norte. Todos los derechos reservados.</span>
                <span>Cadereyta Jiménez, Nuevo León, México</span>
            </div>
        </footer>
    );
}
