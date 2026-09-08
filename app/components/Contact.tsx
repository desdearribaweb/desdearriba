'use client';

import { MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <section id='contact' className='bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <h2 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8 tracking-tight text-center'>
          HABLEMOS.
        </h2>

        <p className='text-center text-gray-300 text-base sm:text-lg mb-12 sm:mb-16 leading-relaxed'>
          Contame qué necesitás filmar y armamos una propuesta para tu proyecto.
        </p>

        {/* Contact Methods */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16'>
          {/* WhatsApp */}
          <a
            href='https://wa.me/5493492680779'
            className='border-2 border-white p-8 hover:bg-white transition-colors group'
          >
            <MessageCircle className='text-white mb-4 group-hover:text-black' size={32} />
            <h3 className='text-xl font-black text-white mb-2 group-hover:text-black tracking-wide'>
              WHATSAPP
            </h3>
            <p className='text-gray-300 group-hover:text-black text-sm'>
              +54 9 3492 680779
            </p>
          </a>

          {/* Instagram */}
          <a
            href='https://instagram.com/_desdearriba_'
            target='_blank'
            rel='noopener noreferrer'
            className='border-2 border-white p-8 hover:bg-white transition-colors group'
          >
            <svg
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='text-white mb-4 group-hover:text-black'
            >
              <path d='M7 2h10c2.761 0 5 2.239 5 5v10c0 2.761-2.239 5-5 5H7c-2.761 0-5-2.239-5-5V7c0-2.761 2.239-5 5-5z' />
            </svg>
            <h3 className='text-xl font-black text-white mb-2 group-hover:text-black tracking-wide'>
              INSTAGRAM
            </h3>
            <p className='text-gray-300 group-hover:text-black text-sm'>
              @_desdearriba_
            </p>
          </a>
        </div>

        {/* Quick Contact Form - Optional */}
        <div className='bg-gray-900 p-8 sm:p-10 border border-gray-800'>
          <p className='text-gray-400 text-sm mb-6 text-center'>O contactá directamente desde aquí</p>

          <form className='space-y-4' action='https://wa.me/5493492680779' method='get' target='_blank'>
            <input
              type='text'
              placeholder='Tu nombre'
              className='w-full bg-black border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors'
              required
            />

            <input
              type='text'
              placeholder='Empresa (opcional)'
              className='w-full bg-black border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors'
            />

            <select className='w-full bg-black border border-gray-700 px-4 py-3 text-gray-500 focus:border-white focus:outline-none transition-colors cursor-pointer'>
              <option value=''>Tipo de proyecto</option>
              <option value='eventos'>Eventos</option>
              <option value='arquitectura'>Arquitectura</option>
              <option value='inmobiliario'>Inmobiliario</option>
              <option value='campos'>Campos</option>
              <option value='empresas'>Empresas/Obras</option>
              <option value='redes'>Contenido para redes</option>
              <option value='edicion'>Edición de video</option>
              <option value='otro'>Otro</option>
            </select>

            <textarea
              placeholder='Cuéntame tu proyecto...'
              rows={5}
              className='w-full bg-black border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors resize-none'
            ></textarea>

            <button
              type='submit'
              className='w-full bg-white text-black px-6 py-3 font-bold text-sm tracking-wide hover:bg-gray-200 transition-colors'
            >
              ENVIAR POR WHATSAPP
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
