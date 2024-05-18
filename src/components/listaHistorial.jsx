import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import usePacientesStore from '../store/pacientesStore';
import { useParams } from 'react-router-dom';

const ListaHistorialesClinicos = () => {
  const { idPaciente } = useParams();
  const { historialesClinicos, fetchHistorialesClinicos } = usePacientesStore();
  const [update, setUpdate] = useState(false);
  const [sortedHistoriales, setSortedHistoriales] = useState([]);

  useEffect(() => {
    if (idPaciente) {
      fetchHistorialesClinicos(idPaciente).then(() => {
        setUpdate(true); // Cambia el estado para forzar la renderización
      });
    }
  }, [idPaciente, fetchHistorialesClinicos]);

  useEffect(() => {
    if (update) {
      const sorted = [...historialesClinicos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      setSortedHistoriales(sorted);
      console.log('Datos actualizados y componente re-renderizado');
      console.log('Historiales Clinicos en el componente:', sorted);
    }
  }, [update, historialesClinicos]);

  const goToHistorial = () => {
    window.location.href = `/regHistorial/${idPaciente}`;
  };

  const goToHistorial2 = (idHistorial) => {
    window.location.href = `/multimedia/${idHistorial}`;
  };

  const addTreatment = (idHistorial) => {
    window.location.href = `/regTratamiento/${idHistorial}`;
  };

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial="hidden"
      whileInView={'show'}
      className="container mx-auto mt-32"
    >
      <div className="text-center">
        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Lista de Historiales Clínicos</h2>
      </div>
      <button
        className="absolute top-20 right-10 bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
        onClick={goToHistorial}
      >
        Añadir Historial Clínico
      </button>
      <div className="bg-white shadow-xl rounded-lg p-6">
        {sortedHistoriales && sortedHistoriales.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedHistoriales.map(historial => (
              <li key={historial.idHistorial}>
                <div className="historial-item flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow space-y-3 w-full ">
                  <h3 className="text-lg font-semibold">{`Historial #${historial.idHistorial}`}</h3>
                  <p className="text-justify"><strong>Fecha:</strong> {historial.fecha ? new Date(historial.fecha).toLocaleDateString() : 'Fecha no disponible'}</p>
                  <p className="text-justify"><strong>Observaciones:</strong> {historial.observaciones}</p>
                  <p className="text-justify"><strong>Estado:</strong> {'Activo'}</p>
                  <button onClick={() => goToHistorial2(historial.idHistorial)}>Historial multimedia</button>
                  <button onClick={() => addTreatment(historial.idHistorial)}>Tratamientos</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No se encontraron historiales clínicos.</p>
        )}
      </div>
    </motion.div>
  );
};

export default ListaHistorialesClinicos;
