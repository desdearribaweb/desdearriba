'use client';

export default function Process() {
  const steps = [
    { number: '01', title: 'CONTAME TU IDEA', description: 'Escuchamos tu proyecto y necesidades' },
    {
      number: '02',
      title: 'PLANIFICAMOS LAS TOMAS',
      description: 'Diseñamos la estrategia visual y técnica',
    },
    { number: '03', title: 'VOLAMOS Y FILMAMOS', description: 'Capturamos el material en 4K' },
    { number: '04', title: 'RECIBÍ TU MATERIAL', description: 'Entregas listas para usar' },
  ];

  return (
    <section id='process' className='bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight text-center'>
          ¿CÓMO TRABAJAMOS?
        </h2>

        <p className='text-center text-gray-400 text-base mb-16 sm:mb-20'>
          Proceso simple y profesional de principio a fin
        </p>

        {/* Steps */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16'>
          {steps.map((step, index) => (
            <div key={index} className='relative'>
              {/* Step Card */}
              <div className='bg-gray-900 p-6 sm:p-8 h-full border border-gray-800 hover:border-gray-700 transition-colors'>
                <div className='text-5xl sm:text-6xl font-black text-white opacity-20 mb-4'>
                  {step.number}
                </div>

                <h3 className='text-lg sm:text-xl font-black text-white mb-3 tracking-wide'>
                  {step.title}
                </h3>

                <p className='text-gray-400 text-sm leading-relaxed'>{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className='hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gray-700'></div>
              )}
            </div>
          ))}
        </div>

        {/* Note */}
        <div className='bg-gray-900 border border-gray-800 p-6 sm:p-8 text-center'>
          <p className='text-gray-300 text-base'>
            El servicio puede incluir solamente las tomas aéreas o también la edición completa del
            contenido, según tu necesidad.
          </p>
        </div>
      </div>
    </section>
  );
}
