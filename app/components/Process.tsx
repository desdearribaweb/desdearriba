const steps = [
  { number: '01', title: 'CONTAME TU IDEA' },
  { number: '02', title: 'PLANIFICAMOS LAS TOMAS' },
  { number: '03', title: 'VOLAMOS Y FILMAMOS' },
  { number: '04', title: 'RECIBÍ TU MATERIAL' },
];

export default function Process() {
  return (
    <section
      id='proceso'
      className='border-t border-neutral-900 px-4 py-16 sm:px-6 sm:py-28 lg:px-8'
    >
      <div className='mx-auto max-w-6xl'>
        <header className='mb-12'>
          <p className='mb-3 text-[11px] font-bold tracking-[0.3em] text-neutral-500'>PROCESO</p>
          <h2 className='text-4xl font-black tracking-tight text-white sm:text-5xl'>
            ¿CÓMO TRABAJAMOS?
          </h2>
        </header>

        <ol className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
          {steps.map((step) => (
            <li key={step.number} className='border-t border-neutral-800 pt-4'>
              <span className='block text-2xl font-black text-neutral-700'>{step.number}</span>
              <h3 className='mt-2 text-sm font-black leading-snug tracking-wide text-white'>
                {step.title}
              </h3>
            </li>
          ))}
        </ol>

        <p className='mt-12 max-w-2xl text-sm leading-relaxed text-neutral-500'>
          El servicio puede incluir solamente las tomas aéreas o también la edición completa del
          contenido.
        </p>
      </div>
    </section>
  );
}
