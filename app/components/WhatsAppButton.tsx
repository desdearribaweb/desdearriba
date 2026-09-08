'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/app/lib/contact';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsappLink('Hola Desde Arriba, quisiera consultar por una filmación con drone.')}
      target='_blank'
      rel='noopener noreferrer'
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-5 right-5 z-40 flex items-center gap-0 overflow-hidden rounded-full border border-white/20 bg-white text-black shadow-lg transition-all duration-300 sm:bottom-8 sm:right-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span className='flex items-center justify-center p-4'>
        <MessageCircle size={22} />
      </span>
      <span className='max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-[220px] group-hover:pr-5 group-focus-visible:max-w-[220px] group-focus-visible:pr-5'>
        Consultar por WhatsApp
      </span>
    </a>
  );
}
