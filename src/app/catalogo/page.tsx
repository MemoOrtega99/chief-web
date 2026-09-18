import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Catalog3D from '@/components/catalog/Catalog3D';

export const metadata: Metadata = {
    title: 'Catálogo | Chief Trailers del Norte',
    description:
        'Explora los remolques y plataformas de Chief Trailers del Norte, personaliza tu unidad y solicita tu cotización.',
};

export default function CatalogoPage() {
    return (
        <>
            <Header />
            <main>
                <Suspense>
                    <Catalog3D />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
