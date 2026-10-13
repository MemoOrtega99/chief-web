import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import About from '@/components/sections/About';
import Hero from '@/components/sections/Hero';
import ExperienceStats from '@/components/sections/ExperienceStats';
import ProductLines from '@/components/sections/ProductLines';
import CatalogInvite from '@/components/sections/CatalogInvite';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <ExperienceStats />
        <ProductLines />
        <CatalogInvite />
        <Suspense>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
