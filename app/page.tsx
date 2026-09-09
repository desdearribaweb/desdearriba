import { getSiteData } from '@/app/lib/projects';
import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import Services from '@/app/components/Services';
import Portfolio from '@/app/components/Portfolio';
import Equipment from '@/app/components/Equipment';
import Process from '@/app/components/Process';
import Contact from '@/app/components/Contact';
import Footer from '@/app/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

export default async function Home() {
  const { heroVideo, projects } = await getSiteData();

  return (
    <>
      <Header />
      <main id='top'>
        <Hero videoUrl={heroVideo} />
        <Services />
        <Portfolio projects={projects} />
        <Equipment />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
