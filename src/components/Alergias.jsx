import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useNavigate
import useAlergiasStore from '../store/alergiasStore';

const Alergias = () => {
  const { idPaciente } = useParams();
  const navigate = useNavigate(); // Hook para manejar la navegación
  const [alergiaActiva, setAlergiaActiva] = useState(false);
  const [tipoAlergia, setTipoAlergia] = useState('');
  const [causa, setCausa] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState('');

  const tiposDeAlergia = ["Epidermica", "Polen", "Alimentos", "Animales", "Medicamentos"];

  const { addAlergia } = useAlergiasStore();

  const validateForm = () => {
    if (!tipoAlergia) {
      setError('Seleccione un tipo de alergia.');
      return false;
    }
    if (!causa) {
      setError('Ingrese la causa de la alergia.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const alergiaData = {
      tipoAlergia,
      causa,
      status: alergiaActiva,
    };

    try {
      await addAlergia(idPaciente, alergiaData);
      setShowSuccessMessage(true);
      setError(''); // Limpia errores previos
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate(-1); // Navega a la página anterior después de 3 segundos
      }, 3000);
    } catch (error) {
      console.error('Error al agregar alergia:', error);
      setError('Ocurrió un error al registrar la alergia.');
    }
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
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Registro de Alergia</h2>
        {showSuccessMessage && (
          <div className="text-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            Alergia registrada con éxito.
          </div>
        )}
        {error && (
          <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="tipoAlergia" className="block text-sm font-medium text-gray-700">Tipo de alergia</label>
            <select
              id="tipoAlergia"
              value={tipoAlergia}
              onChange={(e) => setTipoAlergia(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Seleccione un tipo</option>
              {tiposDeAlergia.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="causa" className="block text-sm font-medium text-gray-700">Causa</label>
            <input
              type="text"
              id="causa"
              value={causa}
              onChange={(e) => setCausa(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Alergia activa</span>
            <button
              type="button"
              onClick={() => setAlergiaActiva(!alergiaActiva)}
              className={`${alergiaActiva ? 'bg-green-500' : 'bg-red-500'} rounded-full px-3 py-1 text-white`}
            >
              {alergiaActiva ? 'Activa' : 'Inactiva'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-8 bg-secondary font-semibold text-white rounded
            hover:bg-primary transition-all duration-300"
          >
            Registrar
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Alergias;
