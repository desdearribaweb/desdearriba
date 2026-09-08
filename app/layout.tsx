import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://desdearriba.com'),
  title: 'Desde Arriba | Fotografía y Filmación Aérea con Drone',
  description:
    'Fotografía y filmación aérea profesional en 4K para eventos, arquitectura, inmobiliarias, campos, empresas y producciones audiovisuales. Drone DJI Mini 4 Pro.',
  keywords: [
    'fotografía aérea',
    'filmación con drone',
    'video aéreo 4K',
    'DJI Mini 4 Pro',
    'producción audiovisual',
    'fotografía de eventos',
    'arquitectura aérea',
    'contenido para redes sociales',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://desdearriba.com',
    siteName: 'Desde Arriba',
    title: 'Desde Arriba | Fotografía y Filmación Aérea con Drone',
    description:
      'Fotografía y filmación aérea profesional en 4K para eventos, arquitectura, inmobiliarias, campos, empresas y producciones audiovisuales.',
    images: [
      {
        url: 'https://desdearriba.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Desde Arriba - Fotografía Aérea',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desde Arriba | Fotografía y Filmación Aérea con Drone',
    description: 'Fotografía y filmación aérea profesional en 4K.',
    images: ['https://desdearriba.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='es' className={`${manrope.variable} h-full scroll-smooth`}>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />
        <meta name='theme-color' content='#000000' />
        <link rel='canonical' href='https://desdearriba.com' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      </head>
      <body className='min-h-full flex flex-col bg-black text-white antialiased'>{children}</body>
    </html>
  );
}
