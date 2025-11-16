import React from 'react';

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: 'Introducción al Desarrollo Web: HTML y CSS (1/2)',
      subtitle: 'Google Actívate',
      date: 'feb. 2021',
      description: 'Formación en fundamentos de desarrollo web con HTML y CSS, primera parte del curso de Google Actívate.',
      category: 'Certificación'
    },
    {
      id: 2,
      title: 'Introducción al Desarrollo Web: HTML y CSS (2/2)',
      subtitle: 'Google Actívate',
      date: 'feb. 2021',
      description: 'Continuación del curso de desarrollo web con HTML y CSS, completando el programa de Google Actívate.',
      category: 'Certificación'
    },
    {
      id: 3,
      title: 'Desarrollo de Apps Móviles',
      subtitle: 'Google Actívate',
      date: 'ene. 2021',
      description: 'Formación en desarrollo de aplicaciones móviles, conceptos básicos y herramientas para creación de apps.',
      category: 'Certificación'
    },
    {
      id: 4,
      title: 'Monitor de Actividades Acuáticas (MAA)',
      subtitle: 'GLOBAL AUTOPROTECT AND PROJECTS SL',
      date: 'nov. 2019',
      description: 'Certificación como monitor de actividades acuáticas, incluyendo técnicas de enseñanza y seguridad.',
      category: 'Certificación'
    },
    {
      id: 5,
      title: 'Socorrista en Instalaciones Acuáticas (SIA)',
      subtitle: 'GLOBAL AUTOPROTECT AND PROJECTS SL',
      date: 'sept. 2019',
      description: 'Certificación como socorrista en instalaciones acuáticas, técnicas de rescate y primeros auxilios.',
      category: 'Certificación'
    },
    {
      id: 6,
      title: 'Uso y Manejo en Desfibrilación Externo Automatizada (DEA)',
      subtitle: 'GLOBAL AUTOPROTECT AND PROJECTS SL',
      date: 'sept. 2019',
      description: 'Certificación en uso y manejo de desfibriladores externos automatizados (DEA).',
      category: 'Certificación'
    },
    {
      id: 7,
      title: 'Monitor de ocio y tiempo libre',
      subtitle: 'Alarca',
      date: 'sept. 2017',
      description: 'Certificación como monitor de actividades de ocio y tiempo libre.',
      category: 'Certificación'
    },
    {
      id: 8,
      title: 'Manipulador de alimentos (Alto riesgo)',
      subtitle: 'Tecnas S.A BIC',
      date: 'sept. 2017',
      description: 'Certificación en manipulación de alimentos de alto riesgo, normas de higiene y seguridad.',
      category: 'Certificación'
    },
    {
      id: 9,
      title: 'Prevención de riesgos laborales',
      subtitle: 'Gobierno de La Rioja',
      date: 'jun. 2016',
      description: 'Formación en prevención de riesgos laborales, normativa y prácticas de seguridad.',
      category: 'Certificación'
    },
    {
      id: 10,
      title: 'Primeros auxilios',
      subtitle: 'Cruz Roja Española',
      date: 'feb. 2016',
      description: 'Formación en técnicas de primeros auxilios, atención de emergencias y soporte vital básico.',
      category: 'Certificación'
    },
    {
      id: 11,
      title: 'Coordinación de actividades empresariales en construcción',
      subtitle: 'Gobierno de La Rioja',
      date: 'nov. 2015',
      description: 'Certificación en coordinación de actividades empresariales en el sector de la construcción.',
      category: 'Certificación'
    },
    {
      id: 12,
      title: 'Riesgo eléctrico',
      subtitle: 'Gobierno de La Rioja',
      date: 'oct. 2015',
      description: 'Formación específica en prevención de riesgos eléctricos en el entorno laboral.',
      category: 'Certificación'
    }
 ];

  return (
    <section className="py-10 px-4 sm:px-6 section-bg-light">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Certificaciones
        </h2>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div 
              key={cert.id} 
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 break-words">
                    {cert.title}
                  </h3>
                  <p className="hidden sm:block text-gray-600 dark:text-gray-300 mb-2 text-sm">
                    {cert.subtitle}
                  </p>
                  <div className="hidden sm:flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs font-medium">
                      {cert.category}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {cert.date}
                    </span>
                  </div>
                </div>
              </div>
              <p className="hidden sm:block text-gray-700 dark:text-gray-300 text-sm">
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
