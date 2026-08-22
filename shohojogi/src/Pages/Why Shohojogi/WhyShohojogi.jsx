import { BackgroundRippleEffect } from '../../Components/ui/background-ripple-effect'
import React from 'react'

function Card({heading, text}){
    return(
        <div className="flex flex-col justify-evenly gap-3 md:gap-0 h-10 md:h-70 min-w-0 flex-1 bg-white border-3 border-b-4 shadow-2xl  border-gray-300 hover:border-green-500 hover:-translate-y-2 transition-all duration-300 text-center p-6 rounded-2xl bg-linear-to-br from-slate-200 via-gray-100 to-white">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">{heading}</h1>
            <p className="text-gray-600 font-light">{text}</p>       
        </div>
      
    )
}

const WhyShohojogi = () => {
  return (
    <div className="flex flex-col h-full pt-10">
        <div className="relative flex h-150 xl:h-200 w-full flex-col items-start justify-start overflow-hidden rounded-2xl">
      <BackgroundRippleEffect rows={10} />
      <div className="mt-60 w-full">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-4xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
          Why <span className="bg-linear-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
    Shohojogi?
  </span>
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
          Scroll down to find out
        </p>
      </div>
    </div>
        
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10 p-10 m-5 md:m-15 md:p-15 w-auto rounded-2xl bg-linear-to-br from-green-950 via-green-800 to-green-700 border-2 border-green-500 border-b-3 shadow-[0px_1px_0px_rgba(0,0,0,0.2)]">
                
                <Card heading="Finding the Right Help Should Be Easy" text="Find the people and services you need, without the endless searching."/>
                <Card heading="Work Made Simpler. People Made Closer" text="Connect with people, get things done, and build meaningful connections along the way."/>
                <Card heading="A Better Way to Find and Offer Services" text="Discover useful services or put your own skills to work with Shohojogi."/>
        </div>
      
           
    </div>
            
  )
}

export default WhyShohojogi