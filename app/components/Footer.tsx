import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { INSTAGRAM_URL, whatsappLink } from '@/app/lib/contact';
import InstagramIcon from './InstagramIcon';

export default function Footer() {
  return (
    <footer className='border-t border-neutral-900 px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between'>
        <div className='flex items-center gap-3'>
          <Image src='/logo.svg' alt='' width={28} height={28} className='h-7 w-7' />
          <div>
            <p className='text-xs font-black tracking-[0.2em] text-white'>DESDE ARRIBA</p>
            <p className='text-[11px] text-neutral-500'>Fotografía aérea</p>
          </div>
        </div>

        <div className='flex items-center gap-5'>
          <a
            href={INSTAGRAM_URL}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Instagram'
            className='text-neutral-400 transition-colors hover:text-white'
          >
            <InstagramIcon />
          </a>
          <a
            href={whatsappLink()}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='WhatsApp'
            className='text-neutral-400 transition-colors hover:text-white'
          >
            <MessageCircle size={20} />
          </a>
        </div>

        <p className='text-[11px] text-neutral-600'>© DESDE ARRIBA</p>
      </div>
    </footer>
  );
}
