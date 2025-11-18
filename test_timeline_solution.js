// Prueba para verificar la solución de eliminación de duplicados y ordenación cronológica
const { TIMELINE_EVENTS } = require('./src/constants/experience');
const { CERTIFICATIONS, CERTIFICATES_TO_HIDE } = require('./src/constants/certifications');
const { STUDIES } = require('./src/constants/studies');

// Simular la lógica del componente Timeline actualizada
// Filtrar certificaciones visibles
const visibleCertifications = CERTIFICATIONS.filter(cert => !CERTIFICATES_TO_HIDE.includes(cert.title));

// Convertir estudios a formato de evento para el timeline
const studiesEvents = STUDIES.map(study => ({
  id: study.id,
  type: 'education',
  title: study.title,
  subtitle: study.subtitle,
  date: study.date,
  description: study.description,
  category: 'Estudio'
}));

// Convertir certificaciones a formato de evento para el timeline
const certificationEvents = visibleCertifications.map(cert => ({
  id: cert.id + 100, // Añadir offset para evitar conflictos de ID
  type: 'certification',
  title: cert.title,
  subtitle: cert.subtitle,
  date: cert.date,
  description: cert.description,
  category: 'Certificación'
}));

// Combinar todos los eventos
const allEvents = [
  ...TIMELINE_EVENTS, // Experiencias y estudios existentes
  ...studiesEvents,   // Estudios adicionales
  ...certificationEvents // Certificaciones
];

console.log(`Total de eventos antes de eliminar duplicados: ${allEvents.length}`);

// Eliminar duplicados basados en el título y la fecha
const uniqueEvents = allEvents.filter((event, index, self) =>
  index === self.findIndex(e => e.title === event.title && e.date === event.date)
);

console.log(`Total de eventos después de eliminar duplicados: ${uniqueEvents.length}`);

// Función para convertir fechas a un formato comparable
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
  
  // Si es solo año, lo convertimos a AAAA-01
 if (/^\d{4}$/.test(processedDateStr)) {
    return `${processedDateStr}-01-01`;
  }
  
  // Si no podemos parsear, devolvemos una fecha muy antigua para que aparezca al final
  return '1900-01-01';
};

// Ordenar eventos por fecha
const sortedEvents = uniqueEvents.sort((a, b) => {
  const dateA = getComparableDate(a.date);
  const dateB = getComparableDate(b.date);
  return new Date(dateA) - new Date(dateB);
});

console.log("\nEventos ordenados cronológicamente:");
console.log("=====================================");
sortedEvents.forEach(event => {
  console.log(`${getComparableDate(event.date)} - ${event.category}: ${event.title} (${event.date})`);
});

// Verificar si hay duplicados
const originalTitles = allEvents.map(e => `${e.title}-${e.date}`);
const uniqueTitles = uniqueEvents.map(e => `${e.title}-${e.date}`);

console.log("\nVerificación de duplicados:");
console.log(`Duplicados encontrados: ${originalTitles.length - uniqueTitles.length}`);

// Buscar duplicados específicos
const duplicates = allEvents.filter((event, index, self) => {
  return index !== self.findIndex(e => e.title === event.title && e.date === event.date);
});

if (duplicates.length > 0) {
  console.log("Duplicados encontrados:");
  duplicates.forEach(d => {
    console.log(`- ${d.title} (${d.date})`);
  });
} else {
  console.log("No se encontraron duplicados.");
}
