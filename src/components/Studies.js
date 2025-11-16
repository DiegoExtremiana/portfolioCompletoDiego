import React from 'react';

const Studies = () => {
  const studies = [
    {
      id: 1,
      title: 'Grado Superior en Desarrollo de Aplicaciones Web',
      subtitle: 'FPD Rioja - Logroño (a distancia)',
      date: '2022-2025',
      description: 'Cursando Grado Superior en Desarrollo de Aplicaciones Web, formación técnica avanzada en desarrollo web y aplicaciones.',
      category: 'Grado'
    },
    {
      id: 2,
      title: 'Grado Medio en Sistemas Microinformáticos y Redes',
      subtitle: 'IES Comercio - Logroño',
      date: '2019-2021',
      description: 'Formación técnica en sistemas informáticos y redes, base fundamental para mi carrera en tecnología.',
      category: 'Grado'
    }
  ];

  return (
    <section className="py-10 px-6 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Estudios
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {studies.map((study) => (
            <div 
              key={study.id} 
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {study.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
                      {study.category}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {study.date}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
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
