
import {  CalendarIcon, MapIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import "./contact.css";

const Contacts = () => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-10 items-center md:grid-cols-2"
    >
      <motion.div
        variants={{
          offscreen: {
            y: 150,
          },
          onscreen: {
            y: 0,
            transition: {
              type: "spring",
              bounce: 0.4,
              duration: 1,
            },
          },
        }}
        whileHover={{ scale: 1.02 }}

        className="cursor-pointer bg-secondary px-6 py-16 rounded-3xl h-full filter shadow-md relative md:px-10 m-3"
        >
        <h6 className="text-2xl font-bold text-secundary mb-4 dark:text-white">
          <a
            className="hover:underline"
          >
            Contactos
          </a>
          <span className="mt-4 text-xs flex items-center justify-start uppercase text-neutral-600 dark:text-neutral-300">
            <CalendarIcon className="h-4 mr-2 text-neutral-600 dark:text-neutral-300" />
            MAYO, 2021 - PRESENTE
          </span>
          <span className="mt-2 text-xs flex items-center justify-start uppercase text-neutral-600 dark:text-neutral-300">
            <MapIcon className="h-4 mr-2 text-neutral-600 dark:text-neutral-300" />
            Orajes C. 9
            La Paz, Departamento de La Paz
          </span>
        </h6>
        <div className="relative mb-4">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="uppercase px-2 bg-gray-50 text-sm text-gray-500 dark:bg-primary-500">
              Números de contacto
            </span>
          </div>
        </div>

        <ul className="text-base text-primary-400 list-inside list-disc dark:text-neutral-200">
          <li>
            Telefono: 2-2250513
          </li>
          <li>
            Celular: 
            <ul>
              <li>
                71265599
              </li>
              <li>
                73722420
              </li>
            </ul>
          </li>
          <li>
            Correo: <a href="mailto:dreduardotorrelio@gmail.com"> dreduardotorrelio@gmail.com</a>
              
          </li>
          <li>
            Horarios de atención:
            <ul>
              <li>
                Lunes-Miercoles-Viernes: 8:00 - 12:00, 15:00 - 19:00
              </li>
              <li>
                Sabado: 8:00 - 12:00
              </li>
            </ul>
          </li>

        </ul>
      </motion.div>
      
      
        <div className="responsive-iframe-container">
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d956.2522226498496!2d-68.1090566!3d-16.5256488!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sbo!4v1711206961513!5m2!1ses-419!2sbo"
            allowFullScreen 
            ></iframe>
        </div>
    </motion.div>
  );
};

export default Contacts;
