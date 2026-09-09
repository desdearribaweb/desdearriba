import { existsSync } from 'node:fs';
import path from 'node:path';

const specs = [
  { label: 'DRONE', value: 'DJI Mini 4 Pro' },
  { label: 'RESOLUCIÓN', value: '4K hasta 60 FPS' },
  { label: 'FORMATOS', value: 'Horizontal y vertical' },
  { label: 'ESTABILIZACIÓN', value: 'Profesional' },
];

// Se evalúa en build: si el archivo no está, la sección no lo pide (evita un 404).
const hasVideo = existsSync(path.join(process.cwd(), 'public', 'videos', 'equipo.mp4'));

export default function Equipment() {
  return (
    <section
      id='equipo'
      className='relative overflow-hidden border-t border-neutral-900 px-4 py-16 sm:px-6 sm:py-28 lg:px-8'
    >
      {hasVideo && (
        // El clip viene sobre negro puro, así que se funde con el fondo de la página.
        <video
          autoPlay
          muted
          loop
          playsInline
          preload='none'
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25'
        >
          <source src='/videos/equipo.mp4' type='video/mp4' />
        </video>
      )}

      <div className='relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20'>
        <div>
          <p className='mb-3 text-[11px] font-bold tracking-[0.3em] text-neutral-500'>EQUIPO</p>

          <h2 className='text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl'>
            4K.
            <br />
            HORIZONTAL.
            <br />
            VERTICAL.
          </h2>

          <p className='mt-6 max-w-md text-base leading-relaxed text-neutral-400'>
            Grabamos en 4K hasta 60 FPS con DJI Mini 4 Pro, en horizontal para web y piezas
            institucionales, y en vertical nativo para Reels, Stories y TikTok.
          </p>

          <dl className='mt-10 grid grid-cols-2 gap-x-6 gap-y-6'>
            {specs.map((spec) => (
              <div key={spec.label} className='border-l border-white/80 pl-4'>
                <dt className='text-[10px] font-bold tracking-[0.2em] text-neutral-500'>
                  {spec.label}
                </dt>
                <dd className='mt-1 text-sm font-bold text-white sm:text-base'>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className='flex items-end justify-center gap-5 sm:gap-8'>
          <figure className='w-full max-w-[210px]'>
            <div className='flex aspect-[16/9] w-full items-center justify-center border border-neutral-700 bg-neutral-950'>
              <span className='text-2xl font-black tracking-tight text-neutral-700'>16:9</span>
            </div>
            <figcaption className='mt-3 text-[10px] font-bold leading-relaxed tracking-[0.2em] text-neutral-500'>
              HORIZONTAL
              <span className='mt-1 block font-medium tracking-normal text-neutral-600'>
                YouTube · Web · Publicidad
              </span>
            </figcaption>
          </figure>

          <figure className='w-full max-w-[130px]'>
            <div className='flex aspect-[9/16] w-full items-center justify-center border border-white/80 bg-neutral-950'>
              <span className='text-2xl font-black tracking-tight text-white'>9:16</span>
            </div>
            <figcaption className='mt-3 text-[10px] font-bold leading-relaxed tracking-[0.2em] text-white'>
              VERTICAL
              <span className='mt-1 block font-medium tracking-normal text-neutral-500'>
                Reels · Stories · TikTok
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
