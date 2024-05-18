import { useState } from 'react';

import {motion} from 'framer-motion'; 
import {fadeIn } from '../variants';
const Princing = () => {

    const [isYearly, setIsYearly] = useState(false);
    const packages = [
        {name:"Consulta Integral",monthlyPrice: 70, yearlyPrice: 50, description: "Um exame inicial para conhecermos e diagnosticar o paciente"},
        {name:"Renovar Receita",monthlyPrice: 20, yearlyPrice: 10, description: "Renovação de receita mais ágil"},
        {name:"Retorno de Consultas e Exames",monthlyPrice: 20, yearlyPrice: 10, description: "Retornos para avaliações"},
    ]
    return (
        <div className="md:px-14 p-4 max-w-s mx-auto py-10" id='precios'>
            {/*toggle*/ }
            <div className="text-center">
                <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Nossos serviços</h2>
                <p className="text-tartiary md:w-1/3 mx-auto px-4">Preços estimados para nossas consultas, sujeitos a personalização segundo suas necessidades.</p>    

                <div className="mt-16">
                    <label htmlFor="toggle" className="inline-flex items-center cursor-pointer">
                        <span className="mr-8 text-2xl font-semibold">Avaliação Inicial</span>
                        <div className="w-14 h-6 bg-gray-300 rounded-full transition duration-200 ease-in-out">
                            <div className={`w-6 h-6 rounded-full transition duration-200 ease-in-out ${isYearly ? "bg-primary ml-8" : "bg-gray-500"}`}>
                            </div>
                        </div>
                        <span className="ml-8 text-2xl font-semibold">Consulta Continua</span>
                    </label>
                    <input type="checkbox" id="toggle" className="hidden" checked={isYearly} onChange={() =>
                    setIsYearly(!isYearly)} />
                </div>       

            </div>
            {/*cards prices*/ }
            <motion.div 
            variants={fadeIn('up',0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once:false,amount:0.5}}
            
            
            className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20 md:w-11/12 mx-auto'>
                {
                    packages.map((pkg,index) => <div key={index} className="border py-10 md:px-6 px-4 rounded-lg shadow-3xl">
                        <h3 className='text-3xl font-bold text-center text-primary'>{pkg.name}</h3>
                        <p className='text-center text-tartiary my-5'>{pkg.description}</p>
                        <p className='mt-5 text-center text-secondary text-4xl font bold'>
                           {isYearly ? `$${pkg.yearlyPrice}`: `$${pkg.monthlyPrice}`}<span className='text-base text-tartary font-medium'>/{isYearly ? 'Consulta Continua':'Evaluación Inicial'}</span>
                        </p>
                    </div>)
                }
            </motion.div>

        </div>
    );
};
export default Princing;