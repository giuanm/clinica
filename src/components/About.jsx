import about from "../assets/about2.png";

import {motion} from 'framer-motion'; 
import {fadeIn } from '../variants';
const About = () => {
    
    return (
        <div className="md:px-14 p-4 max-w-s mx-auto space-y-10" id="informacion">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <motion.div 
                variants={fadeIn('right',0.2)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once:false,amount:0.7}}

                className="md:w-1/2">
                    <img src={about} alt="" />
                </motion.div>
                <motion.div 
                variants={fadeIn('left',0.3)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once:false,amount:0.7}}
                
                className="md:w-2/5">
                    <h2 className="md:text-5xl font-bold text-primary mb-5 leading-normal">Cuidado de Excelencia,
                    <span className="text-secondary"> resultados Excepcionais.</span></h2>
                    <p className="text-tariary text-lg mb-7">Aplicamos conhecimento avançado e equipamentos de ponta para oferecer tratamentos personalizados que fazem a diferença em sua saúde.</p>
                        <button className="btnPrimary">Começar</button>
                </motion.div>
            </div>
           
        </div>
    );
};
export default About;