'use client';

import { useState } from 'react';
import Image from 'next/image';
import { projects } from '@/app/data/projects';
import { X } from 'lucide-react';

type Category = 'all' | 'events' | 'architecture' | 'realestate' | 'fields' | 'social';

interface SelectedProject {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video?: string;
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);

  const categories = [
    { value: 'all' as const, label: 'TODOS' },
    { value: 'events' as const, label: 'EVENTOS' },
    { value: 'architecture' as const, label: 'ARQUITECTURA' },
    { value: 'realestate' as const, label: 'INMOBILIARIO' },
    { value: 'fields' as const, label: 'CAMPO' },
    { value: 'social' as const, label: 'REDES' },
  ];

  const filteredProjects =
    activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id='portfolio' className='bg-black py-20 sm:py-32 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight text-center'>
          TRABAJOS DESDE ARRIBA
        </h2>

        {/* Filters */}
        <div className='flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 sm:mb-16'>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-bold text-xs sm:text-sm tracking-wide transition-all ${
                activeCategory === cat.value
                  ? 'bg-white text-black'
                  : 'border border-gray-700 text-gray-300 hover:border-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className='group cursor-pointer overflow-hidden bg-gray-900'
              onClick={() =>
                setSelectedProject({
                  id: project.id,
                  title: project.title,
                  description: project.description,
                  thumbnail: project.thumbnail,
                  video: project.video,
                })
              }
            >
              <div className='relative w-full h-64 sm:h-72 overflow-hidden'>
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center'>
                  <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <p className='text-white font-bold text-sm'>VER PROYECTO</p>
                  </div>
                </div>
              </div>
              <div className='p-4 sm:p-6 bg-gray-900'>
                <h3 className='text-lg sm:text-xl font-black text-white tracking-wide'>
                  {project.title}
                </h3>
                <p className='text-gray-400 text-xs sm:text-sm mt-2'>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className='fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4'>
          <div className='relative max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
            <button
              onClick={() => setSelectedProject(null)}
              className='absolute top-4 right-4 z-10 bg-white hover:bg-gray-200 p-2 transition-colors'
            >
              <X size={24} className='text-black' />
            </button>

            <div className='bg-gray-900 p-6 sm:p-8'>
              {selectedProject.video ? (
                <video
                  controls
                  className='w-full h-auto mb-6'
                  poster={selectedProject.thumbnail}
                >
                  <source src={selectedProject.video} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  width={800}
                  height={600}
                  className='w-full h-auto mb-6 object-cover'
                />
              )}
              <h2 className='text-3xl sm:text-4xl font-black text-white mb-4 tracking-wide'>
                {selectedProject.title}
              </h2>
              <p className='text-gray-300 text-base sm:text-lg leading-relaxed'>
                {selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
