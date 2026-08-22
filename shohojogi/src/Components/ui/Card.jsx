import React from 'react'

function Card ({name, src}){
  return (
    <div className="container cursor-pointer flex-col h-60 w-50 border-none rounded-2xl  shadow-lg transition-all duration-300 hover:-translate-y-2">
        <div className="flex h-2/3 items-center justify-center border-b border-b-white">
            <img src={src} className=" h-12 w-12 rounded-full outline-gray-400/20 outline-1 outline-offset-10 ">
            </img>
        </div>
        <div className="flex h-1/3 items-center justify-center pb-6">
            <p className='text-gray-600'>{name}</p>
        </div>
        
    </div>
  )
}

export default Card