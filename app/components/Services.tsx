'use client';

import Image from 'next/image';
import { services } from '@/app/data/services';

export default function Services() {
  return (
    <section id='services' className='bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-16 sm:mb-20 tracking-tight text-center'>
          ¿QUÉ PODEMOS <br className='hidden sm:block' /> FILMAR?
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {services.map((service) => (
            <div
              key={service.id}
              className='group cursor-pointer overflow-hidden bg-gray-900 hover:bg-gray-800 transition-all duration-300'
            >
              {/* Image Container */}
              <div className='relative w-full h-64 sm:h-72 overflow-hidden'>
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                ) : (
                  <div className='w-full h-full bg-gray-800 flex items-center justify-center'>
                    <div className='text-center text-gray-600'>
                      <p className='text-sm'>Imagen del servicio</p>
                      <p className='text-xs mt-2'>{service.title}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className='p-6 sm:p-8'>
                <h3 className='text-xl sm:text-2xl font-black text-white mb-3 tracking-wide'>
                  {service.title}
                </h3>
                <p className='text-gray-300 text-sm sm:text-base leading-relaxed'>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
