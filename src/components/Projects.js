import React, { useState } from 'react';
import { FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import LanguageProgressBar from './LanguageProgressBar';
import { FINISHED_PROJECTS, DEVELOPING_PROJECTS, NON_FUNCTIONAL_PROJECTS } from '../constants/projects';

// Función para determinar la prioridad de una tecnología
const getTechPriority = (tech) => {
  const lowerTech = tech.toLowerCase();
  
  // 1. Cualquier typescript (Angular/React)
  if (lowerTech.includes('typescript') || lowerTech.includes('angular') || lowerTech.includes('react')) {
    return 1;
  }
  
  // 2. Vite
  if (lowerTech.includes('vite')) {
    return 2;
  }
  
  // 3. Lenguajes avanzados (JavaScript/PHP)
  if (lowerTech.includes('javascript') || lowerTech.includes('php')) {
    return 3;
  }
  
  // 4. HTML
  if (lowerTech.includes('html')) {
    return 4;
  }
  
  // 5. Estilos (CSS/Tailwind)
  if (lowerTech.includes('css') || lowerTech.includes('tailwind')) {
    return 5;
  }
  
  // Otros tecnologías tendrán una prioridad menor (más alta en número)
  return 6;
};

// Función para ordenar tecnologías según prioridad
const sortTechnologiesByPriority = (technologies) => {
  return [...technologies].sort((a, b) => {
    const priorityA = getTechPriority(a);
    const priorityB = getTechPriority(b);
    return priorityA - priorityB;
  });
};

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Función para filtrar proyectos según el término de búsqueda
  const filterProjects = (projects, term) => {
    if (!term.trim()) return projects;
    
    const lowerTerm = term.toLowerCase();
    return projects.filter(project => {
      // Buscar en el título del proyecto
      const matchesTitle = project.title.toLowerCase().includes(lowerTerm);
      // Buscar en las tecnologías del proyecto
      const matchesTechnology = project.technologies.some(tech => 
        tech.toLowerCase().includes(lowerTerm)
      );
      // Buscar en la descripción del proyecto
      const matchesDescription = project.description.toLowerCase().includes(lowerTerm);
      // Buscar en el tipo del proyecto
      const matchesType = project.type.toLowerCase().includes(lowerTerm);
      
      return matchesTitle || matchesTechnology || matchesDescription || matchesType;
    });
  };

  const filteredFinishedProjects = filterProjects(FINISHED_PROJECTS, searchTerm);
  const filteredDevelopingProjects = filterProjects(DEVELOPING_PROJECTS, searchTerm);
  const filteredNonFunctionalProjects = filterProjects(NON_FUNCTIONAL_PROJECTS, searchTerm);

  return (
    <section id="proyectos" className="py-20 px-4 sm:px-6 section-bg-dark">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 fade-in">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Proyectos</h2>
          <div className="relative ml-4 flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar proyectos por nombre o tecnología..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {/* Proyectos Finalizados */}
        <div className="mb-16">
          <h3 className="section-subtitle bg-emerald-500 dark:bg-emerald-700 inline-block px-6 py-2 rounded-full text-white dark:text-white">
            Finalizado
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredFinishedProjects.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{project.title}</h3>
                    <span className="tech-tag text-xs">
                      {project.type}
                    </span>
                  </div>
                  
                  <p className="text-[var(--text-secondary)] mb-6">{project.description}</p>
                  
                  {project.languagePercentages && project.languagePercentages.length > 0 && (
                    <LanguageProgressBar 
                      percentages={project.languagePercentages} 
                      technologies={sortTechnologiesByPriority(project.technologies)} 
                    />
                  )}
                  
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center w-full px-4 py-2"
                  >
                    Ver Proyecto
                    <FaExternalLinkAlt className="ml-2 text-xs" />
                  </a>
                </div>
              </div>
            ))}
            {searchTerm && filteredFinishedProjects.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                No se encontraron proyectos finalizados que coincidan con la búsqueda
              </div>
            )}
          </div>
        </div>
        
        {/* Proyectos en Desarrollo */}
        <div className="mb-16">
          <h3 className="section-subtitle bg-yellow-100 dark:bg-yellow-800 inline-block px-6 py-2 rounded-full text-gray-800 dark:text-white">
            En Desarrollo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDevelopingProjects.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{project.title}</h3>
                    <span className="tech-tag text-xs">
                      {project.type}
                    </span>
                  </div>
                  
                  <p className="text-[var(--text-secondary)] mb-6">{project.description}</p>
                  
                  {project.languagePercentages && project.languagePercentages.length > 0 && (
                    <LanguageProgressBar 
                      percentages={project.languagePercentages} 
                      technologies={sortTechnologiesByPriority(project.technologies)} 
                    />
                  )}
                  
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center w-full px-4 py-2"
                  >
                    Ver Proyecto
                    <FaExternalLinkAlt className="ml-2 text-xs" />
                  </a>
                </div>
              </div>
            ))}
            {searchTerm && filteredDevelopingProjects.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                No se encontraron proyectos en desarrollo que coincidan con la búsqueda
              </div>
            )}
          </div>
        </div>
        
        {/* Proyectos No Funcionales */}
        <div>
          <h3 className="section-subtitle bg-red-600 dark:bg-red-800 inline-block px-6 py-2 rounded-full text-white dark:text-white">
            No Funcional
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredNonFunctionalProjects.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-80 dark:text-white">{project.title}</h3>
                    <span className="tech-tag text-xs">
                      {project.type}
                    </span>
                  </div>
                  
                  <p className="text-[var(--text-secondary)] mb-6">{project.description}</p>
                  
                  {project.languagePercentages && project.languagePercentages.length > 0 && (
                    <LanguageProgressBar 
                      percentages={project.languagePercentages} 
                      technologies={sortTechnologiesByPriority(project.technologies)} 
                    />
                  )}
                  
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center justify-center w-full px-4 py-2"
                  >
                    Ver Proyecto
                    <FaExternalLinkAlt className="ml-2 text-xs" />
                  </a>
                </div>
              </div>
            ))}
            {searchTerm && filteredNonFunctionalProjects.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                No se encontraron proyectos no funcionales que coincidan con la búsqueda
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
