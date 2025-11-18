// Datos de ejemplo para probar la ordenación cronológica (con los mismos datos que en el sistema)
const testEvents = [
  {
    id: 17,
    type: 'experience',
    title: 'Programador web',
    subtitle: 'Wunder control solutions',
    date: '9/2024 - 1/2025',
    description: 'Creé una aplicación responsiva de control de presencia...',
    category: 'Experiencia Laboral'
  },
  {
    id: 1,
    type: 'education',
    title: 'Grado Superior en Desarrollo de Aplicaciones Web',
    subtitle: 'FPD Rioja - Logroño (a distancia)',
    date: '2022-2025',
    description: 'Formación técnica avanzada en desarrollo web y aplicaciones.',
    category: 'Grado'
  },
  {
    id: 5,
    type: 'certification',
    title: 'Introducción al Desarrollo Web: HTML y CSS (1/2)',
    subtitle: 'Google Actívate',
    date: 'feb. 2021',
    description: 'Formación en fundamentos desarrollo web con HTML y CSS...',
    category: 'Certificación'
  },
  {
    id: 11,
    type: 'certification',
    title: 'Coordinación de actividades empresariales en construcción',
    subtitle: 'Gobierno de La Rioja',
    date: 'nov. 2015',
    description: 'Certificación en coordinación de actividades empresariales...',
    category: 'Certificación'
  },
 {
    id: 19,
    type: 'experience',
    title: 'Atención al cliente',
    subtitle: 'Arsys',
    date: '3/2021 - 6/2021',
    description: 'Responder a las preguntas y ayudar a los usuarios...',
    category: 'Experiencia Laboral'
  },
  {
    id: 10,
    type: 'certification',
    title: 'Primeros auxilios',
    subtitle: 'Cruz Roja Española',
    date: 'feb. 2016',
    description: 'Formación en técnicas de primeros auxilios...',
    category: 'Certificación'
  }
];

// Función para convertir fechas a un formato comparable (la versión final que se usará en el componente)
const getComparableDate = (dateStr) => {
  let processedDateStr = dateStr;
  
  // Si es un rango como "9/2024 - 1/2025", usamos la primera fecha
  if (processedDateStr.includes(' - ')) {
    processedDateStr = processedDateStr.split(' - ')[0];
  }
  // Si es un rango de años como "2022-2025", usamos el primer año
  else if (/^\d{4}-\d{4}$/.test(processedDateStr)) {
    const [startYear] = processedDateStr.split('-');
    return `${startYear}-01-01`;
  }
  
  // Si es un formato como "ene. 2021" o "feb. 2021", convertimos mes abreviado a número
  if (processedDateStr.includes('.')) {
    const months = {
      'ene.': '01', 'feb.': '02', 'mar.': '03', 'abr.': '04', 'may.': '05', 'jun.': '06',
      'jul.': '07', 'ago.': '08', 'sep.': '09', 'oct.': '10', 'nov.': '11', 'dic.': '12'
    };
    for (const [month, num] of Object.entries(months)) {
      if (processedDateStr.includes(month)) {
        // Reemplazar mes abreviado con número (por ejemplo, "feb. 2021" -> "02 2021")
        processedDateStr = processedDateStr.replace(month, num);
        // Ahora formatear como "mes/año" para el siguiente paso
        processedDateStr = processedDateStr.replace(/\s+/g, '/'); // Convertir espacios a '/'
        break;
      }
    }
  }
  
  // Si es formato "mes/año" o "número/año", convertimos a AAAA-MM-DD
  if (processedDateStr.includes('/')) {
    const [month, year] = processedDateStr.split('/');
    return `${year.padStart(4, '0')}-${month.padStart(2, '0')}-01`;
  }
  
  // Si es solo año, lo convertimos a AAAA-01-01
  if (/^\d{4}$/.test(processedDateStr)) {
    return `${processedDateStr}-01-01`;
  }
  
  // Si no podemos parsear, devolvemos una fecha muy antigua para que aparezca al final
  return '1900-01-01';
};

// Ordenar eventos por fecha
const sortedEvents = testEvents.sort((a, b) => {
  const dateA = getComparableDate(a.date);
  const dateB = getComparableDate(b.date);
  return new Date(dateA) - new Date(dateB);
});

console.log("Eventos ordenados cronológicamente:");
console.log("=====================================");
sortedEvents.forEach(event => {
  console.log(`${getComparableDate(event.date)} - ${event.category}: ${event.title} (${event.date})`);
});

console.log("\nVerificación de ordenación correcta:");
console.log("1. Coordinación de actividades empresariales en construcción (nov. 2015) - 2015-11-01");
console.log("2. Primeros auxilios (feb. 2016) - 2016-02-01");
console.log("3. Introducción al Desarrollo Web: HTML y CSS (1/2) (feb. 2021) - 2021-02-01");
console.log("4. Atención al cliente (3/2021 - 6/2021) - 2021-03-01");
console.log("5. Grado Superior en Desarrollo de Aplicaciones Web (202-2025) - 2022-01-01");
console.log("6. Programador web (9/2024 - 1/2025) - 2024-09-01");
