'use client';

import { useState } from 'react';
import type { TrafficSummary } from '@/app/lib/stats';

const fechaCorta = (day: string) => {
  const [, m, d] = day.split('-');
  return `${d}/${m}`;
};

const fechaLarga = (day: string) =>
  new Date(`${day}T12:00:00`).toLocaleDateString('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

function Stat({ label, value, big = false }: { label: string; value: number; big?: boolean }) {
  return (
    <div>
      <p className='text-[10px] font-bold tracking-[0.2em] text-neutral-500'>{label}</p>
      <p
        className={`mt-1 font-black tabular-nums text-white ${big ? 'text-4xl sm:text-5xl' : 'text-xl'}`}
      >
        {value.toLocaleString('es-AR')}
      </p>
    </div>
  );
}

export default function Traffic({ data }: { data: TrafficSummary }) {
  const [activo, setActivo] = useState<number | null>(null);

  const max = Math.max(...data.series.map((d) => d.count), 1);
  const picoIndex = data.series.reduce(
    (best, d, i) => (d.count > data.series[best].count ? i : best),
    0
  );
  const hayDatos = data.total > 0;

  return (
    <section className='border border-neutral-800 bg-neutral-950 p-5 sm:p-6'>
      <div className='mb-6 flex flex-wrap items-end justify-between gap-6'>
        <Stat label='VISITAS HOY' value={data.today} big />
        <div className='flex gap-8'>
          <Stat label='7 DÍAS' value={data.last7} />
          <Stat label='30 DÍAS' value={data.last30} />
          <Stat label='TOTAL' value={data.total} />
        </div>
      </div>

      {hayDatos ? (
        <>
          <div className='relative'>
            {/* Techo de la escala: sólo la línea, el número va sobre el pico. */}
            <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-neutral-900' />

            <ul className='flex h-32 items-end gap-[2px] pt-4'>
              {data.series.map((d, i) => {
                const alto = (d.count / max) * 100;
                const resaltada = activo === i;

                return (
                  <li key={d.day} className='relative flex h-full flex-1 items-end'>
                    <button
                      type='button'
                      onMouseEnter={() => setActivo(i)}
                      onMouseLeave={() => setActivo(null)}
                      onFocus={() => setActivo(i)}
                      onBlur={() => setActivo(null)}
                      aria-label={`${fechaLarga(d.day)}: ${d.count} visitas`}
                      className='flex h-full w-full items-end focus:outline-none'
                    >
                      <span
                        style={{ height: `${Math.max(alto, d.count > 0 ? 4 : 1.5)}%` }}
                        className={`w-full rounded-t-[4px] transition-colors ${
                          resaltada ? 'bg-white' : d.count > 0 ? 'bg-neutral-300' : 'bg-neutral-800'
                        }`}
                      />
                    </button>

                    {resaltada && (
                      <span className='pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap border border-neutral-700 bg-black px-2 py-1 text-[10px] text-white shadow-lg'>
                        <strong className='tabular-nums'>{d.count}</strong> · {fechaCorta(d.day)}
                      </span>
                    )}

                    {/* Un solo valor a la vista, en el pico: no un número por barra. */}
                    {i === picoIndex && activo === null && d.count > 0 && (
                      <span className='pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] font-bold tabular-nums text-white'>
                        {d.count}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className='mt-2 flex justify-between text-[10px] text-neutral-600'>
            <span>{fechaCorta(data.series[0].day)}</span>
            <span>hoy</span>
          </div>

          <details className='mt-5 border-t border-neutral-900 pt-3'>
            <summary className='cursor-pointer text-[11px] text-neutral-500 transition-colors hover:text-white'>
              Ver los números
            </summary>
            <table className='mt-3 w-full text-left text-[11px]'>
              <thead>
                <tr className='text-neutral-600'>
                  <th className='pb-1 font-medium'>Día</th>
                  <th className='pb-1 text-right font-medium'>Visitas</th>
                </tr>
              </thead>
              <tbody className='text-neutral-300'>
                {[...data.series].reverse().map((d) => (
                  <tr key={d.day}>
                    <td className='py-0.5'>{fechaLarga(d.day)}</td>
                    <td className='py-0.5 text-right tabular-nums'>{d.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </>
      ) : (
        <p className='border-t border-neutral-900 pt-4 text-xs leading-relaxed text-neutral-500'>
          Todavía no hay visitas registradas. Se cuenta una por persona y por sesión, sin contar
          buscadores ni tus propias recargas.
        </p>
      )}
    </section>
  );
}
