

import Banner from '../components/shared/Banner';
import logo from '../assets/lo1.png';

const Home = () => {
    return (
        <div className="md:px-12 p-4 max-w-screen-2xl mx-auto mt-24" id='home'>
            <Banner banner={logo} heading="Clínica Renova AÍ" 
            subheading="Nossa equipe de médicos altamente qualificados e especializados está comprometida com o seu bem-estar e se esforça para lhe oferecer cuidados de saúde da mais alta qualidade em um ambiente caloroso e acolhedor. Reservamos um tempo para ouvir suas preocupações, responder às suas perguntas e elaborar um plano de tratamento personalizado que atenda às suas necessidades individuais.
            Obrigado por escolher nossa clínica online para seu atendimento médico. Estamos ansiosos para atendê-lo e ajudá-lo a alcançar a saúde ideal!"
           />
        
        </div>
    );
}    
export default Home;