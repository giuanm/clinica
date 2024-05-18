import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import usePacientesStore from '../../store/pacientesStore';
import { useParams } from 'react-router-dom';
const zonasPredefinidas = [
  { id: 1, nombre: 'Miraflores' },
  { id: 2, nombre: 'Sopocachi' },
  { id: 3, nombre: 'Calacoto' },
  { id: 4, nombre: 'San Pedro' },
  { id: 5, nombre: 'Obrajes' },
  { id: 6, nombre: 'Achumani' },
  { id: 7, nombre: 'Centro' },
  { id: 8, nombre: 'Zona Sur' },
  // ... Asegúrate de continuar con el mismo patrón si hay más zonas
];
const ModificarPaciente = () => {
  const { idPaciente } = useParams(); // Utiliza el hook useParams para obtener el id del paciente de la URL.
  const { getPacienteById, updatePaciente } = usePacientesStore(); // Extrae las funciones necesarias de tu tienda Zustand.
  
  // Aquí declaras tus estados, incluyendo un estado para cada campo del formulario.
  const [nombre, setNombre] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ci, setCi] = useState('');
  const [status, setStatus] = useState('');
  const [idZona, setIdZona] = useState('');
  const [correo, setCorreo] = useState('');
  const [tipoSangre, setTipoSangre] = useState('');
 // Asumo que necesitas cargar las zonas para el select.

  // ... (otros estados)

  // Este efecto secundario se ejecuta una vez cuando el componente se monta y siempre que cambie el idPaciente.
  useEffect(() => {
    if (idPaciente) {
      // Obtener la información actual del paciente
      const fetchPaciente = async () => {
        try {
          const paciente = await getPacienteById(idPaciente);
          setNombre(paciente.nombre);
          setApellidoP(paciente.apellidoP);
          setApellidoM(paciente.apellidoM);
          setFechaNacimiento(paciente.fechaNacimiento);
          setGenero(paciente.genero);
          setTelefono(paciente.telefono);
          setCi(paciente.ci);
          setStatus(paciente.status);
          setIdZona(paciente.idZona);
          setCorreo(paciente.correo);
          setTipoSangre(paciente.tipoSangre);

          // ... (actualizar otros estados)
        } catch (error) {
          console.error('Error al obtener el paciente:', error);
        }
      };
      fetchPaciente();
    }
  }, [idPaciente, getPacienteById]);

  // Aquí manejas el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const pacienteData = {
      nombre,
      apellidoP,
      apellidoM,
      fechaNacimiento,
      genero,
      telefono,
      ci,
      status: status === 'Activo' ? true : false, // Asegúrate de enviar un booleano
      idZona,
      correo,
      tipoSangre,
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
      const regex2 =/^[0-9\s]*$/;
      //verificar numero
      if(!regex2.test(telefono)){
        alert('El Telefono debe contener solo numeros');
        return;
      }
      //verificar ci
      if(!regex2.test(ci)){
        alert('El ci debe contener solo numeros');
        return;
      }
      await updatePaciente(idPaciente, pacienteData);
      alert('Paciente modificado con éxito');
    } catch (error) {
      alert('Error al modificar el paciente');
      console.error('Error al modificar el paciente:', error);
    }
  };


  return (
    <motion.div 
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-32"
    >
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Modificar Paciente</h2>
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
            {/* Fecha de Nacimiento */}
            <div>
              <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <input
                type="date"
                id="fechaNacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
          </div>
          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {/* CI */}
          <div>
            <label htmlFor="ci" className="block text-sm font-medium text-gray-700">CI</label>
            <input
              type="text"
              id="ci"
              value={ci}
              onChange={(e) => setCi(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Seleccione un status</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          {/* Zona */}
          <div>
            <label htmlFor="idZona" className="block text-sm font-medium text-gray-700">Zona</label>
            <select
              id="idZona"
              value={idZona}
              onChange={(e) => setIdZona(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {zonasPredefinidas.map((zona) => (
                <option key={zona.id} value={zona.id}>{zona.nombre}</option>
              ))}
            </select>
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
          {/* Tipo de Sangre */}
          <div>
            <label htmlFor="tipoSangre" className="block text-sm font-medium text-gray-700">Tipo de Sangre</label>
            <input
              type="text"
              id="tipoSangre"
              value={tipoSangre}
              onChange={(e) => setTipoSangre(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full py-2 px-8 bg-secondary font-semibold text-white rounded
            hover:bg-primary transition-all duration-300"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default ModificarPaciente;
