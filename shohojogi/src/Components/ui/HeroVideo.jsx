import React from "react";
import SearchBar from "./SearchBar";
import heroVideo from "../../assets/videos/hero_video.mp4";

export default function Hero() {
  return (
    <section className="relative h-[450px] md:h-[550px] w-full overflow-hidden lg:rounded-3xl shadow-xl">
      {/* Background Video */}
      <video
        autoPlay
        muted
        playsInline
        loop
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/5" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-center">
        <div className="px-6 md:px-10 lg:px-16">
          {/* Brand Eyebrow */}
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-300">
            Shohojogi • Your helping hand
          </p>

          {/* Heading */}
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
            Need a hand?
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
            Find skilled people around you and get things done without breaking
            a sweat.
          </p>

          {/* Search */}
          <div className="mt-10 w-full">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}
