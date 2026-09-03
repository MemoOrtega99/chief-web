import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import TrailersCTA from '@/components/sections/TrailersCTA';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Coverage from '@/components/sections/Coverage';
import Clients from '@/components/sections/Clients';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <TrailersCTA />
        <Services />
        <Coverage />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
