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
              className="bg-[var(--card-bg)] rounded-xl shadow-lg p-4 xs:p-5 sm:p-6 border-gray-20 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300 min-h-[220px] xs:min-h-[240px] w-full max-w-full"
            >
              <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 mb-4">
                {(exp.company === "Arsys" || exp.company === "Wunder control solutions") && (
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[rgb(74,85,98)] dark:bg-gray-600 rounded-lg p-1 sm:p-2">
                    {exp.company === "Arsys" ? (
                      <a href="https://www.arsys.es/" target="_blank" rel="noopener noreferrer">
                        <img src="/media/images/arsys.png" alt="Arsys" className="h-8 sm:h-12 w-auto object-contain rounded" />
                      </a>
                    ) : (
                      <a href="https://wundersolutions.es/" target="_blank" rel="noopener noreferrer">
                        <img src="/media/images/wunder.png" alt="Wunder control solutions" className="h-8 sm:h-12 w-auto object-contain rounded" />
                      </a>
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] break-all xs:text-sm text-prevent-overflow">{exp.position}{exp.note ? <span className="block text-sm crimson-red xs:text-xs text-prevent-overflow">{exp.note}</span> : null}</h3>
                      <span className="text-lg xs:text-base sm:block text-prevent-overflow mt-1 sm:mt-0">
                        {exp.url ? (
                          <a href={exp.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-prevent-overflow">
                            {exp.company}
                          </a>
                        ) : exp.company === "Arsys" ? (
                          <a href="https://www.arsys.es/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-prevent-overflow">
                            {exp.company}
                          </a>
                        ) : exp.company === "Wunder control solutions" ? (
                          <a href="https://wundersolutions.es/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-prevent-overflow">
                            {exp.company}
                          </a>
                        ) : (
                          <span className="text-prevent-overflow">{exp.company}</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-[var(--text-secondary)] mb-4 text-sm xs:text-xs sm:block text-prevent-overflow">{exp.description}</p>
              
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
              
              <p className="text-[var(--text-secondary)] text-sm xs:text-xs text-prevent-overflow">
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
