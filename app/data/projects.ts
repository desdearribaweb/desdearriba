export interface Project {
  id: string;
  title: string;
  category: 'events' | 'architecture' | 'realestate' | 'fields' | 'social';
  thumbnail: string;
  image?: string;
  video?: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Proyecto de referencia 1',
    category: 'events',
    thumbnail: '/images/projects/project-1-placeholder.jpg',
    description: 'Evento corporativo grabado desde perspectiva aérea',
  },
  {
    id: 'project-2',
    title: 'Proyecto de referencia 2',
    category: 'architecture',
    thumbnail: '/images/projects/project-2-placeholder.jpg',
    description: 'Obra arquitectónica documentada en 4K',
  },
  {
    id: 'project-3',
    title: 'Proyecto de referencia 3',
    category: 'realestate',
    thumbnail: '/images/projects/project-3-placeholder.jpg',
    description: 'Propiedad inmobiliaria filmada aéreamente',
  },
  {
    id: 'project-4',
    title: 'Proyecto de referencia 4',
    category: 'fields',
    thumbnail: '/images/projects/project-4-placeholder.jpg',
    description: 'Establecimiento rural documentado',
  },
  {
    id: 'project-5',
    title: 'Proyecto de referencia 5',
    category: 'social',
    thumbnail: '/images/projects/project-5-placeholder.jpg',
    description: 'Contenido vertical para redes sociales',
  },
  {
    id: 'project-6',
    title: 'Proyecto de referencia 6',
    category: 'events',
    thumbnail: '/images/projects/project-6-placeholder.jpg',
    description: 'Cobertura aérea de evento especial',
  },
];
