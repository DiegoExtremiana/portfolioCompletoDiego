import React, { useState, useEffect, useRef } from 'react';
import { LANGUAGE_COLORS } from '../constants/skills';

const LanguageProgressBar = ({ percentages, technologies }) => {

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
        threshold: 0.7, // Activar cuando el 70% del elemento esté visible
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
      <div className="w-full bg-[var(--progress-bar-track-bg)] rounded-full h-4 relative mb-4">
        <div className="flex h-4 rounded-full overflow-hidden relative z-10">
          {percentages.map((item, index) => (
            <div
              key={index}
              className="h-full flex items-center justify-center text-xs font-bold transition-all duration-300 ease-out relative"
              style={{
                width: `${animatedPercentages[index]}%`,
                backgroundColor: LANGUAGE_COLORS[item.language] || '#888',
                color: 'rgb(16,25,39)',
                minWidth: '30px' // Mínimo para que se vea el texto
              }}
          >
            {`${Math.round(animatedPercentages[index])}%`} {/* Mostrar siempre el porcentaje */}
          </div>
          ))}
        </div>
        {/* Nombres de los lenguajes posicionados encima de cada segmento */}
        <div className="absolute top-0 left-0 w-full h-4 flex z-0">
          {percentages.map((item, index) => (
            <div
              key={`label-${index}`}
              className="h-4 flex items-start justify-center text-xs text-[var(--progress-bar-label-text)] font-bold"
              style={{
                width: `${animatedPercentages[index]}%`,
                minWidth: '30px'
              }}
            >
              <span className="mt-[-1.2rem]">{item.language}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Mostrar tecnologías si están disponibles */}
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, techIndex) => (
            <span 
              key={`tech-${techIndex}`}
              className="tech-tag text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageProgressBar;
