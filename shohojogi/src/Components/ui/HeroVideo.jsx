import { useEffect, useRef, useState } from "react";
import { LayoutTextFlip } from "./layout-text-flip";
import SearchBar from "./SearchBar";

const videos = [
  "src/assets/videos/1.mp4",
  "src/assets/videos/3.mp4",
  "src/assets/videos/4.mp4",
  "src/assets/videos/5.mp4",
  "src/assets/videos/6.mp4",
  "src/assets/videos/7.mp4"
];

export default function Hero() {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.src = videos[currentVideo];
    video.load();

    video.play().catch((error) => {
      console.log("Autoplay failed:", error);
    });
  }, [currentVideo]);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="flex relative h-100 md:h-150 w-auto overflow-hidden md:rounded-3xl mb-5 shadow-lg">
      
      {/* Video */}
      <video
        ref={videoRef}
        onEnded={handleVideoEnd}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/25 to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col h-full w-full items-start justify-around md:p-6">
        <div className="max-w-3xl px-6 items-start text-white">
          <h1 className="text-5xl font-bold md:text-7xl">
            Need a hand?
          </h1>

          <p className="mt-6 text-lg md:text-xl">
            Find trusted people to get it done, without breaking a sweat
          </p>

          {/*<button className="mt-8 rounded-full bg-white px-6 py-3 font-semibold text-black">
            Get Started
          </button>*/}
        </div>
       <SearchBar/>
        
      
      
      </div>
      
      

    </div>
  );
}