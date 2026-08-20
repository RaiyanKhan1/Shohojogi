import React from 'react'

function SearchBar(){
  return (
    <div className=" flex h-15 w-full bg-none items-center rounded-full p-1">
      <div className="  flex h-full w-2/3 items-center m-4 p-1 rounded-full bg-white border border-gray-200 border-b-2 border-r-2 border-gray-300

    shadow-[2px_3px_0px_rgba(0,0,0,0.12)] focus-within:outline-3 focus-within:outline-[hsl(65,93%,43%)] focus-within:outline-offset-3 transition-all duration-150
    focus-within:-translate-y-px">

        <input type="text" placeholder="What do you need help with?" className="rounded-4xl h-full w-4/5 p-4 border-none outline-none">
        </input>
        <button className="flex items-center justify-center gap-2 h-full w-1/5 bg-green-700 rounded-full text-white text-2xl border border-green-800 border-b-2 border-r-2 shadow-[1px_1px_0px_rgba(255,255,255,0.3),6px_8px_12px_rgba(0,0,0,0.25)] hover:outline-2 hover:outline-offset-2 hover:transition-all hover:outline-black/50 ">
        <img src="src/assets/icons/search.svg" className="h-5 w-5"></img>
          Search
        </button>

      </div>
    </div>
  )
}

export default SearchBar