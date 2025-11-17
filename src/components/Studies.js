import React from 'react';

const Studies = () => {
  const studies = [
    {
      id: 1,
      title: 'Grado Superior en Desarrollo de Aplicaciones Web',
      subtitle: (
        <a 
          href="https://fpdrioja.es/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          FPD Rioja - Logroño (a distancia)
        </a>
      ),
      date: '2022-2025',
      description: 'Formación técnica avanzada en desarrollo web y aplicaciones.',
      category: 'Grado'
    },
    {
      id: 2,
      title: 'Grado Medio en Sistemas Microinformáticos y Redes',
      subtitle: (
        <a 
          href="https://iescomercio.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          IES Comercio - Logroño
        </a>
      ),
      date: '2019-2021',
      description: 'Formación técnica en sistemas informáticos y redes, base fundamental para mi carrera en tecnología.',
      category: 'Grado'
    }
  ];

  // Función para extraer el año de inicio de la fecha
  const getStartDate = (dateStr) => {
    const startYear = dateStr.split('-')[0];
    return parseInt(startYear);
  };

  // Ordenar estudios por fecha de inicio (más antiguo a más nuevo)
  const sortedStudies = [...studies].sort((a, b) => getStartDate(a.date) - getStartDate(b.date));

  return (
    <section className="py-10 px-4 sm:px-6 section-bg-light">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Estudios
        </h2>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-8">
          {sortedStudies.map((study) => (
            <div 
              key={study.id} 
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 break-all xs:text-sm text-prevent-overflow">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm xs:text-xs sm:block text-prevent-overflow">
                    {study.subtitle}
                  </p>
                  <div className="hidden sm:flex items-center gap-2 mb-3 xs:gap-1">
                    <span className="px-2 py-1 bg-blue-600 text-white dark:bg-blue-600 dark:text-white rounded-full text-xs xs:text-[0.6rem] font-medium text-prevent-overflow">
                      {study.category}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs xs:text-[0.6rem] text-prevent-overflow">
                      {study.date}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm xs:text-xs sm:block text-prevent-overflow">
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
