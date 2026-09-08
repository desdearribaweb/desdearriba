import { getProjects } from '@/app/lib/projects';
import PortfolioGallery from './PortfolioGallery';

export default async function Portfolio() {
  const projects = await getProjects();

  return (
    <section id='portfolio' className='border-t border-neutral-900 px-4 py-16 sm:px-6 sm:py-28 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        <header className='mb-12 sm:mb-16'>
          <p className='mb-3 text-[11px] font-bold tracking-[0.3em] text-neutral-500'>PORTFOLIO</p>
          <h2 className='text-4xl font-black tracking-tight text-white sm:text-5xl'>
            TRABAJOS DESDE ARRIBA
          </h2>
        </header>

        <PortfolioGallery projects={projects} />
      </div>
    </section>
  );
}
