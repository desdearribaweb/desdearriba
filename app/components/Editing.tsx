'use client';

export default function Editing() {
  const editingServices = [
    'Selección de tomas',
    'Edición',
    'Montaje',
    'Corrección de color',
    'Música',
    'Adaptación para redes sociales',
  ];

  return (
    <section id='editing' className='bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center'>
          {/* Content */}
          <div>
            <h2 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight'>
              DE LA TOMA
              <br /> AL VIDEO FINAL.
            </h2>

            <p className='text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8'>
              No solo hacemos las tomas.
            </p>

            <p className='text-gray-300 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10'>
              También podemos transformar el material en una pieza audiovisual completa, lista para
              publicar.
            </p>

            <div className='space-y-3'>
              {editingServices.map((service, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <div className='w-2 h-2 bg-white'></div>
                  <p className='text-gray-300 text-base'>{service}</p>
                </div>
              ))}
            </div>

            <a
              href='https://wa.me/5493492680779?text=Hola%20Desde%20Arriba,%20quisiera%20consultar%20por%20edici%C3%B3n%20de%20video'
              className='inline-block mt-8 sm:mt-10 bg-white text-black px-8 sm:px-10 py-3 sm:py-4 font-bold text-sm tracking-wide hover:bg-gray-200 transition-colors'
            >
              QUIERO MI VIDEO
            </a>
          </div>

          {/* Visual */}
          <div className='grid grid-cols-1 gap-4 h-full'>
            <div className='bg-gray-900 h-48 sm:h-56 flex items-center justify-center border border-gray-800'>
              <p className='text-gray-600 text-center px-4'>Selección y análisis</p>
            </div>
            <div className='bg-gray-900 h-48 sm:h-56 flex items-center justify-center border border-gray-800'>
              <p className='text-gray-600 text-center px-4'>Edición y montaje profesional</p>
            </div>
            <div className='bg-gray-900 h-48 sm:h-56 flex items-center justify-center border border-gray-800'>
              <p className='text-gray-600 text-center px-4'>Entrega lista para publicar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
