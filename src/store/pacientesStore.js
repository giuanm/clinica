import { create } from 'zustand';
import { fetchPacientesPaginated, fetchPacientesByName, fetchPacientesByFecha, fetchPacientesByStatus, addPaciente, allPacientes } from '../services/apiService';
import { fetchHistorialByPaciente } from '../services/apiService';
import { updatePaciente } from '../services/apiService'; 

import { addHistorialToPaciente, listHistorialByPaciente } from '../services/apiService';

const usePacientesStore = create((set) => ({
  pacientes: [],
  paginaActual: 0, // Comenzar la paginación desde 0
  totalPaginas: 0,
  pageSize: 6,
  historialesClinicos: [],
  listHistorialesbyPaciente: async (idPaciente) => {
    try{
        const historial = await listHistorialByPaciente(idPaciente);
        set({ historial });
    }catch(error){
        console.error("Error al obtener historiales del paciente")
    }
  },
  addHistorialToPaciente: async(idPaciente, historialData) =>{
      try{
          const newHistorial = await addHistorialToPaciente(idPaciente, historialData);
          set((state) => ({
              historiales: [...state.historiales, newHistorial]
          }));
          console.log('Paciente agregado con éxito');
      } catch (error) {
          console.error('Error al agregar historial', error);
      }
  },

  // In your Zustand store
  fetchHistorialesClinicos: async (idPaciente) => {
    try {
      const response = await fetchHistorialByPaciente(idPaciente);
      if (response && response.data) {
        set({ historialesClinicos: response.data });
        console.log('Data set in store:', response.data); // Verifica que esto muestra los datos correctamente
      } else {
        set({ historialesClinicos: [] });
        console.error('No data received');
      }
    } catch (error) {
      console.error('Error al cargar los historiales clínicos:', error);
      set({ historialesClinicos: [] });
    }
  },
  

  
  updatePaciente: async (idPaciente, pacienteData) => {
    try {
      const result = await updatePaciente(idPaciente, pacienteData);
      // Aquí podrías actualizar el estado local con la respuesta si es necesario
      alert(result.message); // o manejar el resultado como prefieras
    } catch (error) {
      console.error('Error al actualizar paciente:', error);
      alert('Error al actualizar paciente');
    }
  },

  fetchPacientes: async (pagina = 0, pageSize = 6) => { // Valor por defecto de página ajustado a 0
    try {
      const response = await fetchPacientesPaginated(pagina, pageSize);
      if (response && response.data && response.data.content) {
        set({ 
          pacientes: response.data.content, 
          totalPaginas: response.data.totalPages, 
          paginaActual: pagina
        });
      } else {
        console.log('Respuesta inesperada:', response);
        set({
          pacientes: [],
          totalPaginas: 0
        });
      }
    } catch (error) {
      console.error('Error fetching paginated pacientes:', error);
      set({ 
        pacientes: [],
        totalPaginas: 0
      });
    }
  },
  addPaciente: async (pacienteData) => {
    try {
      const newPaciente = await addPaciente(pacienteData);
      set((state) => ({
        pacientes: [...state.pacientes, newPaciente]
      }));
      console.log('Paciente agregado con éxito');
    } catch (error) {
      console.error('Error al agregar paciente:', error);
    }
  },
  
  fetchPacientesByName: async (nombre) => {
    const data = await fetchPacientesByName(nombre);
    set({ pacientes: data.data });
  },

  fetchPacientesByFecha: async (fecha) => {
    const data = await fetchPacientesByFecha(fecha);
    set({ pacientes: data.data });
  },

  allPacientes: async () => {
    const data = await allPacientes();
    set({pacientes: data.data})
  },

  fetchPacientesByStatus: async (activo, pagina = 0, pageSize = 6) => {
    console.log("Estado activo para cargar: ", activo); // Añadir para debugging
    const data = await fetchPacientesByStatus(activo, pagina, pageSize);
    console.log("Datos recibidos para estado: ", data); // Añadir para debugging
    if (data && data.data && data.data.content) {
      set({
        pacientes: data.data.content,
        totalPaginas: data.data.totalPages || 0,
        paginaActual: pagina
      });
    } else {
      console.log('No se encontraron pacientes o respuesta inesperada:', data);
      set({
        pacientes: [],
        totalPaginas: 0,
        paginaActual: 0 // Resetear la página actual si no hay contenido
      });
    }
  },
  fetchPaciente: async () => {
    const data = await fetchPaciente();
    set({ paciente: data.data });
  },
  setPaginaActual: (pagina) => set(() => ({ paginaActual: pagina })),
}));

  



export default usePacientesStore;
