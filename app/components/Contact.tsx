import { MessageCircle } from 'lucide-react';
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from '@/app/lib/contact';

export default function Contact() {
  return (
    <section
      id='contacto'
      className='border-t border-neutral-900 px-4 py-20 sm:px-6 sm:py-32 lg:px-8'
    >
      <div className='mx-auto max-w-3xl text-center'>
        <h2 className='text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl'>
          ¿TENÉS UN PROYECTO?
          <span className='mt-2 block text-neutral-500'>VEÁMOSLO DESDE ARRIBA.</span>
        </h2>

        <p className='mx-auto mt-6 max-w-lg text-base leading-relaxed text-neutral-400'>
          Contame qué necesitás filmar y armamos una propuesta para tu proyecto.
        </p>

        <div className='mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
          <a
            href={whatsappLink('Hola Desde Arriba, quisiera consultar por una filmación con drone.')}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex w-full items-center justify-center gap-2 bg-white px-10 py-4 text-sm font-black tracking-wide text-black transition-colors hover:bg-neutral-200 sm:w-auto'
          >
            <MessageCircle size={18} />
            CONTAME TU IDEA
          </a>

          <a
            href={INSTAGRAM_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex w-full items-center justify-center border border-neutral-700 px-10 py-4 text-sm font-black tracking-wide text-white transition-colors hover:border-white sm:w-auto'
          >
            @_DESDEARRIBA_
          </a>
        </div>

        <p className='mt-8 text-sm text-neutral-500'>{WHATSAPP_DISPLAY}</p>
      </div>
    </section>
  );
}
