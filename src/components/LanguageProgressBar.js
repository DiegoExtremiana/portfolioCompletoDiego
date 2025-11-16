import React, { useState, useEffect, useRef } from 'react';

const LanguageProgressBar = ({ percentages }) => {
  // Definir colores para cada lenguaje
  const languageColors = {
    'Angular': '#dc2626', // rojo escarlata
    'React': '#60a5fa',   // azul claro
    'JavaScript': '#fbbf24', // amarillo
    'CSS': '#a855f7',     // morado
    'HTML': '#f97316'     // naranja
  };

  const [animatedPercentages, setAnimatedPercentages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Dejar de observar una vez que se activa
        }
      },
      {
        threshold: 0.5, // Activar cuando el 50% del elemento esté visible
      }
    );

    if (progressBarRef.current) {
      observer.observe(progressBarRef.current);
    }

    return () => {
      if (progressBarRef.current) {
        observer.unobserve(progressBarRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animar gradualmente los porcentajes desde 0 hasta el valor final
      const animationDuration = 1000; // 1 segundo
      const steps = 30; // Número de pasos para la animación
      const stepDuration = animationDuration / steps;
      
      const initialPercentages = percentages.map(() => 0);
      setAnimatedPercentages(initialPercentages);
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        if (currentStep > steps) {
          clearInterval(interval);
          setAnimatedPercentages(percentages.map(item => item.percentage));
          return;
        }
        
        const newPercentages = percentages.map((item, index) => {
          return Math.min(item.percentage, (currentStep / steps) * item.percentage);
        });
        setAnimatedPercentages(newPercentages);
      }, stepDuration);
      
      return () => clearInterval(interval);
    } else {
      // Si no es visible, resetear los porcentajes a 0
      setAnimatedPercentages(percentages.map(() => 0));
    }
  }, [isVisible, percentages]);

  return (
    <div className="w-full" ref={progressBarRef}>
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
        {percentages.map((item, index) => (
          <span key={index}>
            {item.language}
          </span>
        ))}
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
        <div className="flex h-4 rounded-full overflow-hidden">
          {percentages.map((item, index) => (
            <div
              key={index}
              className="h-full flex items-center justify-center text-xs text-white font-bold transition-all duration-300 ease-out"
              style={{
                width: `${animatedPercentages[index]}%`,
                backgroundColor: languageColors[item.language] || '#888',
                minWidth: '30px' // Mínimo para que se vea el texto
              }}
          >
            {`${Math.round(animatedPercentages[index])}%`} {/* Mostrar siempre el porcentaje */}
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageProgressBar;
