export const WHATSAPP_NUMBER = '5493492680779';
export const WHATSAPP_DISPLAY = '+54 9 3492 680779';
export const INSTAGRAM_HANDLE = '_desdearriba_';
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
