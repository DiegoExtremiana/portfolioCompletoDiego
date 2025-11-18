import React, { useEffect } from 'react';
import { FaGithub, FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../constants/navigation';

const ContactMenu = ({ onClose }) => {
  useEffect(() => {
    // Añadir evento de teclado para cerrar con Escape
    const handleEscKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  // Cerrar al hacer clic fuera del menú
  const handleClickOutside = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="contact-menu absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 border-gray-200 dark:border-gray-700 animate-fadeInSlideDown"
      onClick={handleClickOutside}
    >
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Contacto</h3>
      </div>
      
      <div className="p-2">
        <a 
          href={`mailto:${SOCIAL_LINKS.email}`} 
          className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope className="text-lg text-blue-600 dark:text-blue-400 mr-3" />
          <span className="truncate">{SOCIAL_LINKS.email}</span>
        </a>
        
        <a 
          href="https://wa.me/34610521810" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors mt-1"
        >
          <FaWhatsapp className="text-lg text-green-600 dark:text-green-400 mr-3" />
          <span>WhatsApp</span>
        </a>

        <a 
          href={SOCIAL_LINKS.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors mt-1"
        >
          <FaLinkedin className="text-lg text-blue-600 dark:text-blue-400 mr-3" />
          <span>LinkedIn</span>
        </a>
        
        <a 
          href="https://github.com/DiegoExtremiana"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors mt-1"
        >
          <FaGithub className="text-lg text-blue-600 dark:text-blue-400 mr-3" />
          <span>GitHub</span>
        </a>
      </div>
      
      <div className="px-4 py-2 mt-2 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={onClose}
          className="w-full text-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ContactMenu;
