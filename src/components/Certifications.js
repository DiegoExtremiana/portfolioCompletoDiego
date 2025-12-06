import React from 'react';
import { CERTIFICATIONS, CERTIFICATES_TO_HIDE } from '../constants/certifications';
import { parseDate } from '../utils/dateUtils';

const Certifications = () => {
  // Filtrar los certificados para excluir los que deben ocultarse
  const visibleCertifications = CERTIFICATIONS.filter(cert => !CERTIFICATES_TO_HIDE.includes(cert.title));

  // Ordenar certificaciones por fecha (más antiguo a más nuevo)
  const sortedCertifications = [...visibleCertifications].sort((a, b) => parseDate(a.date) - parseDate(b.date));

  return (
    <section className="py-10 px-4 sm:px-6 section-bg-light">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--text-primary)]">
          Certificaciones
        </h2>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
          {sortedCertifications.map((cert) => (
            <div 
              key={cert.id} 
              className="bg-[var(--certification-card-bg)] dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 mb-4">
                {(cert.title === 'Desarrollo de Apps Móviles' || 
                  cert.title === 'Introducción al Desarrollo Web: HTML y CSS (1/2)' || 
                  cert.title === 'Introducción al Desarrollo Web: HTML y CSS (2/2)') && (
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-10 dark:bg-gray-600 rounded-lg p-1 sm:p-2">
                    <a href="https://grow.google/intl/es/courses-and-tools/" target="_blank" rel="noopener noreferrer">
                      <img src="/media/images/google.png" alt="Google" className="h-8 sm:h-12 w-auto object-contain rounded" />
                    </a>
                  </div>
                )}
                <div className={`${(cert.title === 'Desarrollo de Apps Móviles' || 
                  cert.title === 'Introducción al Desarrollo Web: HTML y CSS (1/2)' || 
                  cert.title === 'Introducción al Desarrollo Web: HTML y CSS (2/2)') ? "flex-1 min-w-0" : ""}`}>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 break-all xs:text-sm text-prevent-overflow">
                    {cert.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-2 text-sm xs:text-xs sm:block text-prevent-overflow">
                    {cert.subtitleLink ? (
                      <a 
                        href={cert.subtitleLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                      >
                        {cert.subtitle}
                      </a>
                    ) : (
                      cert.subtitle
                    )}
                  </p>
                  <div className="hidden sm:flex items-center gap-2 mb-3 xs:gap-1">
                    <span className="px-2 py-1 bg-purple-600 text-white dark:bg-purple-600 dark:text-white rounded-full text-xs xs:text-[0.6rem] font-medium text-prevent-overflow">
                      {cert.category}
                    </span>
                    <span className="text-[var(--text-secondary)] text-xs xs:text-[0.6rem] text-prevent-overflow">
                      {cert.date}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] text-sm xs:text-xs sm:block text-prevent-overflow">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
