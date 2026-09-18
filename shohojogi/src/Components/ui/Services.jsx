import React from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, CarFront, Hammer, Baby, Zap, ArrowRight } from "lucide-react";

const services = [
  {
    name: "Plumbing",
    description: "Fix leaks, pipes & more",
    icon: Wrench,
  },
  {
    name: "Chauffeur",
    description: "Reliable rides when needed",
    icon: CarFront,
  },
  {
    name: "Repair Services",
    description: "Get things fixed quickly",
    icon: Hammer,
  },
  {
    name: "Child Care",
    description: "Trusted help for your kids",
    icon: Baby,
  },
  {
    name: "Electrician",
    description: "Electrical work made easy",
    icon: Zap,
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-12 md:py-16">
      {/* Section Heading */}
      <div className="mb-8 md:mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
          What do you need?
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Popular Services
        </h2>

        <p className="mt-2 max-w-xl text-base leading-relaxed text-gray-500 md:text-lg">
          Find skilled people ready to help with your everyday needs.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <button
              key={service.name}
              onClick={() => navigate("/collections")}
              className="
                group relative flex min-h-[220px]
                cursor-pointer flex-col
                overflow-hidden rounded-2xl
                border border-gray-200
                bg-white p-5 text-left
                shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                transition-all duration-300
                hover:-translate-y-2
                hover:border-green-300
                hover:shadow-[0_12px_30px_rgba(34,197,94,0.15)]
                active:translate-y-0
                md:min-h-[240px] md:p-6
              "
            >
              {/* Subtle green glow */}
              <div
                className="
                  absolute -right-10 -top-10
                  h-24 w-24 rounded-full
                  bg-green-200/50
                  blur-2xl
                  transition-all duration-300
                  group-hover:scale-150
                  group-hover:bg-green-300/60
                "
              />

              {/* Icon */}
              <div
                className="
                relative flex h-14 w-14 shrink-0
                items-center justify-center
                rounded-2xl bg-green-800
                transition-all duration-300
                group-hover:scale-110
              group-hover:bg-green-700
                md:h-14 md:w-14"
              >
                <Icon
                  strokeWidth={2}
                  className="
                  h-7 w-7 text-white
                  transition-all duration-300
                  group-hover:scale-110
                  md:h-8 md:w-8"
                />
              </div>

              {/* Service Information */}
              <div className="relative mt-6 flex min-h-[78px] flex-col pr-10">
                <h3 className="text-lg font-bold leading-tight text-gray-900 md:text-xl">
                  {service.name}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-gray-500 md:text-sm">
                  {service.description}
                </p>
              </div>

              {/* Arrow */}
              <div
                className="
                  absolute bottom-5 right-5
                  flex h-8 w-8 shrink-0
                  items-center justify-center
                  rounded-full
                  border border-gray-200
                  bg-white
                  transition-all duration-300
                  group-hover:border-green-500
                  group-hover:bg-green-700
                  md:bottom-6 md:right-6
                "
              >
                <ArrowRight
                  className="
                    h-4 w-4 text-gray-700
                    transition-all duration-300
                    group-hover:translate-x-0.5
                    group-hover:text-white
                  "
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Explore All */}
      <div className="mt-9 flex justify-center">
        <button
          onClick={() => navigate("/collections")}
          className="
            group flex h-11 w-full max-w-xs
            cursor-pointer items-center justify-center
            gap-2 rounded-xl
            border border-green-500 border-b-2
            bg-green-700 px-6
            font-semibold text-white
            shadow-sm
            transition-all duration-200
            hover:-translate-y-0.5
            hover:bg-green-600
            hover:shadow-md
            active:translate-y-0
          "
        >
          Explore all
          <ArrowRight
            className="
              h-4 w-4
              transition-transform duration-200
              group-hover:translate-x-1
              md:h-5 md:w-5
            "
          />
        </button>
      </div>
    </section>
  );
};

export default Services;
