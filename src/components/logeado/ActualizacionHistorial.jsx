import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const ActualizarHistorialClinico = () => {
  const [estatus, setEstatus] = useState(false);
  const [fecha, setFecha] = useState('');
  const [observacion, setObservacion] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef();

  const validateForm = () => {
    if (!fecha) {
      setError('Ingrese la fecha.');
      return false;
    }
    if (!observacion) {
      setError('Ingrese la observación.');
      return false;
    }
    if (imagenes.some(file => !file.type.startsWith('image/'))) {
      setError('Solo se pueden subir imágenes.');
      setImagenes([]);
      return false;
    }
    return true;
  };

  const handleImageChange = (e) => {
    // Filtra los archivos para asegurarse de que solo sean imágenes
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
    
    const historialData = {
      estatus,
      fecha,
      observacion,
      imagenes, // Asumiendo que esto se manejará adecuadamente en tu backend o lógica de estado
    };

    try {
      console.log('Historial clínico agregado:', historialData);
      setShowSuccessMessage(true);
      setError(''); // Limpia errores previos
      setTimeout(() => setShowSuccessMessage(false), 3000); // Oculta el mensaje después de 3 segundos
    } catch (error) {
      console.error('Error al agregar el historial clínico:', error);
      setError('Ocurrió un error al registrar el historial clínico.');
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-32"
    >
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Registra Un Nuevo Historial Clínico</h2>
        {showSuccessMessage && (
          <div className="text-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            Historial clínico registrado con éxito.
          </div>
        )}
        {error && (
          <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
            <input
              type="date"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="observacion" className="block text-sm font-medium text-gray-700">Observación</label>
            <textarea
              id="observacion"
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700">Imágenes (opcional)</label>
            {/* El input real oculto */}
            <input
              type="file"
              id="imagenes"
              multiple
              accept="image/*" // Asegura que solo se puedan seleccionar imágenes
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            {/* Botón personalizado */}
            <button
              type="button"
              onClick={handleFileInputClick}
              className="mt-1 block w-full text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Elegir imágenes
            </button>
            {/* Muestra los nombres de los archivos seleccionados */}
            {imagenes.length > 0 && (
              <div className="mt-2 text-sm text-gray-500">
                {imagenes.map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Estatus</span>
            <button
              type="button"
              onClick={() => setEstatus(!estatus)}
              className={`${estatus ? 'bg-green-500' : 'bg-red-500'} rounded-full px-3 py-1 text-white`}
            >
              {estatus ? 'Activo' : 'Inactivo'}
            </button>
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

export default ActualizarHistorialClinico;
