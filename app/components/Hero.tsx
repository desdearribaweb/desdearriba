import { existsSync } from 'node:fs';
import path from 'node:path';
import { ChevronDown } from 'lucide-react';
import { whatsappLink } from '@/app/lib/contact';

const inPublic = (...parts: string[]) => existsSync(path.join(process.cwd(), 'public', ...parts));

// Se evalúa en build: mientras no exista el video, el hero no lo pide (evita un 404).
const localVideo = inPublic('videos', 'hero.mp4') ? '/videos/hero.mp4' : null;
const localPoster = inPublic('images', 'hero-poster.jpg') ? '/images/hero-poster.jpg' : undefined;

export default function Hero({ videoUrl }: { videoUrl?: string }) {
  const src = videoUrl ?? localVideo;
  // El poster es el primer cuadro del video local: no sirve para uno subido al panel.
  const poster = videoUrl ? undefined : localPoster;

  return (
    <section className='relative flex min-h-[100svh] items-center justify-center overflow-hidden'>
      <div className='absolute inset-0'>
        {src ? (
          // Un vertical 9:16 encaja perfecto en mobile; en desktop se recorta al centro.
          <video
            autoPlay
            muted
            loop
            playsInline
            preload='metadata'
            poster={poster}
            className='h-full w-full object-cover'
          >
            {/* El #t=0.1 hace que se vea ese cuadro si el navegador bloquea el autoplay. */}
            <source src={`${src}#t=0.1`} type='video/mp4' />
          </video>
        ) : (
          <div className='h-full w-full bg-[radial-gradient(ellipse_at_50%_35%,#1c1c1c_0%,#000_70%)]' />
        )}
        {/* Suave en el centro para no tapar la toma; oscuro arriba y abajo, donde va el texto. */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/70' />
      </div>

      <div className='relative z-10 mx-auto max-w-3xl px-4 pb-16 pt-28 text-center sm:px-6'>
        <h1 className='text-5xl font-black leading-[0.9] tracking-tight text-white [text-shadow:0_2px_24px_rgb(0_0_0/0.75)] sm:text-7xl'>
          DESDE ARRIBA
        </h1>

        <p className='mt-5 text-lg font-light tracking-[0.15em] text-white/90 [text-shadow:0_2px_24px_rgb(0_0_0/0.75)] sm:text-2xl'>
          FILMAMOS OTRA PERSPECTIVA.
        </p>

        <p className='mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/80 [text-shadow:0_2px_24px_rgb(0_0_0/0.75)] sm:text-base'>
          Hay proyectos que se entienden mejor desde arriba. Fotografía y filmación aérea
          profesional en 4K para eventos, arquitectura, inmuebles, campos y producciones.
        </p>

        <div className='mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4'>
          <a
            href={whatsappLink('Hola Desde Arriba, quisiera consultar por una filmación con drone.')}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full bg-white px-9 py-4 text-sm font-black tracking-wide text-black transition-colors hover:bg-neutral-200 sm:w-auto'
          >
            SOLICITAR PRESUPUESTO
          </a>

          <a
            href='#servicios'
            className='w-full border border-white/60 px-9 py-4 text-sm font-black tracking-wide text-white transition-colors hover:bg-white hover:text-black sm:w-auto'
          >
            QUÉ FILMAMOS
          </a>
        </div>
      </div>

      <a
        href='#servicios'
        aria-label='Ir al contenido'
        className='absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/50 transition-colors hover:text-white'
      >
        <ChevronDown size={26} className='animate-bounce' />
      </a>
    </section>
  );
}
