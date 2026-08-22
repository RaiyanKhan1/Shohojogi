import React from 'react'
import { MagicCard } from './magic-card'
import Card from './Card'
import { useNavigate } from 'react-router-dom';

const services = [{name:"Plumbing", src:"src/assets/icons/droplets.svg" }, 
                    {name: "Chauffeur", src:"src/assets/icons/taxi.svg"}, 
                    {name: "Repair Services", src:"src/assets/icons/wrench.svg"}, 
                    {name: "Child Care", src:"src/assets/icons/baby.svg"}, 
                    {name: "Electrician", src:"src/assets/icons/zap.svg"}]

const Services = () => {
  const navigate = useNavigate();
  return (
    <div className="m-2 lg:m-0 ">
        <p className="text-3xl font-bold p-4 lg:p-0 lg:mb-5">Popular Services</p>
       
       <div className='flex flex-wrap p-4 lg:p-0 gap-5 mb-6 justify-between items-start'>
        {services.map((element, index) => (
          <MagicCard 
            key={index}
            mode="orb" 
            className="flex rounded-2xl p-1 shadow-sm hover:border-b-2" 
            gradientSize="200" 
            gradientFrom="#296914" 
            gradientTo="#43cc16" 
            glowFrom="#f2f2f2" 
            glowTo="#f2f2f2"
          >
            <Card name={element.name} src={element.src} />
          </MagicCard>
        ))}
       </div>
       <div className="flex h-20 justify-center items-center">
        <button onClick={() => navigate("/collections")} className='flex cursor-pointer w-3/5 h-1/2 gap-1 bg-green-700 text-white font-nunito-300 items-center rounded-xl justify-center shadow-[0px_1px_0px_rgba(0,0,100,0.12)] hover:-translate-y-px hover: hover:bg-green-600 hover:transition-all duration-150  hover:outline-green-700 hover:outline-offset-2 border border-green-500 border-r-green-500 border-b-2 hover:border-b-3 border-b-green-500'>
            Explore all
            <img src="src/assets/icons/arrow-right.svg" className="h-4 w-4 md:h-5 md:w-5"></img>
        </button>
       </div>
        
       
    </div>

    
    
  )
}

export default Services