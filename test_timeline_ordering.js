// Datos de ejemplo para probar la ordenación cronológica
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

// Función para convertir fechas a un formato comparable
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
  return '1900-01-01';
};

// Ordenar eventos por fecha
const sortedEvents = testEvents.sort((a, b) => {
  return new Date(getComparableDate(a.date)) - new Date(getComparableDate(b.date));
});

console.log("Eventos ordenados cronológicamente:");
console.log("=====================================");
sortedEvents.forEach(event => {
  console.log(`${getComparableDate(event.date)} - ${event.category}: ${event.title} (${event.date})`);
});
