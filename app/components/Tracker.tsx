'use client';

import { useEffect } from 'react';

const ONCE_PER_SESSION = 'da_visit';

/**
 * Cuenta una visita por sesión, no por recarga. No renderiza nada y cualquier
 * fallo se ignora: la página no depende de esto.
 */
export default function Tracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(ONCE_PER_SESSION)) return;
      sessionStorage.setItem(ONCE_PER_SESSION, '1');
    } catch {
      // Modo privado o cookies bloqueadas: se cuenta igual.
    }

    fetch('/api/track', { method: 'POST', keepalive: true }).catch(() => {});
  }, []);

  return null;
}
