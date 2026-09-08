'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <a
          href='https://wa.me/5493492680779?text=Hola%20Desde%20Arriba,%20quisiera%20consultar%20por%20una%20filmaci%C3%B3n%20con%20drone'
          className='fixed bottom-8 right-8 z-40 group transition-all duration-300'
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Tooltip */}
          {showTooltip && (
            <div className='absolute bottom-full right-0 mb-3 bg-white text-black px-3 py-2 rounded text-xs font-bold whitespace-nowrap animate-fade-in'>
              Consultar por WhatsApp
            </div>
          )}

          {/* Button */}
          <div className='bg-white text-black p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center'>
            <MessageCircle size={24} />
          </div>
        </a>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        :global(.animate-fade-in) {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
