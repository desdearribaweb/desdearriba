import { services } from '@/app/data/services';

export default function Services() {
  return (
    <section
      id='servicios'
      className='border-t border-neutral-900 px-4 py-16 sm:px-6 sm:py-28 lg:px-8'
    >
      <div className='mx-auto max-w-6xl'>
        <header className='mb-12 sm:mb-16'>
          <p className='mb-3 text-[11px] font-bold tracking-[0.3em] text-neutral-500'>SERVICIOS</p>
          <h2 className='text-4xl font-black tracking-tight text-white sm:text-5xl'>
            ¿QUÉ PODEMOS FILMAR?
          </h2>
        </header>

        <ul className='grid grid-cols-2 gap-px border border-neutral-900 bg-neutral-900 lg:grid-cols-3'>
          {services.map((service, index) => (
            <li
              key={service.title}
              className='group bg-black p-4 transition-colors duration-300 hover:bg-neutral-950 sm:p-7'
            >
              <span className='text-[10px] font-bold tracking-[0.2em] text-neutral-600 transition-colors group-hover:text-white'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className='mt-2 text-sm font-black leading-tight tracking-wide text-white sm:mt-3 sm:text-xl'>
                {service.title}
              </h3>
              <p className='mt-2 text-xs leading-relaxed text-neutral-400 sm:text-sm'>
                {service.description}
              </p>
            </li>
          ))}
          {/* Completa la última fila para que no quede el fondo de la grilla a la vista. */}
          <li aria-hidden='true' className='bg-black lg:col-span-2' />
        </ul>
      </div>
    </section>
  );
}
