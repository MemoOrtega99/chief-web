import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Catalog3D from '@/components/catalog/Catalog3D';

export const metadata: Metadata = {
    title: 'Catálogo 3D | Chief Trailers del Norte',
    description:
        'Explora en 3D los remolques y plataformas de Chief Trailers del Norte, elige el color y solicita tu cotización.',
};

export default function CatalogoPage() {
    return (
        <>
            <Header solid />
            <main>
                <Suspense>
                    <Catalog3D />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
