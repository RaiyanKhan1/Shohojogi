import React from 'react'
import { MagicCard } from './magic-card'
import Card from './Card'

const services = [{name:"Plumbing", src:"src/assets/icons/plumber.svg" }, 
                    {name: "Chauffeur", src:"src/assets/icons/car.svg"}, 
                    {name: "Repair Services", src:"src/assets/icons/repair.svg"}, 
                    {name: "Child Care", src:"src/assets/icons/outline-child-care.svg"}, 
                    {name: "Electrician", src:"src/assets/icons/electricity.svg"}]

const Services = () => {
  return (
    <div>
        <p className="font-quicksand text-3xl font-bold mb-10">Popular Services</p>
       
       <div className='flex flex-wrap  gap-3 mb-6 justify-between'>
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
        <button className='flex cursor-pointer w-3/5 h-1/2 gap-1 bg-green-700 text-white font-nunito-300 items-center rounded-xl justify-center shadow-[0px_1px_0px_rgba(0,0,100,0.12)] hover:-translate-y-px hover: hover:bg-green-600 hover:transition-all duration-150  hover:outline-green-700 hover:outline-offset-2 border border-green-500 border-r-green-500 border-b-2 hover:border-b-3 border-b-green-500'>
            Explore all
            <img src="src/assets/icons/arrow-right.svg" className="h-5 w-5"></img>
        </button>
       </div>
        
       
    </div>

    
    
  )
}

export default Services