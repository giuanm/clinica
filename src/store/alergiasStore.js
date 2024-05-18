import { create } from 'zustand';
import { addAlergiaToPaciente } from '../services/apiService';

const useAlergiasStore = create((set) => ({
    alergias: [], // Asumiendo que quieres almacenar las alergias aquí
    addAlergia: async (idPaciente, alergiaData) => {
      try {
        const newAlergia = await addAlergiaToPaciente(idPaciente, alergiaData);
        // Suponiendo que tu API devuelve la nueva alergia añadida, actualizamos el estado
        set((state) => ({
          alergias: [...state.alergias, newAlergia]
        }));
        console.log("Alergia agregada con éxito");
      } catch (error) {
        console.error('Error al agregar alergia:', error);
      }
    },
}));

export default useAlergiasStore;
