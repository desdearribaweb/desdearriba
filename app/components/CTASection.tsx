'use client';

export default function CTASection() {
  return (
    <section className='relative w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden'>
      {/* Video Background */}
      <div className='absolute inset-0 w-full h-full'>
        <video
          autoPlay
          muted
          loop
          playsInline
          className='w-full h-full object-cover'
          poster='/images/cta-poster.jpg'
        >
          <source src='/videos/cta.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black bg-opacity-50'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-3xl mx-auto text-center'>
        <h2 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8 tracking-tight'>
          ¿TENÉS UN PROYECTO?
        </h2>

        <p className='text-2xl sm:text-3xl lg:text-4xl font-light text-gray-100 mb-10 sm:mb-12 tracking-wide'>
          VEÁMOSLO DESDE ARRIBA.
        </p>

        <a
          href='https://wa.me/5493492680779?text=Hola%20Desde%20Arriba,%20quisiera%20consultar%20por%20una%20filmaci%C3%B3n%20con%20drone'
          className='inline-block bg-white text-black px-10 sm:px-14 py-4 sm:py-5 font-black text-base sm:text-lg tracking-wide hover:bg-gray-200 transition-colors'
        >
          CONTAME TU IDEA
        </a>
      </div>
    </section>
  );
}
