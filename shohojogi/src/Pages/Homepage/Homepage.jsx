import React from 'react'
import Navbar from '../../Components/ui/Navbar'
import SearchBar from '../../Components/ui/SearchBar'
import { LayoutTextFlip } from '../../Components/ui/layout-text-flip'
import HeroVideo from '../../Components/ui/heroVideo'
import Services from '../../Components/ui/Services'
import { NoiseBackground } from '../../Components/ui/noise-background'
import { MagicCard } from '../../Components/ui/magic-card'

function Homepage(){
  return (
    <div>
        <Navbar />
        <div className="flex-col pt-15 md:pt-10 md:m-15">
        <HeroVideo />
        <div className='flex h-20 w-full items-center justify-center mb-10'>
            <div className="flex h-full w-4/5 md:w-3/5 items-center justify-center mb-0 bg-green-700 border border-green-500 border-b-2 rounded-3xl shadow-xl">
                <LayoutTextFlip text="Hire&nbsp;" words={["Plumbers" ,"Electricians", "Chauffeurs", "Guards", "Tutors", "and more!", ]}  duration="2500" boxTextColor="green-900"/>
            </div>
        </div>
        
        
        <Services />
        <div className='m-5'> </div>
        <div className="flex flex-col justify-center items-center gap-5 md:gap-10 h-50 md:h-100 w-auto md:rounded-2xl bg-linear-to-br from-green-950 via-green-800 to-green-700 md:border-2 border-green-500 border-b-3 shadow-[0px_1px_0px_rgba(0,0,0,0.2)]">
          <p className="text-2xl md:text-6xl text-white font-quicksand">Want to avail services instantly?</p>
      <NoiseBackground
        containerClassName="w-fit p-2 rounded-full mx-auto"
        gradientColors={[
          "rgb(255, 100, 150)",
          "rgb(100, 150, 255)",
          "rgb(255, 200, 100)",
        ]}
>
        <button className="h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)] hover:-translate-y-px">
          Get Started! &rarr;
        </button>
        </NoiseBackground>
        </div>

        
       
        </div>

        <div className='flex h-100 md:w-95% md:m-2 items-center justify-center md:rounded-2xl bg-linear-to-br from-slate-800 via-gray-900 to-gray-950'>
            <p className='text-4xl font-quicksand text-white font-bold'>&copy; Shohojogi</p>

        </div>
       

       
        
        
    </div>
  )
}

export default Homepage