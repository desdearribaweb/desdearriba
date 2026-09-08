'use client';

import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import Introduction from '@/app/components/Introduction';
import Services from '@/app/components/Services';
import Portfolio from '@/app/components/Portfolio';
import Formats from '@/app/components/Formats';
import Equipment from '@/app/components/Equipment';
import Editing from '@/app/components/Editing';
import Process from '@/app/components/Process';
import CTASection from '@/app/components/CTASection';
import Contact from '@/app/components/Contact';
import Footer from '@/app/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

export default function Home() {
  return (
    <div className='bg-black'>
      <Header />
      <Hero />
      <Introduction />
      <Services />
      <Portfolio />
      <Formats />
      <Equipment />
      <Editing />
      <Process />
      <CTASection />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
