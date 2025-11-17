// Funciones de utilidad para manejar fechas

// Función para extraer el año de inicio del periodo
export const getStartYear = (period) => {
  // Extraer el año de inicio del periodo (antes del guión)
 const match = period.match(/\d{1,2}\/(\d{4})/);
  return match ? parseInt(match[1]) : 0;
};

// Función para convertir la fecha a un objeto Date comparable
export const parseDate = (dateStr) => {
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

// Función para extraer el año de inicio de la fecha
export const getStartDate = (dateStr) => {
 const startYear = dateStr.split('-')[0];
  return parseInt(startYear);
};

// Función para obtener el año actual
export const getCurrentYear = () => {
  return new Date().getFullYear();
};

// Función para generar años desde un año inicial hasta el año actual
export const generateYears = (startYear) => {
 const currentYear = getCurrentYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
 }
  return years;
};
