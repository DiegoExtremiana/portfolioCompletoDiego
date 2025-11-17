import React from 'react';
import { EXPERIENCES } from '../constants/experience';
import { getStartYear } from '../utils/dateUtils';

const Experience = () => {
  // Ordenar experiencias por año de inicio (más antiguo a más nuevo)
  const sortedExperiences = [...EXPERIENCES].sort((a, b) => getStartYear(a.period) - getStartYear(b.period));

   return (
    <section id="experiencia" className="py-10 px-4 sm:px-6 section-bg-light">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 fade-in">
        <h2 className="section-title">
          Experiencia
        </h2>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-6 xs:gap-8">
          {sortedExperiences.map((exp, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4 xs:p-5 sm:p-6 border-gray-20 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300 min-h-[220px] xs:min-h-[240px] w-full max-w-full"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
<h3 className="text-lg font-bold text-gray-800 dark:text-white break-all xs:text-sm text-prevent-overflow">{exp.position}{exp.note ? <span className="block text-sm crimson-red xs:text-xs text-prevent-overflow">{exp.note}</span> : null}</h3>
                <span className="text-lg text-blue-60 dark:text-blue-40 mt-2 md:mt-0 xs:text-base sm:block text-prevent-overflow">
                  {exp.url ? (
                    <a href={exp.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-prevent-overflow">
                      {exp.company}
                    </a>
                  ) : exp.company === "Arsys" ? (
                    <a href="https://www.arsys.es/" target="_blank" rel="noopener noreferrer" className="hover:underline text-prevent-overflow">
                      {exp.company}
                    </a>
                  ) : exp.company === "Wunder control solutions" ? (
                    <a href="https://wundersolutions.es/" target="_blank" rel="noopener noreferrer" className="hover:underline text-prevent-overflow">
                      {exp.company}
                    </a>
                  ) : (
                    <span className="text-prevent-overflow">{exp.company}</span>
                  )}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm xs:text-xs sm:block text-prevent-overflow">{exp.description}</p>
              
              <div className="hidden sm:flex flex-wrap gap-2 mb-4 xs:gap-1">
                {exp.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="tech-tag text-xs xs:text-[0.6rem] text-prevent-overflow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm xs:text-xs text-prevent-overflow">
                {exp.period}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
