import Banner from '../components/shared/Banner';

import doc from "../assets/doctor2.webp";

const Newsletter = () => {
  return (
    <div className="md:px-14 p-4 max-w-screen-2xl mx-auto my-12">
        <Banner

         banner={doc} heading="Dra. Eve M. Santos" subheading={
          <p>
            <p>Clínica Geral, Especializada em cuidados gerais com mais de 15 anos de experiência na área</p>
            <p>xxxxxxxxxxxxxx</p>
            <p className='text-bold'>Email: </p>
            <li>dra_santos_m_eve@gmail.com</li>
            
          </p>
        } />
    </div>
  );
}
export default Newsletter;