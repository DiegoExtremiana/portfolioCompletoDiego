import React from 'react';
import { STUDIES } from '../constants/studies';
import { getStartDate } from '../utils/dateUtils';

const Studies = () => {
  // Ordenar estudios por fecha de inicio (más antiguo a más nuevo)
  const sortedStudies = [...STUDIES].sort((a, b) => getStartDate(a.date) - getStartDate(b.date));

  return (
    <section className="py-10 px-4 sm:px-6 section-bg-light">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--text-primary)]">
          Estudios
        </h2>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-6 xs:gap-8">
          {sortedStudies.map((study) => (
            <div 
              key={study.id} 
              className="bg-[var(--card-bg)] rounded-xl shadow-lg p-4 xs:p-5 sm:p-6 border-gray-20 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300 min-h-[220px] xs:min-h-[240px] w-full max-w-full"
            >
              <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 mb-4">
                {study.subtitle.includes("IES Comercio") && (
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-600 rounded-lg p-1 sm:p-2">
                    <a href="https://iescomercio.com/" target="_blank" rel="noopener noreferrer">
                      <img src="/media/images/IEScomercio.png" alt="IES Comercio" className="h-8 sm:h-12 w-auto object-contain rounded" />
                    </a>
                  </div>
                )}
                {study.subtitle.includes("FPD Rioja") && (
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-600 rounded-lg p-1 sm:p-2">
                    <a href="https://fpdrioja.es/" target="_blank" rel="noopener noreferrer">
                      <img src="/media/images/FPDrioja.png" alt="FPD Rioja" className="h-8 sm:h-12 w-auto object-contain rounded" />
                    </a>
                  </div>
                )}
                <div className={`${study.subtitle.includes("IES Comercio") || study.subtitle.includes("FPD Rioja") ? "flex-1 min-w-0" : ""}`}>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 break-all xs:text-sm text-prevent-overflow">
                    {study.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-2 text-sm xs:text-xs sm:block text-prevent-overflow">
                    {study.subtitleLink ? (
                      <a 
                        href={study.subtitleLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                      >
                        {study.subtitle}
                      </a>
                    ) : (
                      study.subtitle
                    )}
                  </p>
                  <div className="hidden sm:flex items-center gap-2 mb-3 xs:gap-1">
                    <span className="px-2 py-1 bg-blue-600 text-white dark:bg-blue-60 dark:text-white rounded-full text-xs xs:text-[0.6rem] font-medium text-prevent-overflow">
                      {study.category}
                    </span>
                    <span className="text-[var(--text-secondary)] text-xs xs:text-[0.6rem] text-prevent-overflow">
                      {study.date}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] text-sm xs:text-xs sm:block text-prevent-overflow">
                {study.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Studies;
