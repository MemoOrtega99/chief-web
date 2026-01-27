import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-16 bg-foreground text-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Logo and tagline */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center mb-4">
                            <Image
                                src="/chief-logo-iso.png"
                                alt="Chief Logo"
                                width={48}
                                height={48}
                                className="h-12 w-12 object-contain"
                                unoptimized
                            />
                        </Link>
                        <p className="text-background/60 max-w-sm">
                            Fabricación de remolques de alta calidad. Impulsando negocios en México desde 2004.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase text-background/40 mb-4">Navegación</h4>
                        <nav className="flex flex-col gap-3">
                            {['Servicios', 'Remolques', 'Nosotros', 'Contacto'].map((item) => (
                                <Link
                                    key={item}
                                    href={item === 'Remolques' ? '/remolques' : `/#${item.toLowerCase()}`}
                                    className="text-sm text-background/70 hover:text-background transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase text-background/40 mb-4">Contacto</h4>
                        <div className="space-y-3 text-sm text-background/70">
                            <p>+52 (800) 123-4567</p>
                            <p>info@chieflogs.mx</p>
                            <p>Monterrey, N.L.</p>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-background/40">
                        © {currentYear} Chief. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
