
import { useRef } from "react";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import imagen1 from "./image1.png";
import imagen2 from "./imagen2.jpg";
import imagen3 from "./imagen3.jpg";

function Home() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

    return (
        <home>
                <div className="home">
                    <div className="carouselContainer">
                        <Carousel 
                        autoPlay 
                        infiniteLoop
                        showThumbs={false}
                        showStatus={false}
                        showIndicators={false}
                        showArrows={false}
                        dynamicHeight={true}
                        >
                        <div>
                            <img src={imagen1} alt="tarjeta"/>
                        </div>
                        <div>
                            <img src={imagen2} alt="Image 2" />
                        </div>
                        <div>
                            <img src={imagen3} alt="Image 3" />
                        </div>
                        </Carousel>
                    </div>
                    <div className="home_text">
                        <h1>Clínica Otorrinolaringologica</h1>
                        <p>En nuestra clínica, nos dedicamos a proporcionar atención médica especializada y personalizada para todas sus necesidades relacionadas con el oído, la nariz y la garganta. Nos enorgullece ofrecer un enfoque integral y de vanguardia para el diagnóstico y tratamiento de una amplia gama de condiciones, desde problemas simples hasta casos más complejos.
                        Nuestro equipo de médicos altamente calificados y especializados está comprometido con su bienestar y se esfuerza por brindarle la más alta calidad de atención médica en un entorno cálido y acogedor. Nos tomamos el tiempo para escuchar sus inquietudes, responder a sus preguntas y diseñar un plan de tratamiento personalizado que se adapte a sus necesidades individuales.
                        Ya sea que esté buscando tratamiento para la pérdida de audición, sinusitis, ronquidos, problemas de equilibrio o cualquier otra condición relacionada con oído, nariz y garganta, estamos aquí para ayudarlo a sentirse mejor y recuperar su calidad de vida.
                        Gracias por elegir nuestra clínica para su atención médica. ¡Esperamos poder servirle y ayudarlo a alcanzar una salud óptima!</p>
                    </div>
                    
            </div>
        </home>        
    );
}

export default Home;