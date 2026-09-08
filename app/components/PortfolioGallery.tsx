'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Play, X } from 'lucide-react';
import { PROJECT_CATEGORIES, type Project } from '@/app/lib/projects';

const labelFor = (value: string) =>
  PROJECT_CATEGORIES.find((c) => c.value === value)?.label ?? '';

export default function PortfolioGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [active, close]);

  return (
    <>
      {/* Mobile: carrusel con snap. Desktop: tres columnas verticales. */}
      <ul
        className='no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0'
      >
        {projects.map((project, index) => (
          <li
            key={project.id}
            className='w-[72vw] max-w-xs shrink-0 snap-center sm:w-auto sm:max-w-none'
          >
            <button
              type='button'
              onClick={() => project.image && setActive(project)}
              disabled={!project.image}
              className='group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-default'
            >
              <div className='relative aspect-[9/16] w-full overflow-hidden border border-neutral-900 bg-neutral-950'>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes='(max-width: 640px) 72vw, 33vw'
                    priority={index === 0}
                    className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]'
                  />
                ) : (
                  <span className='absolute inset-0 flex items-center justify-center'>
                    <span className='h-16 w-16 rounded-full border border-neutral-800' />
                  </span>
                )}

                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent' />

                {project.video && (
                  <span className='absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110'>
                    <Play size={20} className='ml-0.5 text-white' fill='currentColor' />
                  </span>
                )}

                <div className='absolute inset-x-0 bottom-0 p-4'>
                  <p className='text-[10px] font-bold tracking-[0.25em] text-white/60'>
                    {labelFor(project.category)}
                  </p>
                  <h3 className='mt-1 text-base font-black leading-tight tracking-wide text-white'>
                    {project.title}
                  </h3>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role='dialog'
          aria-modal='true'
          aria-label={active.title}
          onClick={close}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8'
        >
          <button
            type='button'
            onClick={close}
            aria-label='Cerrar'
            className='absolute right-4 top-4 z-10 border border-white/30 p-2 text-white transition-colors hover:bg-white hover:text-black sm:right-6 sm:top-6'
          >
            <X size={20} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className='flex max-h-full w-full max-w-sm flex-col items-center'
          >
            <div className='relative aspect-[9/16] max-h-[78vh] w-full overflow-hidden bg-black'>
              {active.video ? (
                <video
                  src={active.video}
                  poster={active.image}
                  controls
                  autoPlay
                  playsInline
                  preload='metadata'
                  className='h-full w-full object-contain'
                />
              ) : (
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes='(max-width: 640px) 92vw, 24rem'
                  className='object-contain'
                />
              )}
            </div>

            <div className='w-full pt-4'>
              <p className='text-[10px] font-bold tracking-[0.25em] text-neutral-500'>
                {labelFor(active.category)}
              </p>
              <h3 className='mt-1 text-lg font-black tracking-wide text-white'>{active.title}</h3>
              {active.description && (
                <p className='mt-1 text-sm leading-relaxed text-neutral-400'>
                  {active.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
