'use client';

export default function Formats() {
  return (
    <section id='formats' className='bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center'>
          {/* Text */}
          <div>
            <h2 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight'>
              4K.
              <br /> HORIZONTAL.
              <br /> VERTICAL.
            </h2>

            <p className='text-gray-300 text-base sm:text-lg leading-relaxed mb-6'>
              Grabamos en resolución 4K hasta 60 FPS utilizando DJI Mini 4 Pro.
            </p>

            <p className='text-gray-300 text-base sm:text-lg leading-relaxed'>
              Generamos material tanto en formato horizontal como vertical, adaptándolo al destino
              final de cada producción.
            </p>
          </div>

          {/* Visual Formats */}
          <div className='flex items-center justify-center gap-8 sm:gap-12'>
            {/* Horizontal 16:9 */}
            <div className='flex flex-col items-center gap-4'>
              <div className='w-32 sm:w-40 h-20 sm:h-24 bg-gray-900 border-2 border-gray-700 flex flex-col items-center justify-center'>
                <p className='text-gray-400 text-xs font-bold'>16:9</p>
              </div>
              <div className='text-center text-xs text-gray-400'>
                <p className='font-bold'>HORIZONTAL</p>
                <p className='text-xs mt-2'>YouTube</p>
                <p className='text-xs'>Web</p>
                <p className='text-xs'>Publicidad</p>
                <p className='text-xs'>Institucional</p>
              </div>
            </div>

            {/* Plus Sign */}
            <div className='text-4xl text-gray-600 font-light'>+</div>

            {/* Vertical 9:16 */}
            <div className='flex flex-col items-center gap-4'>
              <div className='w-20 sm:w-24 h-32 sm:h-40 bg-gray-900 border-2 border-gray-700 flex flex-col items-center justify-center'>
                <p className='text-gray-400 text-xs font-bold'>9:16</p>
              </div>
              <div className='text-center text-xs text-gray-400'>
                <p className='font-bold'>VERTICAL</p>
                <p className='text-xs mt-2'>Reels</p>
                <p className='text-xs'>Stories</p>
                <p className='text-xs'>TikTok</p>
                <p className='text-xs'>Publicidad móvil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
