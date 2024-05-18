import create from 'zustand';
import { addHistorialToPaciente as addHistorialToPacienteAPI, createMultimediaForHistorial as createMultimediaForHistorialAPI } from '../services/apiService';

const usePacientesStore = create((set) => ({
  pacientes: [],
  historialesClinicos: [],
  addHistorialToPaciente: async (idPaciente, historialData) => {
    try {
      const response = await addHistorialToPacienteAPI(idPaciente, historialData);
      const newHistorial = response.data; // Asumiendo que los datos del nuevo historial vienen en la respuesta
      set(state => ({
        historialesClinicos: [...state.historialesClinicos, newHistorial]
      }));
      return newHistorial; // Devolvemos el nuevo historial para su uso posterior
    } catch (error) {
      console.error('Error al agregar historial', error);
      throw error;
    }
  },
  createMultimediaForHistorial: async (historialId, multimediaData) => {
    try {
      await createMultimediaForHistorialAPI(historialId, multimediaData);
    } catch (error) {
      console.error('Error al crear multimedia:', error);
      throw error;
    }
  },
 
}));

export default usePacientesStore;
