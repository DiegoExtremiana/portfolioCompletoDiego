import React, { useState } from 'react';
import { FaGithub, FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt, FaLinkedin } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../constants/navigation';
import { validateContactForm } from '../utils/validationUtils';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = () => {
    const { errors, isValid } = validateContactForm(formData);
    setErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });

    // Limpiar el error cuando el usuario empieza a escribir
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSubmitMessage(data.message);
          setFormData({ name: '', email: '', message: '' });
        } else {
          setSubmitMessage(data.error || 'Error al enviar el mensaje.');
        }
      } else {
        const errorData = await response.text(); // Cambiado de response.json() a response.text()
        try {
          const errorJson = JSON.parse(errorData);
          setSubmitMessage(errorJson.error || 'Error al enviar el mensaje. Por favor, inténtelo de nuevo.');
        } catch (e) {
          // Si no se puede parsear como JSON, mostrar el texto directamente
          setSubmitMessage('Error al enviar el mensaje. Por favor, inténtelo de nuevo.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Error al enviar el mensaje. Por favor, inténtelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 section-bg-light">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 fade-in">
        <h2 className="section-title">
          Contacto
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-80 dark:text-white mb-6">Información de Contacto</h3>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <FaEnvelope className="text-2xl text-blue-600 dark:text-blue-400 mr-4" />
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Correo electrónico</p>
                  <a 
                    href={`mailto:${SOCIAL_LINKS.email}`} 
                    className="text-lg font-medium link flex items-center"
                  >
                    {SOCIAL_LINKS.email}
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-2xl text-blue-600 dark:text-blue-400 mr-4" />
                <div>
                  <p className="text-[var(--text-secondary)]">Ubicación</p>
                  <p className="text-lg font-medium text-[var(--text-primary)]">Nájera, La Rioja</p>
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
                    className="text-lg font-medium link flex items-center"
                  >
                    TRdeXtremiana
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <FaLinkedin className="text-2xl text-blue-60 dark:text-blue-400 mr-4" />
                <div>
                  <p className="text-gray-600 dark:text-gray-300">LinkedIn</p>
                  <a 
                    href={SOCIAL_LINKS.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-medium link flex items-center"
                  >
                    linkedin
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Envíame un Mensaje</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-[var(--text-primary)] mb-2">Nombre</label>
                <input
                  type="text"
                  id="name"
                  className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-70 dark:text-gray-300 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Tu correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-[var(--text-primary)] mb-2">Mensaje</label>
                <textarea
                  id="message"
                  rows="5"
                  className={`form-input ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="Tu mensaje"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
              
              {submitMessage && (
                <div className={`mt-4 p-4 rounded ${submitMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
