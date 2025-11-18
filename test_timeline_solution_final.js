// Prueba final para verificar la solución de eliminación de duplicados y ordenación cronológica
const fs = require('fs');

// Leer los archivos de constantes directamente como texto
const experienceContent = fs.readFileSync('./src/constants/experience.js', 'utf8');
const certificationsContent = fs.readFileSync('./src/constants/certifications.js', 'utf8');
const studiesContent = fs.readFileSync('./src/constants/studies.js', 'utf8');

// Extraer datos simulando lo que hace el componente
// Esta es una simplificación - en realidad tendríamos que usar eval() o un parser
// Pero para propósitos de prueba, vamos a crear manualmente los datos

// Datos simulados
const TIMELINE_EVENTS = [
  {
    id: 17,
    type: 'experience',
    title: 'Programador web',
    subtitle: 'Wunder control solutions',
    date: '9/2024 - 1/2025',
    description: 'Creé una aplicación responsiva de control de presencia con perfil, mensajería, comunicación con la base de datos mediante API, registros y edición usando HTML, CSS, JavaScript, REACT, PHP y SQL.',
    category: 'Experiencia Laboral'
  },
  {
    id: 18,
    type: 'experience',
    title: 'Programador FullStack',
    subtitle: 'Logroño diseño web',
    date: '7/2019 - 2/2021',
    description: 'Desarrollador Web FullStack, creación a medida con código nativo. Desarrollo en Angular y Firebase.',
    category: 'Experiencia Laboral'
  },
  {
    id: 19,
    type: 'experience',
    title: 'Atención al cliente',
    subtitle: 'Arsys',
    date: '3/2021 - 6/2021',
    description: 'Responder a las preguntas y ayudar a los usuarios con sus problemas en páginas web.',
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
    id: 2,
    type: 'education',
    title: 'Grado Medio en Sistemas Microinformáticos y Redes',
    subtitle: 'IES Comercio - Logroño',
    date: '2019-2021',
    description: 'Formación técnica en sistemas informáticos y redes, base fundamental para mi carrera en tecnología.',
    category: 'Grado'
  }
];

const CERTIFICATIONS = [
  {
    id: 1,
    title: 'Introducción al Desarrollo Web: HTML y CSS (1/2)',
    subtitle: 'Google Actívate',
    date: '2/2021',
    description: 'Formación en fundamentos desarrollo web con HTML y CSS, primera parte del curso de Google Actívate.',
    category: 'Certificación'
  },
  {
    id: 2,
    title: 'Introducción al Desarrollo Web: HTML y CSS (2/2)',
    subtitle: 'Google Actívate',
    date: '2/2021',
    description: 'Continuación del curso de desarrollo web con HTML y CSS, completando el programa de Google Actívate.',
    category: 'Certificación'
  }
];

const STUDIES = [
  {
    id: 1,
    title: 'Grado Superior en Desarrollo de Aplicaciones Web',
    subtitle: 'FPD Rioja - Logroño (a distancia)',
    date: '7/2022-6/2025',
    description: 'Formación técnica avanzada en desarrollo web y aplicaciones.',
    category: 'Grado'
  },
  {
    id: 2,
    title: 'Grado Medio en Sistemas Microinformáticos y Redes',
    subtitle: 'IES Comercio - Logroño',
    date: '7/2019-6/2021',
    description: 'Formación técnica en sistemas informáticos y redes, base fundamental para mi carrera en tecnología.',
    category: 'Grado'
  }
];

// Simular la lógica del componente Timeline actualizada
// Filtrar certificaciones visibles (asumimos todas visibles para esta prueba)
const visibleCertifications = CERTIFICATIONS;

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

// Función para normalizar fechas para la comparación de duplicados
const normalizeDateForDuplicateCheck = (dateStr) => {
  // Si es un rango como "7/2022-6/2025", extraer los años
  if (dateStr.includes('-') && dateStr.includes('/')) {
    const parts = dateStr.split('-');
    if (parts.length === 2) {
      const start = parts[0].split('/')[1]; // año inicio
      let end = parts[1];
      // Si el segundo elemento también tiene '/', extraer el año
      if (end.includes('/')) {
        end = end.split('/')[1];
      }
      // Asegurarse de que ambos sean años de 4 dígitos
      const startYear = start.padStart(4, '0');
      const endYear = end.padStart(4, '0');
      return `${startYear}-${endYear}`;
    }
  }
  // Si es un rango como "202-2025", mantenerlo tal cual
  else if (/^\d{4}-\d{4}$/.test(dateStr)) {
    return dateStr;
  }
  // Para otros formatos, mantenerlos tal cual
  return dateStr;
};

// Eliminar duplicados basados en el título y una fecha normalizada
const uniqueEvents = allEvents.filter((event, index, self) => {
  return index === self.findIndex(e => 
    e.title === event.title && normalizeDateForDuplicateCheck(e.date) === normalizeDateForDuplicateCheck(event.date)
  );
});

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
  
  // Si es solo año, lo convertimos a AAAA-01-01
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

// Verificar duplicados específicos
const originalTitles = allEvents.map(e => `${e.title}-${normalizeDateForDuplicateCheck(e.date)}`);
const uniqueTitles = uniqueEvents.map(e => `${e.title}-${normalizeDateForDuplicateCheck(e.date)}`);

console.log("\nVerificación de duplicados:");
console.log(`Duplicados encontrados: ${originalTitles.length - uniqueTitles.length}`);

// Buscar duplicados específicos
const duplicates = allEvents.filter((event, index, self) => {
  const normalizedDate = normalizeDateForDuplicateCheck(event.date);
  return index !== self.findIndex(e => e.title === event.title && normalizeDateForDuplicateCheck(e.date) === normalizedDate);
});

if (duplicates.length > 0) {
  console.log("Duplicados encontrados:");
  duplicates.forEach(d => {
    console.log(`- ${d.title} (${d.date})`);
  });
} else {
  console.log("No se encontraron duplicados.");
}

// Verificar específicamente los duplicados de estudios
console.log("\nVerificación específica de duplicados de estudios:");
const gradoSuperiorOriginal = allEvents.filter(e => e.title.includes("Grado Superior en Desarrollo de Aplicaciones Web"));
const gradoMedioOriginal = allEvents.filter(e => e.title.includes("Grado Medio en Sistemas Microinformáticos y Redes"));

console.log(`Grado Superior original: ${gradoSuperiorOriginal.length} veces`);
gradoSuperiorOriginal.forEach((g, i) => console.log(`  ${i+1}. ${g.date}`));

console.log(`Grado Medio original: ${gradoMedioOriginal.length} veces`);
gradoMedioOriginal.forEach((g, i) => console.log(`  ${i+1}. ${g.date}`));

const gradoSuperiorUnico = uniqueEvents.filter(e => e.title.includes("Grado Superior en Desarrollo de Aplicaciones Web"));
const gradoMedioUnico = uniqueEvents.filter(e => e.title.includes("Grado Medio en Sistemas Microinformáticos y Redes"));

console.log(`Grado Superior único: ${gradoSuperiorUnico.length} veces`);
gradoSuperiorUnico.forEach((g, i) => console.log(`  ${i+1}. ${g.date}`));

console.log(`Grado Medio único: ${gradoMedioUnico.length} veces`);
gradoMedioUnico.forEach((g, i) => console.log(`  ${i+1}. ${g.date}`));
