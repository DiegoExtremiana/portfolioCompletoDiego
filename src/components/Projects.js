import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import LanguageProgressBar from './LanguageProgressBar';

const Projects = () => {
  const finishedProjects = [
    {
      title: "3 en Raya",
      description: "Juego de 3 en Raya implementado con React",
      technologies: ["React", "Vite", "JavaScript", "CSS"],
      languagePercentages: [
        { language: "JavaScript", percentage: 58.3 },
        { language: "CSS", percentage: 38.9 },
        { language: "HTML", percentage: 2.8 }
      ],
      link: "https://trdextremiana.github.io/3enRaya/",
      type: "REACT"
    },
    {
      title: "Cronómetro",
      description: "Aplicación de cronómetro con funcionalidades de inicio, pausa y reinicio",
      technologies: ["JavaScript", "HTML", "CSS"],
      languagePercentages: [
        { language: "JavaScript", percentage: 51.2 },
        { language: "CSS", percentage: 31.0 },
        { language: "HTML", percentage: 17.8 }
      ],
      link: "https://trdextremiana.github.io/cuentaTiempo/",
      type: "JavaScript"
    },
    {
      title: "Lista de Tareas",
      description: "Aplicación de lista de tareas usando JQuery",
      technologies: ["JavaScript", "JQuery", "HTML", "CSS"],
      languagePercentages: [
        { language: "JavaScript", percentage: 48.1 },
        { language: "CSS", percentage: 38.2 },
        { language: "HTML", percentage: 13.7 }
      ],
      link: "https://trdextremiana.github.io/listaTareas_JQuery/",
      type: "JavaScript"
    },
    {
      title: "Pelea Pokémon",
      description: "Juego de pelea de Pokémon usando la API oficial de Pokémon",
      technologies: ["JavaScript", "API", "HTML", "CSS"],
      languagePercentages: [
        { language: "JavaScript", percentage: 76.6 },
        { language: "CSS", percentage: 16.8 },
        { language: "HTML", percentage: 6.6 }
      ],
      link: "https://trdextremiana.github.io/generar6pokemons/",
      type: "JavaScript"
    },
    {
      title: "Piedra, Papel, Tijera",
      description: "Juego de Piedra, Papel, Tijera con diferentes modos de juego",
      technologies: ["JavaScript", "HTML", "CSS"],
      languagePercentages: [
        { language: "CSS", percentage: 45.8 },
        { language: "JavaScript", percentage: 37.9 },
        { language: "HTML", percentage: 16.3 }
      ],
      link: "https://trdextremiana.github.io/piedraPapelTijera/",
      type: "JavaScript"
    }
  ];

  const developingProjects = [
    {
      title: "El Diegoncurso",
      description: "Proyecto en desarrollo de una plataforma orientada a los concursos",
      technologies: ["React", "JavaScript", "CSS"],
      languagePercentages: [],
      link: "https://www.diegoncurso.es/",
      type: "REACT"
    }
  ];

  const nonFunctionalProjects = [
    {
      title: "Black Jack",
      description: "Implementación del juego Black Jack en JavaScript vanilla",
      technologies: ["JavaScript", "HTML", "CSS"],
      languagePercentages: [
        { language: "JavaScript", percentage: 84.1 },
        { language: "CSS", percentage: 9.3 },
        { language: "HTML", percentage: 6.6 }
      ],
      link: "https://trdextremiana.github.io/BlackJack/",
      type: "JavaScript"
    }
 ];

  return (
    <section id="proyectos" className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Proyectos
        </h2>
        
        {/* Proyectos Finalizados */}
        <div className="mb-16">
                  <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white bg-green-100 dark:bg-green-800 inline-block px-6 py-2 rounded-full">
                    Finalizado
                  </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {finishedProjects.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{project.title}</h3>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                      {project.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {project.languagePercentages && project.languagePercentages.length > 0 && (
                    <LanguageProgressBar percentages={project.languagePercentages} />
                  )}
                  
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white bg-yellow-100 dark:bg-yellow-800 inline-block px-6 py-2 rounded-full">
            En Desarrollo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developingProjects.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{project.title}</h3>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                      {project.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white bg-red-100 dark:bg-red-800 inline-block px-6 py-2 rounded-full">
            No Funcional
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nonFunctionalProjects.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{project.title}</h3>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                      {project.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
