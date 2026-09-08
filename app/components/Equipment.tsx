'use client';

import Image from 'next/image';

export default function Equipment() {
  const specs = [
    { label: '4K', value: 'Hasta 60 FPS' },
    { label: 'GRABACIÓN', value: 'Horizontal y Vertical' },
    { label: 'ESTABILIZACIÓN', value: 'Profesional de 3 ejes' },
    { label: 'DRONE', value: 'DJI Mini 4 Pro' },
  ];

  return (
    <section id='equipment' className='bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-16 sm:mb-20 tracking-tight text-center'>
          LA TECNOLOGÍA
          <br className='hidden sm:block' /> DETRÁS DE LA IMAGEN.
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center'>
          {/* Image */}
          <div className='flex justify-center'>
            <div className='w-full max-w-sm h-96 bg-gray-900 border-2 border-gray-800 flex items-center justify-center'>
              <Image
                src='/images/drone-placeholder.jpg'
                alt='DJI Mini 4 Pro'
                width={400}
                height={400}
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          {/* Specs */}
          <div className='space-y-6 sm:space-y-8'>
            <div>
              <h3 className='text-3xl sm:text-4xl font-black text-white mb-2 tracking-wide'>
                DJI MINI 4 PRO
              </h3>
              <p className='text-gray-400 text-sm'>Equipo profesional de captura aérea</p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
              {specs.map((spec, index) => (
                <div key={index} className='border-l-2 border-white pl-4'>
                  <p className='text-gray-400 text-xs font-bold tracking-widest mb-1'>
                    {spec.label}
                  </p>
                  <p className='text-white font-bold text-base sm:text-lg'>{spec.value}</p>
                </div>
              ))}
            </div>

            <div className='pt-6 sm:pt-8 border-t border-gray-800'>
              <p className='text-gray-300 text-base leading-relaxed'>
                Utilizamos tecnología de punta para garantizar la máxima calidad en cada toma,
                asegurando que tus proyectos se vean cinematográficos y profesionales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
