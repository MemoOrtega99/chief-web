import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import Showcase3D from '@/components/sections/Showcase3D';
import ProductLines from '@/components/sections/ProductLines';
import Manifesto from '@/components/sections/Manifesto';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Showcase3D />
        <ProductLines />
        <Manifesto />
        <Suspense>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
