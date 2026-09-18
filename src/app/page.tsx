import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import CatalogInvite from '@/components/sections/CatalogInvite';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CatalogInvite />
        <Suspense>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
