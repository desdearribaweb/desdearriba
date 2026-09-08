export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export const services: Service[] = [
  {
    id: 'events',
    title: 'EVENTOS',
    description:
      'Tomas aéreas para eventos sociales, institucionales, deportivos y producciones especiales.',
    image: '/images/services/events-placeholder.jpg',
  },
  {
    id: 'architecture',
    title: 'ARQUITECTURA',
    description:
      'Mostrá obras, edificios y proyectos desde una perspectiva que permite entender su escala y diseño.',
    image: '/images/services/architecture-placeholder.jpg',
  },
  {
    id: 'real-estate',
    title: 'INMOBILIARIO',
    description:
      'Contenido audiovisual pensado para potenciar publicaciones de casas, terrenos, desarrollos y propiedades.',
    image: '/images/services/realestate-placeholder.jpg',
  },
  {
    id: 'fields',
    title: 'CAMPOS',
    description:
      'Fotografía y filmación aérea para establecimientos rurales, terrenos, producciones y proyectos agropecuarios.',
    image: '/images/services/fields-placeholder.jpg',
  },
  {
    id: 'corporate',
    title: 'EMPRESAS Y OBRAS',
    description:
      'Seguimiento de obras, instalaciones, industrias, emprendimientos y contenido corporativo.',
    image: '/images/services/corporate-placeholder.jpg',
  },
  {
    id: 'social-media',
    title: 'CONTENIDO PARA REDES',
    description:
      'Videos verticales pensados especialmente para Reels, Stories y plataformas sociales.',
    image: '/images/services/social-placeholder.jpg',
  },
  {
    id: 'editing',
    title: 'EDICIÓN DE VIDEO',
    description:
      'Transformamos las tomas en una pieza audiovisual terminada, lista para publicar.',
    image: '/images/services/editing-placeholder.jpg',
  },
];
