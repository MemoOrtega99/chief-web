import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TrailersPage from '@/components/sections/TrailersPage';

export const metadata: Metadata = {
    title: 'Modelos 3D y especificaciones | Chief Trailers del Norte',
    description: 'Explora los modelos 3D de Chief Trailers del Norte, sus especificaciones y configuraciones para carga pesada.',
};

export default function Remolques() {
    return (
        <>
            <Header />
            <main>
                <TrailersPage />
            </main>
            <Footer />
        </>
    );
}
