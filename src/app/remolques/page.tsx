import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TrailersPage from '@/components/sections/TrailersPage';

export const metadata: Metadata = {
    title: 'Catálogo de Remolques 3D | Chief',
    description: 'Explora nuestra línea de remolques en 3D. Visualiza modelos de caja seca, refrigerados y plataformas con especificaciones técnicas detalladas.',
};

export default function Remolques() {
    return (
        <>
            <Header />
            <main className="pt-20">
                <TrailersPage />
            </main>
            <Footer />
        </>
    );
}
