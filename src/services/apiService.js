import axios from 'axios';
import {  } from 'pdf-lib';

const API_URL = 'http://localhost:8090/api/v1';
//const API_URL1 = 'http://localhost:8006/api/v1';

export const fetchPacientesPaginated = async (page, pageSize) => {
  const params = { page, size: pageSize };
  console.log("Sending params:", params);  // Agrega esta línea para ver qué estás enviando
  try {
    const response = await axios.get(`${API_URL}/paciente/all`, { params });
    console.log("Received data:", response.data);  // Ver la respuesta completa
    return response.data;
  } catch (error) {
    console.error('Error fetching paginated pacientes:', error);
    throw error;
  }
};
export const fetchPaciente = async () => {
  try {
    const response = await axios.get(`${API_URL}/paciente/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pacientes:', error);
    throw error;
  }
};
export const allPacientes = async () => {
  try{
    const response = await axios.get(`${API_URL}/paciente/todos`);
    return response.data;
  }catch(error){
    console.error('Error fetching pacientes:', error);
    throw error;
  }
};
export const fetchPacientesByName = async (nombre) => {
  try {
    const response = await axios.get(`${API_URL}/paciente/nombre`, { params: { nombre } });
    return response.data;
  } catch (error) {
    console.error('Error fetching pacientes by name:', error);
    throw error;
  }
};

export const fetchPacientesByFecha = async (fecha) => {
  try {
    const response = await axios.get(`${API_URL}/paciente/fecha/${fecha}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pacientes by fecha:', error);
    throw error;
  }
};

export const fetchPacientesByStatus = async (estado, page, pageSize) => {
  try {
    const params = {
      page: page,
      size: pageSize
    };
    const response = await axios.get(`${API_URL}/paciente/estado/${estado}`, { params });
    console.log(`Fetching status: ${estado} with page: ${page} and size: ${pageSize}, Received data:`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching pacientes by status:', error);
    throw error;
  }
};

export const addPaciente = async (pacienteData) => {
  try {
    const response = await axios.post(`${API_URL}/paciente/agregar`, {
      ...pacienteData,
      telefono: parseInt(pacienteData.telefono, 10),
      CI: pacienteData.CI,
      idZona: parseInt(pacienteData.idZona, 10),
      status: pacienteData.status === 'true',
    });
    return response.data;
  } catch (error) {
    console.error('Error adding paciente:', error);
    throw error;
  }
};

// Añadir esta nueva función para enviar alergias
export const addAlergiaToPaciente = async (idPaciente, alergiaData) => {
    try {
      // Asegúrate de enviar un array, incluso si solo estás enviando un objeto
      const response = await axios.post(`${API_URL}/alergia/${idPaciente}`, [alergiaData]);
      return response.data;
    } catch (error) {
      console.error('Error adding alergia:', error);
      throw error;
    }
  };

export const listHistorialByPaciente = async (idPaciente) =>{
  try{
    const response = await axios.get(`${API_URL}/historial/${idPaciente}`);
    return response.data;
  }catch(error){
    console.error("Error en la lista de historiales por paciente" , error);
    throw error; 
  }
};

// Añadir esta nueva función para enviar pacientes
// apiService.js
/*export const addPaciente = async (pacienteData) => {
    try {
      const response = await axios.post(`${API_URL}/paciente/agregar`, {
        ...pacienteData,
        telefono: parseInt(pacienteData.telefono, 10),
        ci: 123,
        idZona: parseInt(pacienteData.idZona, 10),
        status: pacienteData.status === 'true',
      });
      return response.data;
    } catch (error) {
      console.error('Error adding paciente:', error);
      throw error;
    }
};*/

export const updatePaciente = async (idPaciente, pacienteData) => {
  console.log("Datos enviados para actualizar:", pacienteData);
  try {
    const response = await axios.put(`${API_URL}/paciente/${idPaciente}`, pacienteData);
    console.log("Respuesta de actualización:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating paciente:', error.response ? error.response.data : error);
    throw error;
  }
};


export const updateCita = async(idCita, citaData) => {
  console.log("Datos enviados para actualizar: ", citaData);
  try {
    const response = await axios.put(`http://localhost:8806/api/v1/cita/modificar/${idCita}`, citaData);
    console.log("Respuesta de actualización:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating cita:', error.response ? error.response.data : error);
    throw error;
  }
};


export const fetchCitasByFecha = async (fecha) => {
  try{
    const response = await axios.get(`http://localhost:8806/api/v1/cita/all/${fecha}`);
    return response.data;
  }catch (error) {
    console.error("Error fetching citas by fecha", error);
    throw error;
  }
}

export const addCita = async (asistenteId, citaData) => {
  try {
    const response = await axios.post(`http://localhost:8806/api/v1/cita/create/${asistenteId}`, citaData);
    return response.data;
  } catch (error) {
    console.error('Error adding cita:', error);
    throw error;
  }
};

export const fetchHistorialByPaciente = async (idPaciente) => {
  try {
    const response = await axios.get(`http://localhost:8805/api/v1/historial/paciente/${idPaciente}`);
    console.log('Received data:', response.data);  // This should log the actual response object
    return response.data;  // Make sure this matches the actual data structure
  } catch (error) {
    console.error('Error fetching historial by paciente:', error);
    throw error;
  }
};

export const addHistorialToPaciente = async (idPaciente, historialData) => {
  console.log('API sending historialData:', historialData); // Debug: confirmar datos antes de la solicitud
  try {
    const response = await axios.post(`http://localhost:8805/api/v1/historial/agregar/${idPaciente}`, historialData);
    return response.data;
  } catch (error) {
    console.error('Error al agregar historial:', error);
    throw error;
  }
};
export const createMultimediaForHistorial = async (historialId, multimediaData) => {
  try {
    const response = await axios.post(`http://localhost:8805/api/v1/multimedia/create/${historialId}`, multimediaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear multimedia:', error);
    throw error;
  }
};

export const addTratamiento = async(tratamientoData, historialId) => {
  console.log ('API sending TratamientoData', tratamientoData);
  try{
    const response = await axios.post(`http://localhost:8805/api/v1/tratamiento/agregar/${historialId}`, tratamientoData);
    return response.data;
  }catch(error){
    console.error("Error al crear un tratamiento", error);
    throw error;
  }
};

export const listaTratamientoByHistorial = async(historialId) =>{
  try{
    const response = await axios.get(`http://localhost:8805/api/v1/tratamiento/historial/${historialId}`);
    return response.data;
  }catch(error){
    console.error("Error en la lista de tratamientos por historiales" , error);
    throw error;
  }
};

export const citaById = async(citaId) => {
  try{
    const response = await axios.get(`http://localhost:8806/api/v1/cita/${citaId}`);
    return response.data;
  }catch(error){
    console.error("Error al encontrar la cita")
    throw error;
  }
}

