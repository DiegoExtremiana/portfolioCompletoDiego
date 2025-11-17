import React from 'react';

const Experience = () => {
  const experiences = [
    {
      position: "Programador web FullStack",
      company: "Wunder control solutions",
      period: "9/2024 - 1/2025",
      description: "Creé una aplicación responsiva de control de presencia con perfil, mensajería, comunicación con la base de datos mediante API, registros y edición usando HTML, CSS, JavaScript, REACT, PHP y SQL.",
      technologies: ["HTML", "CSS", "JavaScript", "REACT", "PHP", "SQL", "API"]
    },
    {
      position: "Programador web FullStack",
      company: "Logroño diseño web",
      period: "1/2019 - 2/2021",
      description: "Desarrollador Web FullStack, creación a medida con código nativo. Desarrollo en Angular y Firebase. (www.logroñodiseñoweb.es)",
      technologies: ["HTML", "CSS", "JavaScript", "Angular", "PHP", "SQL", "API"],
      url: "http://www.xn--logroodiseoweb-unbf.es/",
      note: "(página web obsoleta)"
    },
    {
      position: "Atención al cliente",
      company: "Arsys",
      period: "3/2021 - 6/2021",
      description: "Responder a las preguntas y ayudar a los usuarios con sus problemas en páginas web.",
      technologies: ["Atención al cliente", "Soporte técnico", "Resolución de problemas"]
    }
  ];

  // Función para extraer el año de inicio del periodo
  const getStartYear = (period) => {
    // Extraer el año de inicio del periodo (antes del guión)
    const match = period.match(/\d{1,2}\/(\d{4})/);
    return match ? parseInt(match[1]) : 0;
  };

  // Ordenar experiencias por año de inicio (más antiguo a más nuevo)
  const sortedExperiences = [...experiences].sort((a, b) => getStartYear(a.period) - getStartYear(b.period));

   return (
    <section id="experiencia" className="py-10 px-4 sm:px-6 section-bg-light">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 fade-in">
        <h2 className="section-title">
          Experiencia
        </h2>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-8">
          {sortedExperiences.map((exp, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
<h3 className="text-lg font-bold text-gray-800 dark:text-white break-all xs:text-sm">{exp.position}{exp.note ? <span className="block text-sm crimson-red xs:text-xs">{exp.note}</span> : null}</h3>
                <span className="text-lg text-blue-60 dark:text-blue-40 mt-2 md:mt-0 xs:text-base sm:block">
                  {exp.url ? (
                    <a href={exp.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {exp.company}
                    </a>
                  ) : exp.company === "Arsys" ? (
                    <a href="https://www.arsys.es/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {exp.company}
                    </a>
                  ) : exp.company === "Wunder control solutions" ? (
                    <a href="https://wundersolutions.es/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm xs:text-xs sm:block">{exp.description}</p>
              
              <div className="hidden sm:flex flex-wrap gap-2 mb-4 xs:gap-1">
                {exp.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="tech-tag text-xs xs:text-[0.6rem]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm xs:text-xs">
                {exp.period}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
