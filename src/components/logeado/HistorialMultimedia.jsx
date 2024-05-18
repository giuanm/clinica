import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import usePacientesStore from '../../store/pacientesStore';
import { useParams } from 'react-router-dom';

const ListaHistorialesClinicos = (idPaciente) => {
  const { historialesClinicos, fetchHistorialesClinicos } = usePacientesStore();

  useEffect(() => {
    if (idPaciente) {
      fetchHistorialesClinicos(idPaciente);
    }
  }, [idPaciente, fetchHistorialesClinicos]);

 
  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-32"
    >
      <div className="text-center">
        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Historial Clínico Multimedia</h2>
      </div>
      
      

      <div className="bg-white shadow-xl rounded-lg p-6">
        {historialesClinicos.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {historialesClinicos.map((historial) => (
              <li key={historial.idHistorial} className="historial-item flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow space-y-3">
                <h3 className="text-lg font-semibold">{`Historial #${historial.idHistorial}`}</h3>
                <p className="text-justify"><strong>Fecha:</strong> {new Date(historial.fecha).toLocaleDateString()}</p>
                <p className="text-justify"><strong>Observaciones:</strong> {historial.observaciones}</p>
                <p className="text-justify"><strong>Estado:</strong> {historial.status ? 'Activo' : 'Inactivo'}</p>
                {/* Aquí se muestran las imágenes */}
                {historial.imagenes && historial.imagenes.length > 0 && (
                  <div className="flex overflow-x-auto">
                    {historial.imagenes.map((imagen, index) => (
                      <img key={index} src={imagen} alt={`Imagen ${index}`} className="w-24 h-24 object-cover mx-1 rounded" />
                    ))}
                  </div>
                )}
                
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No se encontraron fotografias para este historial clinico.</p>
        )}
      </div>
    </motion.div>
  );
};

export default ListaHistorialesClinicos;
