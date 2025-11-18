import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import LanguageProgressBar from './LanguageProgressBar';
import { FINISHED_PROJECTS, DEVELOPING_PROJECTS, NON_FUNCTIONAL_PROJECTS } from '../constants/projects';

const Projects = () => {

  return (
    <section id="proyectos" className="py-20 px-4 sm:px-6 section-bg-dark">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 fade-in">
        <h2 className="section-title">
          Proyectos
        </h2>
        
        {/* Proyectos Finalizados */}
        <div className="mb-16">
          <h3 className="section-subtitle bg-emerald-500 dark:bg-emerald-700 inline-block px-6 py-2 rounded-full text-white">
            Finalizado
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FINISHED_PROJECTS.map((project, index) => (
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
                      technologies={project.technologies} 
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
          </div>
        </div>
        
        {/* Proyectos en Desarrollo */}
        <div className="mb-16">
          <h3 className="section-subtitle bg-yellow-100 dark:bg-yellow-800 inline-block px-6 py-2 rounded-full">
            En Desarrollo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {DEVELOPING_PROJECTS.map((project, index) => (
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
                      technologies={project.technologies} 
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
          </div>
        </div>
        
        {/* Proyectos No Funcionales */}
        <div>
          <h3 className="section-subtitle bg-red-600 dark:bg-red-800 inline-block px-6 py-2 rounded-full text-white">
            No Funcional
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {NON_FUNCTIONAL_PROJECTS.map((project, index) => (
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
                      technologies={project.technologies} 
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
