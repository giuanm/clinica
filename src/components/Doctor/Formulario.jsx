import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import usePacientesStore from '../../store/pacientesStore';

const RegistroPacientes = () => {
  const [nombre, setNombre] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [correo, setCorreo] = useState('');



  const generos = ["Masculino", "Femenino"];

  const { addPaciente } = usePacientesStore();

  const handleCorreoChange = (e) => {
    const value = e.target.value;
    
    // Expresión regular para validar el formato del correo electrónico
    const correoValidoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verificar si el correo electrónico ingresado tiene un formato válido
    if (correoValidoRegex.test(value)) {
      // Si el formato es válido, actualizar el estado
      setCorreo(value);
    } else {
      // Si el formato no es válido, mostrar un mensaje de error o realizar alguna acción
      alert('Por favor, introduce un correo electrónico válido.');
      // También puedes mantener el valor actual si lo deseas
      // setCorreo(value);
    }
  };

  const handleFechaNacimientoChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    
    // Verificar si la fecha seleccionada está dentro del rango permitido
    if (selectedDate < oneYearAgo) {
      // Si la fecha seleccionada está dentro del rango permitido, actualizar el estado
      setFechaNacimiento(e.target.value);
    } else {
      // Si la fecha seleccionada está fuera del rango permitido, mostrar un mensaje de error o realizar alguna acción
      alert('La fecha de nacimiento no puede ser futura');
      // También puedes mantener la fecha actual si lo deseas
      // setFechaNacimiento(formatDate(today)); // suponiendo que tienes una función formatDate para formatear la fecha
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const pacienteData = {
      nombre,
      apellidoP,
      apellidoM,
      fechaNacimiento, // Asegúrate de que el formato de fecha sea compatible con tu backend
      genero,
      correo,
      telefono:'123', // Asumiendo que esto ya es una cadena que representa un número
      ci:123, // Asumiendo que esto ya es una cadena
      idZona: 1,
       // Convierte a número
      tipoSangre:'1',
      status: true, // Asumiendo que esto ya es un booleano
    };
    try {
      if (!nombre || !apellidoP || !apellidoM || !fechaNacimiento || !genero || !correo) {
        alert('Por favor, llena todos los campos');
        return;
      }
      if(!correo.includes('@')){
        alert('Por favor, introduce un correo electrónico válido.');
        return;
      }
      //verificar si el el nombre tiene caracteres especiales
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(nombre)) {
        alert('El nombre no puede contener caracteres especiales');
        return;
      }
      //verificar si el el apellido tiene caracteres especiales
      if (!regex.test(apellidoP)) {
        alert('El apellido paterno no puede contener caracteres especiales');
        return;
      }
      //verificar si el el apellido tiene caracteres especiales
      if (!regex.test(apellidoM)) {
        alert('El apellido materno no puede contener caracteres especiales');
        return;
      }
      
      await addPaciente(pacienteData);
      alert('Paciente registrado con éxito');
      // Aquí puedes limpiar el formulario o redireccionar al usuario
    } catch (error) {
      console.error('Error al registrar paciente:', error);
      alert('Error al registrar paciente');
    }
  };
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const fechaMaxima = oneYearAgo.toISOString().split('T')[0];
  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-32"
    >
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Registro de Pacientes</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {/* ApellidoP */}
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido Paterno</label>
              <input
                type="text"
                id="apellido"
                value={apellidoP}
                onChange={(e) => setApellidoP(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {/* ApellidoM */}
            <div>
              <label htmlFor="apellidoM" className="block text-sm font-medium text-gray-700">Apellido Materno</label>
              <input
                type="text"
                id="apellidoM"
                value={apellidoM}
                onChange={(e) => setApellidoM(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
             {/*fechaNacimiento*/}   
            <div>
              <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <input
                type="date"
                id="fechaNacimiento"
                value={fechaNacimiento}
                onChange={handleFechaNacimientoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                max={fechaMaxima} // Establecer el atributo max para restringir la fecha máxima a hoy
              />
            </div>
            {/* Género */}
            <div>
              <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Género</label>
              <select
                id="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Seleccione un género</option>
                {generos.map((gen) => (
                  <option key={gen} value={gen}>{gen}</option>
                ))}
              </select>
            </div>
          </div>




          {/* Correo */}
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
         
          

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full py-2 px-8 bg-secondary font-semibold text-white rounded
            hover:bg-primary transition-all duration-300"
          >
            Registrar
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default RegistroPacientes;