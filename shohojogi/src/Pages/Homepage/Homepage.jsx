import React from "react";
import Navbar from "../../Components/ui/Navbar";
import { LayoutTextFlip } from "../../Components/ui/layout-text-flip";
import HeroVideo from "../../Components/ui/heroVideo";
import Services from "../../Components/ui/Services";
import Reviews from "../../Components/ui/Reviews";
import { NoiseBackground } from "../../Components/ui/noise-background";
import { useNavigate } from "react-router-dom";
import { CircleCheck, MapPin, Zap, Plus } from "lucide-react";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <main className="pt-20 md:pt-20">
        {/* HERO  */}
        <section className="mx-2 md:mx-4 lg:mx-8">
          <HeroVideo />
        </section>

        {/* SERVICE STRIP */}
        <div className="flex h-20 w-full items-center justify-center mt-6 mb-2 md:mt-8 md:mb-4">
          <div className="flex h-full w-4/5 md:w-3/5 items-center justify-center mb-0 bg-white ">
            <LayoutTextFlip
              text="Hire&nbsp;"
              words={[
                "Tutors",
                "Tour Guides",
                "Plumbers",
                "Electricians",
                "Chauffeurs",
                "Guards",
                "and more!",
              ]}
              duration="2500"
              boxTextColor="green-900"
            />
          </div>
        </div>

        {/* SERVICES */}
        <section className="px-4 pt-2 pb-8 md:px-8 md:pt-4 md:pb-14">
          <div className="mx-auto max-w-7xl">
            <Services />
          </div>
        </section>

        {/*  HOW IT WORKS */}
        <section className="bg-gray-50 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
                Simple & easy
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
                How Shohojogi works
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-500 md:text-lg">
                Getting the help you need shouldn't be complicated.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Step 1 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <span className="text-5xl font-bold text-green-600">01</span>

                <h3 className="mt-5 text-xl font-bold">Post a Job</h3>

                <p className="mt-3 leading-relaxed text-gray-500">
                  Tell us what you need and provide the details of your job.
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <span className="text-5xl font-bold text-green-600">02</span>

                <h3 className="mt-5 text-xl font-bold">
                  Find the Right Person
                </h3>

                <p className="mt-3 leading-relaxed text-gray-500">
                  Connect with people who have the skills you need.
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <span className="text-5xl font-bold text-green-600">03</span>

                <h3 className="mt-5 text-xl font-bold">Get It Done</h3>

                <p className="mt-3 leading-relaxed text-gray-500">
                  Work together, get the job done, and move on with your day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY SHOHOJOGI */}
        <section className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
                  Why Shohojogi?
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                  A simpler way to get things done.
                </h2>

                <p className="mt-5 max-w-xl text-gray-500 md:text-lg">
                  Shohojogi brings people who need help together with people who
                  have the skills to provide it.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-green-600 p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-white">
                    <CircleCheck className="h-5 w-5" strokeWidth={2.5} />
                  </div>

                  <h3 className="font-bold">Easy to Use</h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Find or offer services without unnecessary complexity.
                  </p>
                </div>

                <div className="rounded-2xl border border-green-600 p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-white">
                    <MapPin className="h-5 w-5" strokeWidth={2.5} />
                  </div>

                  <h3 className="font-bold">Local Connections</h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Connect with people who can help with everyday tasks.
                  </p>
                </div>

                <div className="rounded-2xl border border-green-600 p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-white">
                    <Zap className="h-5 w-5" strokeWidth={2.5} />
                  </div>

                  <h3 className="font-bold">Quick & Simple</h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Post a job and start looking for the right person.
                  </p>
                </div>

                <div className="rounded-2xl border border-green-600 p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-white">
                    <Plus className="h-5 w-5" strokeWidth={2.5} />
                  </div>

                  <h3 className="font-bold">More Services</h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Explore a growing collection of useful services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*REVIEWS */}
        <Reviews />

        {/* CTA */}
        <section className="px-3 pb-16 pt-10 md:px-6 md:pb-24">
          <div className="relative mx-auto flex min-h-[300px] max-w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-green-950 via-green-800 to-green-700 px-6 py-16 text-center shadow-xl md:min-h-[360px]">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-400/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-green-300/10 blur-3xl" />

            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-200">
                Ready when you are
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
                Need something done?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-green-50/80 md:text-lg">
                Find the right person and get it done without breaking a sweat.
              </p>

              <NoiseBackground
                containerClassName="mx-auto mt-8 w-fit rounded-full p-1"
                gradientColors={[
                  "rgb(255, 100, 150)",
                  "rgb(100, 150, 255)",
                  "rgb(255, 200, 100)",
                ]}
              >
                <button
                  onClick={() => navigate("/join")}
                  className="h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)] hover:-translate-y-px"
                >
                  Get Started! &rarr;
                </button>
              </NoiseBackground>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-950 px-6 py-12 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h2 className="text-2xl font-bold">Shohojogi</h2>

              <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-400">
                Your helping hand for finding and offering everyday services.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Explore</h3>

              <div className="mt-4 flex flex-col gap-2 text-sm text-gray-400">
                <button
                  onClick={() => navigate("/collections")}
                  className="w-fit cursor-pointer transition-colors hover:text-white"
                >
                  Services
                </button>

                <button
                  onClick={() => navigate("/find-work")}
                  className="w-fit cursor-pointer transition-colors hover:text-white"
                >
                  Find Work
                </button>

                <button
                  onClick={() => navigate("/hire-people")}
                  className="w-fit cursor-pointer transition-colors hover:text-white"
                >
                  Hire People
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Company</h3>

              <div className="mt-4 flex flex-col gap-2 text-sm text-gray-400">
                <button
                  onClick={() => navigate("/why-shohojogi")}
                  className="w-fit cursor-pointer transition-colors hover:text-white"
                >
                  Why Shohojogi
                </button>

                <button
                  onClick={() => navigate("/contact")}
                  className="w-fit cursor-pointer transition-colors hover:text-white"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-gray-500">
            © 2026 Shohojogi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
