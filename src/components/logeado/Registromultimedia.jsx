// components/RegImagenes.js
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { useParams } from 'react-router-dom';
import useMultimediaStore from '../../store/multimediaStore';

const RegImagenes = () => {
  const { idHistorial } = useParams();
  const [imagenes, setImagenes] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef();
  const { createMultimedia } = useMultimediaStore();

  const validateForm = () => {
    if (imagenes.some(file => !file.type.startsWith('image/'))) {
      setError('Solo se pueden subir imágenes.');
      setImagenes([]);
      return false;
    }
    return true;
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
    if (files.length !== e.target.files.length) {
      setError('Algunos archivos no son imágenes y no fueron seleccionados.');
    }
    setImagenes(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    imagenes.forEach(image => formData.append('file', image));

    try {
      await createMultimedia(idHistorial, formData);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        window.location.href = `/multimedia/${idHistorial}`; // Redirigir a la lista de imágenes
      }, 3000);
    } catch (error) {
      console.error('Error al agregar las imágenes:', error);
      setError('Ocurrió un error al registrar las imágenes.');
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-32"
    >
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Registrar Imágenes</h2>
        {showSuccessMessage && (
          <div className="text-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            Imágenes registradas con éxito.
          </div>
        )}
        {error && (
          <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700">Imágenes</label>
            <input
              type="file"
              id="imagenes"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={handleFileInputClick}
              className="mt-1 block w-full text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Elegir imágenes
            </button>
            {imagenes.length > 0 && (
              <div className="mt-2 text-sm text-gray-500">
                {imagenes.map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-8 bg-secondary font-semibold text-white rounded hover:bg-primary transition-all duration-300"
          >
            Registrar
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default RegImagenes;
