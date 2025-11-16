import React, { useState } from 'react';

const Timeline = () => {
  // Datos combinados de experiencia y educación
  const timelineEvents = [
    // Educación: Grados Oficiales
    {
      id: 1,
      type: 'education',
      title: 'Grado Superior en Desarrollo de Aplicaciones Web',
      subtitle: 'FPD Rioja - Logroño (a distancia)',
      date: '2022-2025',
      description: 'Cursando Grado Superior en Desarrollo de Aplicaciones Web, formación técnica avanzada en desarrollo web y aplicaciones.',
      category: 'Grado Oficial'
    },
    {
      id: 2,
      type: 'education',
      title: 'Grado Medio en Sistemas Microinformáticos y Redes',
      subtitle: 'IES Comercio - Logroño',
      date: '2019-2021',
      description: 'Formación técnica en sistemas informáticos y redes, base fundamental para mi carrera en tecnología.',
      category: 'Grado Oficial'
    },
    // Experiencia Laboral
    {
      id: 3,
      type: 'experience',
      title: 'Programador web',
      subtitle: 'Wunder control solutions',
      date: '9/2024 - 1/2025',
      description: 'Creé una aplicación responsiva de control de presencia con perfil, mensajería, comunicación con la base de datos mediante API, registros y edición usando HTML, CSS, JavaScript, REACT, PHP y SQL.',
      category: 'Experiencia Laboral'
    },
    {
      id: 4,
      type: 'experience',
      title: 'Atención al cliente',
      subtitle: 'Arsys',
      date: '3/2021 - 6/2021',
      description: 'Atención a usuarios y resolución de problemas técnicos relacionados con páginas web y servicios.',
      category: 'Experiencia Laboral'
    },
    // Cursos y Certificaciones
    {
      id: 5,
      type: 'certification',
      title: 'Introducción al Desarrollo Web: HTML y CSS (1/2)',
      subtitle: 'Google Actívate',
      date: 'feb. 2021',
      description: 'Formación en fundamentos de desarrollo web con HTML y CSS, primera parte del curso de Google Actívate.',
      category: 'Certificación'
    },
    {
      id: 6,
      type: 'certification',
      title: 'Introducción al Desarrollo Web: HTML y CSS (2/2)',
      subtitle: 'Google Actívate',
      date: 'feb. 2021',
      description: 'Continuación del curso de desarrollo web con HTML y CSS, completando el programa de Google Actívate.',
      category: 'Certificación'
    },
    {
      id: 7,
      type: 'certification',
      title: 'Desarrollo de Apps Móviles',
      subtitle: 'Google Actívate',
      date: 'ene. 2021',
      description: 'Formación en desarrollo de aplicaciones móviles, conceptos básicos y herramientas para creación de apps.',
      category: 'Certificación'
    },
    {
      id: 8,
      type: 'certification',
      title: 'Monitor de Actividades Acuáticas (MAA)',
      subtitle: 'GLOBAL AUTOPROTECT AND PROJECTS SL',
      date: 'nov. 2019',
      description: 'Certificación como monitor de actividades acuáticas, incluyendo técnicas de enseñanza y seguridad.',
      category: 'Certificación'
    },
    {
      id: 9,
      type: 'certification',
      title: 'Socorrista en Instalaciones Acuáticas (SIA)',
      subtitle: 'GLOBAL AUTOPROTECT AND PROJECTS SL',
      date: 'sept. 2019',
      description: 'Certificación como socorrista en instalaciones acuáticas, técnicas de rescate y primeros auxilios.',
      category: 'Certificación'
    },
    {
      id: 10,
      type: 'certification',
      title: 'Uso y Manejo en Desfibrilación Externo Automatizada (DEA)',
      subtitle: 'GLOBAL AUTOPROTECT AND PROJECTS SL',
      date: 'sept. 2019',
      description: 'Certificación en uso y manejo de desfibriladores externos automatizados (DEA).',
      category: 'Certificación'
    },
    {
      id: 11,
      type: 'certification',
      title: 'Monitor de ocio y tiempo libre',
      subtitle: 'Alarca',
      date: 'sept. 2017',
      description: 'Certificación como monitor de actividades de ocio y tiempo libre.',
      category: 'Certificación'
    },
    {
      id: 12,
      type: 'certification',
      title: 'Manipulador de alimentos (Alto riesgo)',
      subtitle: 'Tecnas S.A BIC',
      date: 'sept. 2017',
      description: 'Certificación en manipulación de alimentos de alto riesgo, normas de higiene y seguridad.',
      category: 'Certificación'
    },
    {
      id: 13,
      type: 'certification',
      title: 'Prevención de riesgos laborales',
      subtitle: 'Gobierno de La Rioja',
      date: 'jun. 2016',
      description: 'Formación en prevención de riesgos laborales, normativa y prácticas de seguridad.',
      category: 'Certificación'
    },
    {
      id: 14,
      type: 'certification',
      title: 'Primeros auxilios',
      subtitle: 'Cruz Roja Española',
      date: 'feb. 2016',
      description: 'Formación en técnicas de primeros auxilios, atención de emergencias y soporte vital básico.',
      category: 'Certificación'
    },
    {
      id: 15,
      type: 'certification',
      title: 'Coordinación de actividades empresariales en construcción',
      subtitle: 'Gobierno de La Rioja',
      date: 'nov. 2015',
      description: 'Certificación en coordinación de actividades empresariales en el sector de la construcción.',
      category: 'Certificación'
    },
    {
      id: 16,
      type: 'certification',
      title: 'Riesgo eléctrico',
      subtitle: 'Gobierno de La Rioja',
      date: 'oct. 2015',
      description: 'Formación específica en prevención de riesgos eléctricos en el entorno laboral.',
      category: 'Certificación'
    }
  ];

  // Ordenar eventos por fecha
  const sortedEvents = [...timelineEvents].sort((a, b) => {
    // Para fechas con formato "mes/año" o "año", intentamos convertirlas a formato comparable
    const getComparableDate = (dateStr) => {
      // Si es un rango como "9/2024 - 1/2025", usamos la primera fecha
      if (dateStr.includes(' - ')) {
        dateStr = dateStr.split(' - ')[0];
      }
      
      // Si es un formato como "ene. 2021" o "feb. 2021", convertimos mes abreviado a número
      if (dateStr.includes('.')) {
        const months = {
          'ene.': '01', 'feb.': '02', 'mar.': '03', 'abr.': '04', 'may.': '05', 'jun.': '06',
          'jul.': '07', 'ago.': '08', 'sep.': '09', 'oct.': '10', 'nov.': '11', 'dic.': '12'
        };
        for (const [month, num] of Object.entries(months)) {
          if (dateStr.includes(month)) {
            dateStr = dateStr.replace(month, num);
            break;
          }
        }
      }
      
      // Si es formato "mes/año" o "número/año", convertimos a AAAA-MM-DD
      if (dateStr.includes('/')) {
        const [month, year] = dateStr.split('/');
        return `${year.padStart(4, '0')}-${month.padStart(2, '0')}-01`;
      }
      
      // Si es solo año, lo convertimos a AAAA-01-01
      if (/^\d{4}$/.test(dateStr)) {
        return `${dateStr}-01-01`;
      }
      
      // Si no podemos parsear, devolvemos una fecha muy antigua para que aparezca al final
      return '1900-01';
    };
    
    return new Date(getComparableDate(a.date)) - new Date(getComparableDate(b.date));
  });

  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = (event) => {
    // Limpiar cualquier timeout previo
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setHoveredEvent(event);
  };

  const handleMouseLeave = () => {
    // Establecer un pequeño retraso antes de ocultar el evento
    const id = setTimeout(() => {
      setHoveredEvent(null);
    }, 300);
    setTimeoutId(id);
  };

  return (
    <section className="py-10 px-6 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Timeline
        </h2>
        
        <div className="relative">
          {/* Línea de tiempo horizontal */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-300 dark:bg-gray-600 transform -translate-y-1/2 z-0"></div>
          
          {/* Marcadores de eventos */}
          <div className="relative flex justify-between items-center h-32">
            {sortedEvents.map((event, index) => (
              <div 
                key={event.id}
                className="relative z-10 flex flex-col items-center"
                onMouseEnter={() => handleMouseEnter(event)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Círculo del evento */}
                <div className={`
                  w-6 h-6 rounded-full border-4 transition-all duration-300
                  ${event.type === 'education' ? 'bg-blue-500 border-blue-300' : 
                    event.type === 'experience' ? 'bg-green-500 border-green-300' : 
                    'bg-purple-500 border-purple-300'}
                  ${hoveredEvent?.id === event.id ? 'scale-125 ring-4 ring-opacity-50 ' + 
                    (event.type === 'education' ? 'ring-blue-500' : 
                     event.type === 'experience' ? 'ring-green-500' : 
                     'ring-purple-500') : ''}
                `}></div>
                
                {/* Línea vertical hacia abajo */}
                <div className="w-0.5 h-8 bg-gray-400 dark:bg-gray-500"></div>
                
                {/* Fecha */}
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 px-2 py-1 rounded mt-1 rotate-[-45deg] origin-center">
                  {event.date}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Información del evento al pasar el mouse */}
        {hoveredEvent && (
          <div className="mt-8 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 transition-opacity duration-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {hoveredEvent.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {hoveredEvent.subtitle}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${hoveredEvent.type === 'education' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-20' : 
                      hoveredEvent.type === 'experience' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-20' : 
                      'bg-purple-100 text-purple-800 dark:bg-purple-90 dark:text-purple-200'}
                  `}>
                    {hoveredEvent.category}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {hoveredEvent.date}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {hoveredEvent.description}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Leyenda */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300 text-sm">Educación</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-gray-70 dark:text-gray-300 text-sm">Experiencia Laboral</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300 text-sm">Certificaciones</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
