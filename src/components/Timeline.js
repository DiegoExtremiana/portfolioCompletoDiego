import React, { useState } from 'react';
import { TIMELINE_EVENTS } from '../constants/experience';
import { generateYears } from '../utils/dateUtils';

const Timeline = () => {
  // Generar años desde 2016 hasta el año actual
  const years = generateYears(2016);

  // Ordenar eventos por fecha
  const sortedEvents = [...TIMELINE_EVENTS].sort((a, b) => {
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

  const [hoveredYear, setHoveredYear] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = (year) => {
    // Limpiar cualquier timeout previo
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setHoveredYear(year);
  };

  const handleMouseLeave = () => {
    // Establecer un pequeño retraso antes de ocultar el año
    const id = setTimeout(() => {
      setHoveredYear(null);
    }, 300);
    setTimeoutId(id);
  };

  return (
    <section className="py-10 px-4 sm:px-6 section-bg-light">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 overflow-x-hidden"> {/* Añadido overflow-x-hidden para evitar desbordamiento */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Timeline
        </h2>
        
        <div className="relative">
          {/* Línea de tiempo horizontal */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-300 dark:bg-gray-600 transform -translate-y-1/2 z-0"></div>
          
          {/* Marcadores de años */}
          <div className="relative flex justify-between items-center h-32 overflow-x-auto pb-4">
            {years.map((year, index) => (
              <div 
                key={year}
                className="relative z-10 flex flex-col items-center flex-shrink-0 mx-4"
              >
                {/* Círculo del año */}
                <div className={`
                  w-6 h-6 rounded-full border-4 transition-all duration-300
                  bg-gray-50 border-gray-300
                  ${hoveredYear === year ? 'scale-125 ring-4 ring-opacity-50 ring-gray-500' : ''}
                `}
                onMouseEnter={() => handleMouseEnter(year)}
                onMouseLeave={handleMouseLeave}></div>
                
                {/* Línea vertical hacia abajo */}
                <div className="w-0.5 h-8 bg-gray-400 dark:bg-gray-500"></div>
                
                {/* Año */}
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 px-2 py-1 rounded mt-1">
                  {year}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Información de eventos del año al pasar el mouse */}
        {hoveredYear && (
          <div className="mt-8 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 transition-opacity duration-300">
            <h3 className="text-2xl font-bold text-gray-80 dark:text-white mb-4">Eventos en {hoveredYear}</h3>
            <div className="space-y-4">
              {sortedEvents
                .filter(event => {
                  // Verificar si el evento ocurrió en el año actualmente seleccionado
                  const eventDate = event.date;
                  if (eventDate.includes('-')) {
                    // Si es un rango de fechas como "2022-2025", comprobar si el año está dentro del rango
                    const [startYear, endYear] = eventDate.split('-').map(year => parseInt(year.trim().split('/').pop()));
                    return hoveredYear >= startYear && hoveredYear <= endYear;
                  } else {
                    // Si es una fecha única, comprobar si contiene el año
                    return eventDate.includes(hoveredYear.toString());
                  }
                })
                .map((event, index) => (
                  <div key={`${event.id}-${index}`} className="border-l-4 pl-4 py-2 ml-1"
                    style={{ 
                      borderLeftColor: event.type === 'education' ? '#3b82f6' : 
                                      event.type === 'experience' ? '#10b981' : '#8b5cf6'
                    }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                          {event.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-1">
                          {event.subtitle}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${event.type === 'education' ? 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white xs:text-[0.6rem] text-prevent-overflow' : 
                              event.type === 'experience' ? 'bg-green-100 text-green-800 dark:bg-green-90 dark:text-green-20' : 
                              'bg-purple-600 text-white dark:bg-purple-600 dark:text-white xs:text-[0.6rem] text-prevent-overflow'}
                          `}>
                            {event.category}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            {event.date}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              }
              {sortedEvents.filter(event => {
                // Verificar si el evento ocurrió en el año actualmente seleccionado
                const eventDate = event.date;
                if (eventDate.includes('-')) {
                  // Si es un rango de fechas como "2022-2025", comprobar si el año está dentro del rango
                  const [startYear, endYear] = eventDate.split('-').map(year => parseInt(year.trim().split('/').pop()));
                  return hoveredYear >= startYear && hoveredYear <= endYear;
                } else {
                  // Si es una fecha única, comprobar si contiene el año
                  return eventDate.includes(hoveredYear.toString());
                }
              }).length === 0 && (
                <p className="text-gray-600 dark:text-gray-400 italic">No hubo eventos registrados en este año.</p>
              )}
            </div>
          </div>
        )}
        
        {/* Leyenda */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-gray-700 dark:text-gray-300 text-sm">Certificaciones</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-gray-70 dark:text-gray-300 text-sm">Educación</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-gray-70 dark:text-gray-300 text-sm">Experiencia Laboral</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
