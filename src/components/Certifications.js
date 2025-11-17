import React from 'react';

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: 'Introducción al Desarrollo Web: HTML y CSS (1/2)',
      subtitle: (
        <a 
          href="https://grow.google/intl/es/courses-and-tools/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          Google Actívate
        </a>
      ),
      date: '2/2021',
      description: 'Formación en fundamentos de desarrollo web con HTML y CSS, primera parte del curso de Google Actívate.',
      category: 'Certificación'
    },
    {
      id: 2,
      title: 'Introducción al Desarrollo Web: HTML y CSS (2/2)',
      subtitle: (
        <a 
          href="https://grow.google/intl/es/courses-and-tools/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          Google Actívate
        </a>
      ),
      date: '2/2021',
      description: 'Continuación del curso de desarrollo web con HTML y CSS, completando el programa de Google Actívate.',
      category: 'Certificación'
    },
    {
      id: 3,
      title: 'Desarrollo de Apps Móviles',
      subtitle: (
        <a 
          href="https://grow.google/intl/es/courses-and-tools/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          Google Actívate
        </a>
      ),
      date: '1/2021',
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

  // Definir los títulos de los certificados que deben ocultarse
  const certificatesToHide = [
    'Riesgo eléctrico',
    'Primeros auxilios',
    'Coordinación de actividades empresariales en construcción',
    'Prevención de riesgos laborales',
    'Manipulador de alimentos (Alto riesgo)',
    'Monitor de ocio y tiempo libre',
    'Uso y Manejo en Desfibrilación Externo Automatizada (DEA)',
    'Socorrista en Instalaciones Acuáticas (SIA)',
    'Monitor de Actividades Acuáticas (MAA)'
  ];

  // Filtrar los certificados para excluir los que deben ocultarse
  const visibleCertifications = certifications.filter(cert => !certificatesToHide.includes(cert.title));

  // Función para convertir la fecha a un objeto Date comparable
  const parseDate = (dateStr) => {
    // Formato "mes/año" como "2/2021"
    const monthYearRegex = /^(\d{1,2})\/(\d{4})$/;
    if (monthYearRegex.test(dateStr)) {
      const [month, year] = dateStr.split('/').map(Number);
      return new Date(year, month - 1); // Mes - 1 porque en JavaScript los meses van de 0 a 11
    }
    
    // Formato "mes año" como "nov. 2019", "feb. 2016", etc.
    const monthNames = {
      'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
      'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11,
      'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
      'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
    };
    
    const parts = dateStr.toLowerCase().replace('.', '').split(' ');
    if (parts.length === 2) {
      const [monthName, year] = parts;
      const month = monthNames[monthName];
      if (month !== undefined) {
        return new Date(parseInt(year), month);
      }
    }
    
    // Si no se puede parsear, devolver una fecha muy antigua para que aparezca al principio
    return new Date(0);
  };

  // Ordenar certificaciones por fecha (más antiguo a más nuevo)
  const sortedCertifications = [...visibleCertifications].sort((a, b) => parseDate(a.date) - parseDate(b.date));

  return (
    <section className="py-10 px-4 sm:px-6 section-bg-light">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Certificaciones
        </h2>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCertifications.map((cert) => (
            <div 
              key={cert.id} 
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 break-all xs:text-sm">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm xs:text-xs sm:block">
                    {cert.subtitle}
                  </p>
                  <div className="hidden sm:flex items-center gap-2 mb-3 xs:gap-1">
                    <span className="px-2 py-1 bg-purple-600 text-white dark:bg-purple-600 dark:text-white rounded-full text-xs xs:text-[0.6rem] font-medium">
                      {cert.category}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs xs:text-[0.6rem]">
                      {cert.date}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm xs:text-xs sm:block">
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
