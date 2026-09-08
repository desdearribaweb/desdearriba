'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-gray-950 border-t border-gray-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Top */}
        <div className='flex flex-col sm:flex-row justify-between items-center gap-8 mb-8 pb-8 border-b border-gray-900'>
          {/* Logo & Description */}
          <div className='flex items-center gap-3'>
            <div className='w-6 h-6 bg-white'></div>
            <div>
              <p className='text-white font-black text-sm tracking-widest'>DESDE ARRIBA</p>
              <p className='text-gray-500 text-xs'>Fotografía aérea</p>
            </div>
          </div>

          {/* Social Links */}
          <div className='flex items-center gap-6'>
            <a
              href='https://instagram.com/_desdearriba_'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-400 hover:text-white transition-colors'
              aria-label='Instagram'
            >
              <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M7 2h10c2.761 0 5 2.239 5 5v10c0 2.761-2.239 5-5 5H7c-2.761 0-5-2.239-5-5V7c0-2.761 2.239-5 5-5z' />
              </svg>
            </a>

            <a
              href='https://wa.me/5493492680779'
              className='text-gray-400 hover:text-white transition-colors'
              aria-label='WhatsApp'
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className='text-center text-gray-500 text-xs'>
          <p>© DESDE ARRIBA {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
