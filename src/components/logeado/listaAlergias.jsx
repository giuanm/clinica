import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import useAlergiasStore from '../store/alergiasStore';
import { useParams } from 'react-router-dom';

const ListaAlergias = () => {
  const { idPaciente } = useParams();
  const { alergias, fetchAlergias } = useAlergiasStore();
  const [update, setUpdate] = useState(false);
  const [sortedAlergias, setSortedAlergias] = useState([]);

  useEffect(() => {
    if (idPaciente) {
      fetchAlergias(idPaciente).then(() => {
        setUpdate(true); // Cambia el estado para forzar la renderización
      });
    }
  }, [idPaciente, fetchAlergias]);

  useEffect(() => {
    if (update) {
      const sorted = [...alergias].sort((a, b) => a.tipoAlergia.localeCompare(b.tipoAlergia));
      setSortedAlergias(sorted);
      console.log('Datos actualizados y componente re-renderizado');
      console.log('Alergias en el componente:', sorted);
    }
  }, [update, alergias]);

  const goToAlergia = () => {
    window.location.href = `/regAlergia/${idPaciente}`;
  };

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial="hidden"
      whileInView={'show'}
      className="container mx-auto mt-32"
    >
      <div className="text-center">
        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Lista de Alergias</h2>
      </div>
      <button
        className="absolute top-20 right-10 bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
        onClick={goToAlergia}
      >
        Añadir Alergia
      </button>
      <div className="bg-white shadow-xl rounded-lg p-6">
        {sortedAlergias && sortedAlergias.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedAlergias.map(alergia => (
              <li key={alergia.idAlergia}>
                <div className="alergia-item flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow space-y-3 w-full ">
                  <h3 className="text-lg font-semibold">{`Alergia #${alergia.idAlergia}`}</h3>
                  <p className="text-justify"><strong>Tipo de Alergia:</strong> {alergia.tipoAlergia}</p>
                  <p className="text-justify"><strong>Causa:</strong> {alergia.causa}</p>
                  <p className="text-justify"><strong>Estado:</strong> {alergia.status ? 'Activo' : 'Inactivo'}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No se encontraron alergias.</p>
        )}
      </div>
    </motion.div>
  );
};

export default ListaAlergias;
