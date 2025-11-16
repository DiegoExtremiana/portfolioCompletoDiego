import React from 'react';
import { FaGithub, FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contacto" className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Contacto
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-80 dark:text-white mb-6">Información de Contacto</h3>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <FaEnvelope className="text-2xl text-blue-60 dark:text-blue-400 mr-4" />
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Correo electrónico</p>
                  <a 
                    href="mailto:dextremiana1998@gmail.com" 
                    className="text-lg font-medium text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                  >
                    dextremiana1998@gmail.com
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-2xl text-blue-600 dark:text-blue-400 mr-4" />
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Ubicación</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">Nájera, La Rioja</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaGithub className="text-2xl text-blue-600 dark:text-blue-400 mr-4" />
                <div>
                  <p className="text-gray-600 dark:text-gray-300">GitHub</p>
                  <a 
                    href="https://github.com/TRdeXtremiana" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                  >
                    TRdeXtremiana
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Envíame un Mensaje</h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-70 dark:text-gray-300 mb-2">Nombre</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-70 dark:text-gray-300 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  placeholder="Tu correo electrónico"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Mensaje</label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  placeholder="Tu mensaje"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
