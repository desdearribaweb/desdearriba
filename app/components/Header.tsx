'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navLinks = [
    { label: 'Servicios', id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Equipo', id: 'equipment' },
    { label: 'Proceso', id: 'process' },
    { label: 'Contacto', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black bg-opacity-95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16 sm:h-20'>
          {/* Logo */}
          <Link href='/' className='flex items-center'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-white'></div>
              <span className='text-white font-black text-sm sm:text-base tracking-widest'>
                DESDE ARRIBA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex items-center gap-8'>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className='text-gray-300 hover:text-white text-sm font-medium transition-colors'
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className='hidden lg:block'>
            <a
              href='https://wa.me/5493492680779?text=Hola%20Desde%20Arriba,%20quisiera%20consultar%20por%20una%20filmaci%C3%B3n%20con%20drone'
              className='bg-white text-black px-6 py-2 font-bold text-sm tracking-wide hover:bg-gray-200 transition-colors'
            >
              SOLICITAR PRESUPUESTO
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='lg:hidden text-white p-2'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className='lg:hidden border-t border-gray-800 py-4 space-y-4'>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className='block w-full text-left text-gray-300 hover:text-white px-0 py-2 text-sm font-medium transition-colors'
              >
                {link.label}
              </button>
            ))}
            <a
              href='https://wa.me/5493492680779?text=Hola%20Desde%20Arriba,%20quisiera%20consultar%20por%20una%20filmaci%C3%B3n%20con%20drone'
              className='block w-full bg-white text-black px-4 py-3 font-bold text-sm tracking-wide text-center hover:bg-gray-200 transition-colors mt-4'
            >
              SOLICITAR PRESUPUESTO
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
