
import { useState } from "react";
import Refe1 from "../assets/Refe1.png";
import Refe2 from "../assets/Refe2.png";
import Refe3 from "../assets/Refe3.png";
const Referencias = () => {
  const carouselItems = [
    {
        image: Refe1,
        title: "Cirugia Rinoseptoplastía Funcional y Estética.",
        description: "Rinoseptoplastía Funcional y Estética. Paciente de sexo femenino con dificultad respiratoria, Terminado la cirugía con funcionalidad al 𝟭𝟬𝟬% y un perfil Armonioso"
    },
    {
        image: Refe2,
        title: "Cirugía 𝐑𝐢𝐧𝐨𝐬𝐞𝐩𝐭𝐨𝐩𝐥𝐚𝐬𝐭𝐢́𝐚 𝐅𝐮𝐧𝐜𝐢𝐨𝐧𝐚𝐥.",
        description: "Paciente de sexo femenino que presentaba una desviación severa hacia fosa nasal izquierda, caída de la punta nasal y giba osteocartilaginosa. Realizó una Rinoseptoplastía funcional, mejorando la funcionalidad  y rotación de la punta nasal. Terminando la cirugía con Funcionalidad al 𝟭𝟬𝟬% y un perfil Armonioso."
    },
    {
        image: Refe3,
        title: "Cirugía Rinoseptoplastía Estructural.",
        description: "Paciente de sexo femenino con una desviación nasal severa hacia izquierda, acompañada de giba osteocartilaginosa y caída de la punta nasal. Se realizó una Rinoseptoplastía estructural corrigiendo la desviación nasal con rotación y definición de la punta nasal. Terminando la cirugía con funcionalidad al 𝟭𝟬𝟬% y un perfil armonioso."
    }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
      setCurrentSlide(prev => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
      setCurrentSlide(prev => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };
  return (
    // <div className="bg-white p-3 relative">
    <div className="bg-white p-3 relative">
                    <div className="w-1/3 mx-auto" style={{ scrollSnapType: 'x mandatory' }}>
                        {carouselItems.map((item, index) => (
                            <div key={index} style={{ display: currentSlide === index ? 'block' : 'none' }}>
                                <input className="sr-only peer" type="radio" name="carousel" id={`carousel-${index + 1}`} checked={currentSlide === index} />
                                <div className="w-full bg-white rounded-lg shadow-lg transition-all duration-300 opacity-0 peer-checked:opacity-100 peer-checked:z-10 z-0">
                                    <img className="rounded-t-lg w-full h-64" src={item.image} alt="" />
                                    <div className="py-4 px-8">
                                        <h1 className="hover:cursor-pointer mt-2 text-gray-900 font-bold text-2xl tracking-tight">{item.title}</h1>
                                        <p className="hover:cursor-pointer py-3 text-gray-600 leading-6">{item.description}</p>
                                    </div>
                                    <div className="absolute top-1/2 w-1/3 flex justify-between">
                                        <label onClick={handlePrevSlide} className="inline-block text-red-600 cursor-pointer -translate-x bg-white rounded-full shadow-md active:translate-y-0.5">
                                            &lt;
                                        </label>
                                        <label onClick={handleNextSlide} className="relative text-red-600 cursor-pointer -translate-x bg-white rounded-full shadow-md active:translate-y-0.5">
                                            &gt;
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
  )
};

export default Referencias;
