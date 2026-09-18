import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrench,
  Zap,
  BookOpen,
  CarFront,
  ShieldCheck,
  Hammer,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const services = [
  {
    name: "Plumbers",
    icon: Wrench,
    position: "left-0 top-4 sm:left-4 sm:top-8 lg:left-0 lg:top-10",
  },
  {
    name: "Electricians",
    icon: Zap,
    position: "right-0 top-4 sm:right-4 sm:top-8 lg:right-0 lg:top-10",
  },
  {
    name: "Tutors",
    icon: BookOpen,
    position: "left-0 bottom-20 sm:left-4 sm:bottom-24 lg:left-0 lg:bottom-24",
  },
  {
    name: "Chauffeurs",
    icon: CarFront,
    position:
      "right-0 bottom-20 sm:right-4 sm:bottom-24 lg:right-0 lg:bottom-24",
  },
  {
    name: "Guards",
    icon: ShieldCheck,
    position: "left-10 bottom-0 sm:left-16 sm:bottom-2 lg:left-14 lg:bottom-0",
  },
  {
    name: "Repair",
    icon: Hammer,
    position:
      "right-10 bottom-0 sm:right-16 sm:bottom-2 lg:right-14 lg:bottom-0",
  },
];

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-white px-5 py-14 sm:px-8 md:px-12 lg:px-16 lg:py-20">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-green-200/70 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[520px] w-[520px] rounded-full bg-green-200/60 blur-[110px]" />

      <div className="pointer-events-none absolute left-[45%] top-[35%] h-72 w-72 -translate-x-1/2 rounded-full bg-green-100/50 blur-[90px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Small brand label */}
        <div className="mb-8 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-600" />
          <span className="text-sm font-bold tracking-[0.16em] text-gray-400">
            SHOHOJOGI
          </span>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* LEFT SIDE */}
          <div>
            <h1 className="max-w-xl text-5xl font-black leading-[0.94] tracking-[-0.05em] text-gray-950 sm:text-6xl md:text-7xl">
              Everyone has
              <span className="block text-green-600">something to offer.</span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-gray-500 sm:text-lg">
              And everyone needs a little help sometimes. Shohojogi connects
              people who need something done with people who can do it.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/collections")}
                className="group flex items-center justify-center gap-3 rounded-full bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-600 hover:shadow-lg hover:shadow-green-600/20"
              >
                Find Help
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => navigate("/find-work")}
                className="group flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-800 transition-all duration-300 hover:border-green-500 hover:text-green-600"
              >
                Offer Your Skills
                <ArrowRight
                  size={15}
                  className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </button>
            </div>

            {/* Small supporting text */}
            <div className="mt-7 flex items-center gap-2 text-xs font-medium text-gray-400">
              <Sparkles size={14} className="text-green-600" />
              <span>
                From everyday tasks to specialized skills — there's always a way
                to help.
              </span>
            </div>
          </div>

          {/* RIGHT SIDE — NETWORK */}
          <div className="relative mx-auto h-[430px] w-full max-w-[600px] sm:h-[500px]">
            {/* Connection lines */}
            <div className="pointer-events-none absolute inset-0">
              {/* Horizontal */}
              <div className="absolute left-[17%] right-[17%] top-[38%] h-px bg-gray-200" />

              {/* Vertical */}
              <div className="absolute bottom-[20%] left-1/2 top-[18%] w-px -translate-x-1/2 bg-gray-200" />

              {/* Diagonal lines */}
              <div className="absolute left-[23%] top-[28%] h-px w-[27%] origin-right rotate-[20deg] bg-gray-200" />

              <div className="absolute right-[23%] top-[28%] h-px w-[27%] origin-left -rotate-[20deg] bg-gray-200" />

              <div className="absolute bottom-[29%] left-[23%] h-px w-[27%] origin-right -rotate-[20deg] bg-gray-200" />

              <div className="absolute bottom-[29%] right-[23%] h-px w-[27%] origin-left rotate-[20deg] bg-gray-200" />
            </div>

            {/* Center circle */}
            <div className="absolute left-1/2 top-1/2 z-20 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-48 sm:w-48">
              {/* Outer glow */}
              <div className="absolute inset-[-18px] rounded-full bg-green-100/60 blur-2xl" />

              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-green-200 bg-green-50" />

              {/* Main circle */}
              <div className="relative flex h-[calc(100%-14px)] w-[calc(100%-14px)] flex-col items-center justify-center rounded-full bg-gray-950 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-green-600">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <Sparkles size={17} className="text-green-400" />
                </div>

                <span className="text-xl font-black tracking-tight text-white sm:text-2xl">
                  Shohojogi
                </span>

                <span className="mt-1 text-[10px] font-medium tracking-wide text-gray-400">
                  PEOPLE CONNECTED
                </span>
              </div>
            </div>

            {/* Service cards */}
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.name}
                  className={`absolute z-10 ${service.position}`}
                >
                  <div
                    className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-[0_12px_35px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-[0_18px_40px_rgba(0,0,0,0.1)] sm:px-5 sm:py-4"
                    style={{
                      animationDelay: `${index * 120}ms`,
                    }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-900 sm:text-sm">
                        {service.name}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] text-gray-400">
                          Ready to help
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Top center label */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2">
              <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 shadow-sm">
                Skills
              </div>
            </div>

            {/* Bottom center label */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 shadow-sm">
                People
              </div>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-10 border-t border-gray-100 pt-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-gray-500">
              One place for{" "}
              <span className="font-bold text-gray-900">everyday help</span>.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Plumbers",
                "Electricians",
                "Tutors",
                "Chauffeurs",
                "Guards",
                "and more!",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
