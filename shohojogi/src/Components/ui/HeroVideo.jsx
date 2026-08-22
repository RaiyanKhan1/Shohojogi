import SearchBar from "./SearchBar";

export default function Hero() {

  return (
    <div className="flex relative h-100 md:h-150 w-auto overflow-hidden lg:rounded-3xl mb-5 shadow-lg">
      
      <video
        autoPlay
        muted
        playsInline
        loop
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="src\assets\videos\hero_video.mp4" type="video/mp4" />
        </video>

     
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/25 to-transparent" />

      
      <div className="relative z-10 flex flex-col h-full w-full items-start justify-around md:p-6">
        <div className="max-w-3xl px-6 items-start text-white">
          <h1 className="text-5xl font-bold md:text-7xl">
            Need a hand?
          </h1>

          <p className="mt-6 text-lg md:text-xl">
            Find trusted people to get it done, without breaking a sweat
          </p>

        </div>
       <SearchBar/>
        
      
      
      </div>
      
      

    </div>
  );
}