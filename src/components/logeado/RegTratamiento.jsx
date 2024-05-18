import { useEffect,  useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import useTratamientoStore from '../../store/tratamientoStore';
import { useParams } from 'react-router-dom';

const RegistroTratamiento = () => {
  const {historialClinicoId } = useParams();
  console.log(historialClinicoId);
  const [contenido, setContenido] = useState('');
  const [estatus, setEstatus] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [error, setError] = useState('');

  const { addTratamiento } = useTratamientoStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!historialClinicoId) {
      console.error('No se ha proporcionado historialClinicoId');
      return;
    }  
    const tratamientoData = {
      constenido: contenido,
      status: estatus
    };
    //Validar que el contenido no esté vacío
    if (!tratamientoData.contenido) {
      setError('El contenido del tratamiento es requerido.');
      return;
    }
    //Validar Status
    if (tratamientoData.status === undefined) {
      setError('El estatus del tratamiento es requerido.');
      return;
    }
    try {
      // Aquí puedes realizar una llamada a tu backend para registrar el tratamiento
      console.log('tramamientoData:', tratamientoData, historialClinicoId);
      await addTratamiento(tratamientoData, historialClinicoId);
      console.log('Tratamiento registrado:', tratamientoData);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        window.location.href = '/historial';
      }, 3000);
    } catch (error) {
      console.error('Error al registrar el tratamiento:', error);
      setError('Ocurrió un error al registrar el tratamiento.');
    }
  };
  useEffect(() => {
    console.log('historialClinicoId:', historialClinicoId);
  }, [historialClinicoId]);

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-32"
    >
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Registro de Tratamiento</h2>
        {showSuccessMessage && (
          <div className="text-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            Tratamiento registrado con éxito.
          </div>
        )}
        {error && (
          <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contenido" className="block text-sm font-medium text-gray-700">Contenido</label>
            <textarea
              id="contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="5"
            ></textarea>
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

          <input
            type="hidden"
            id="historialClinicoId"
            value={historialClinicoId}
          />

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

export default RegistroTratamiento;
