'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { whatsappLink } from '@/app/lib/contact';

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-white/10 bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8'>
        <a href='#top' className='flex items-center gap-2.5' aria-label='Desde Arriba, inicio'>
          <Image
            src='/logo.svg'
            alt=''
            width={36}
            height={36}
            priority
            className='h-8 w-8 sm:h-9 sm:w-9'
          />
          <span className='text-xs font-black tracking-[0.2em] text-white sm:text-sm'>
            DESDE ARRIBA
          </span>
        </a>

        <nav className='hidden items-center gap-8 lg:flex'>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className='text-sm text-neutral-300 transition-colors hover:text-white'
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappLink('Hola Desde Arriba, quisiera solicitar un presupuesto.')}
          target='_blank'
          rel='noopener noreferrer'
          className='hidden bg-white px-5 py-2.5 text-xs font-black tracking-wide text-black transition-colors hover:bg-neutral-200 lg:block'
        >
          SOLICITAR PRESUPUESTO
        </a>

        <button
          type='button'
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className='-mr-2 p-2 text-white lg:hidden'
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className='border-t border-white/10 px-4 pb-6 pt-2 sm:px-6 lg:hidden'>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className='block py-3 text-sm text-neutral-300 transition-colors hover:text-white'
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink('Hola Desde Arriba, quisiera solicitar un presupuesto.')}
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => setOpen(false)}
            className='mt-3 block bg-white px-5 py-3 text-center text-xs font-black tracking-wide text-black'
          >
            SOLICITAR PRESUPUESTO
          </a>
        </nav>
      )}
    </header>
  );
}
