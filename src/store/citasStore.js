import { create } from "zustand";
import { fetchCitasByFecha, addCita, updateCita, citaById } from '../services/apiService';

const useCitasStore = create((set) => ({
  citas: [],
  tiposCitas: [],
  fetchCitasByFecha: async (fecha) => {
      const data = await fetchCitasByFecha(fecha);
      set({ citas: data.data });
  },
  addCitas: async (asistenteId, citaData) => {
    try {
      const newCita = await addCita(asistenteId, citaData);
      set((state) => ({
        citas: [...state.citas, newCita]
      }));
      console.log('Cita agregada con éxito');
    } catch (error) {
      console.error('Error adding cita:', error);
    }
  },
  fetchTiposCitas: async () => {
    
    set({ tiposCitas: [
      { id: 1, nombre: 'Consulta' },
      { id: 2, nombre: 'Examen' },
      { id: 3, nombre: 'Operación' },
    ] });


  },

  updateCita: async (idCita, citaData) => {
    try{
      const result = await updateCita(idCita, citaData);
      //alert(result.message);
    }catch (error) {
      console.error('Error al actualizar cita:', error);
      //alert('Error al actualizar cita');
    }
  },

  citaById: async(idCita) => {
    try{
      const data = await citaById(idCita);
      set({cita: data});
    }catch (error){
      console.log("Error al encontrar cita", error);
      throw error;
    }
  }

}));

export default useCitasStore;
