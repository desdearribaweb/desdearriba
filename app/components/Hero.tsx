'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className='relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden pt-20'>
      {/* Video Background */}
      <div className='absolute inset-0 w-full h-full'>
        <video
          autoPlay
          muted
          loop
          playsInline
          className='w-full h-full object-cover'
          poster='/images/hero-poster.jpg'
        >
          <source src='/videos/hero.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black bg-opacity-40'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tight'>
          DESDE ARRIBA
        </h1>

        <p className='text-xl sm:text-2xl lg:text-3xl font-light text-gray-100 mb-8 sm:mb-10 tracking-wide'>
          FILMAMOS OTRA PERSPECTIVA.
        </p>

        <p className='text-base sm:text-lg text-gray-200 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed'>
          Fotografía y filmación aérea profesional en 4K para eventos, arquitectura, inmuebles,
          campos y producciones audiovisuales.
        </p>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-16'>
          <a
            href='https://wa.me/5493492680779?text=Hola%20Desde%20Arriba,%20quisiera%20consultar%20por%20una%20filmaci%C3%B3n%20con%20drone'
            className='bg-white text-black px-8 sm:px-10 py-3 sm:py-4 font-bold text-sm sm:text-base tracking-wide hover:bg-gray-200 transition-colors'
          >
            SOLICITAR PRESUPUESTO
          </a>

          <button
            onClick={() => scrollToSection('portfolio')}
            className='border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 font-bold text-sm sm:text-base tracking-wide hover:bg-white hover:text-black transition-colors'
          >
            VER TRABAJOS
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <ChevronDown className='text-white opacity-70' size={32} />
        </div>
      </div>
    </section>
  );
}
