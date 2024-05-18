import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import useMultimediaStore from '../store/multimediaStore';
import { useParams } from 'react-router-dom';

const ListaImagenes = () => {
  const { idHistorial } = useParams();
  const { multimedia, fetchMultimedia } = useMultimediaStore();
  const [update, setUpdate] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    if (idHistorial) {
      fetchMultimedia(idHistorial).then(() => {
        setUpdate(true);
      });
    }
  }, [idHistorial, fetchMultimedia]);

  useEffect(() => {
    if (update) {
      console.log('Datos actualizados y componente re-renderizado');
      multimedia.forEach((media, index) => {
        console.log(`Multimedia ${index + 1}:`, `data:${media.contentType};base64,${media.bytes}`);
      });
    }
  }, [update, multimedia]);

  const goToAddImage = () => {
    window.location.href = `/regmultimedia/${idHistorial}`;
  };

  const handleDeleteClick = (media) => {
    setSelectedMedia(media);
    setShowDialog(true);
  };

  const handleConfirmDelete = () => {
    // Aquí añadirás la lógica para eliminar la imagen
    console.log('Deleting:', selectedMedia);
    setShowDialog(false);
    setSelectedMedia(null);
  };

  const handleCancelDelete = () => {
    setShowDialog(false);
    setSelectedMedia(null);
  };

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial="hidden"
      whileInView={'show'}
      className="container mx-auto mt-32"
    >
      <div className="text-center">
        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Lista de Imágenes</h2>
      </div>
      <button
        className="absolute top-20 right-10 bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
        onClick={goToAddImage}
      >
        Añadir Imagen
      </button>
      <div className="bg-white shadow-xl rounded-lg p-6">
        {multimedia && multimedia.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {multimedia.map((media, index) => (
              <li key={index} className="relative">
                <div className="multimedia-item flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow space-y-3 w-full h-200px">
                  <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={() => handleDeleteClick(media)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6L18 18M6 18L18 6" />
                    </svg>
                  </button>
                  <img
                    src={`data:${media.contentType};base64,${media.bytes}`}
                    alt={media.originalFilename}
                    className="w-full h-full object-cover"
                  />
                  <p className="text-center mt-2">{media.originalFilename}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No se encontraron imágenes.</p>
        )}
      </div>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirmar Borrado</h2>
            <p>¿Estás seguro de que deseas borrar esta imagen?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={handleCancelDelete}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleConfirmDelete}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ListaImagenes;
