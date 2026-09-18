import { BackgroundRippleEffect } from "../../Components/ui/background-ripple-effect";
import React from "react";
import {
  Search,
  Users,
  BriefcaseBusiness,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  HandHelping,
} from "lucide-react";

function FeatureCard({ icon: Icon, number, heading, text }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-green-400 hover:shadow-[0_20px_50px_rgba(22,163,74,0.12)]">
      {/* Number */}
      <span className="absolute right-6 top-5 text-5xl font-bold text-gray-200 transition-colors duration-300 group-hover:text-green-200">
        {number}
      </span>

      {/* Icon */}
      <div className="relative z-10 mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition-all duration-300 group-hover:bg-green-700 group-hover:text-white">
        <Icon size={27} strokeWidth={1.8} />
      </div>

      <h3 className="relative z-10 text-xl font-semibold leading-snug text-gray-900 md:text-2xl">
        {heading}
      </h3>

      <p className="relative z-10 mt-4 leading-7 text-gray-500">{text}</p>

      <div className="mt-7 h-1 w-10 rounded-full bg-green-600 transition-all duration-300 group-hover:w-20" />
    </div>
  );
}

function Step({ number, heading, text }) {
  return (
    <div className="relative flex gap-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-700 text-lg font-bold text-white shadow-lg shadow-green-900/20">
        {number}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900">{heading}</h3>

        <p className="mt-2 leading-7 text-gray-500">{text}</p>
      </div>
    </div>
  );
}

const WhyShohojogi = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* =========================================================
          HERO — KEEPING YOUR BACKGROUND RIPPLE EFFECT
      ========================================================= */}

      <div className="relative flex h-150 xl:h-200 w-full flex-col items-start justify-start overflow-hidden rounded-2xl">
        <BackgroundRippleEffect rows={10} />

        <div className="mt-60 w-full px-6">
          <h2 className="relative z-10 mx-auto max-w-5xl text-center text-5xl font-bold tracking-tight text-neutral-800 md:text-6xl lg:text-7xl">
            Why{" "}
            <span className="bg-linear-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
              Shohojogi?
            </span>
          </h2>

          <p className="relative z-10 mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-neutral-600">
            Because finding help, offering your skills, and getting things done
            should feel simple.
          </p>

          <div className="relative z-10 mt-8 flex justify-center">
            <a
              href="#why"
              className="group flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-green-700"
            >
              Discover why
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================
          INTRO
      ========================================================= */}

      <section id="why" className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-green-700">
            More than just a marketplace
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Built around people, not just services.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
            Shohojogi brings people who need help together with people who have
            the skills to provide it. No unnecessary complexity. Just useful
            connections that get things moving.
          </p>
        </div>

        {/* FEATURE CARDS */}

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            number="01"
            icon={Search}
            heading="Finding help becomes simple"
            text="Describe what you need and discover people who can actually help, without endless searching."
          />

          <FeatureCard
            number="02"
            icon={Users}
            heading="Real people. Real connections."
            text="Connect directly with people, communicate clearly, and make decisions with confidence."
          />

          <FeatureCard
            number="03"
            icon={BriefcaseBusiness}
            heading="Skills become opportunities"
            text="Have something to offer? Shohojogi gives your skills a place to meet people who need them."
          />
        </div>
      </section>

      {/* =========================================================
          GREEN STATEMENT SECTION
      ========================================================= */}

      <section className="px-6 pb-24 md:px-12 lg:px-20">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-linear-to-br from-green-950 via-green-900 to-green-700 px-8 py-16 md:px-16 md:py-20">
          {/* Decorative circles */}

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-300">
                The idea behind Shohojogi
              </p>

              <h2 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl">
                Everyone has something to offer.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-green-50/80">
                One person may need a plumber. Another may have the exact skills
                to fix the problem. Shohojogi creates the connection between
                them.
              </p>

              <div className="mt-8 flex items-center gap-3 text-white">
                <CheckCircle2 className="text-green-300" size={22} />
                <span>Simple connections</span>
              </div>

              <div className="mt-4 flex items-center gap-3 text-white">
                <CheckCircle2 className="text-green-300" size={22} />
                <span>Useful opportunities</span>
              </div>

              <div className="mt-4 flex items-center gap-3 text-white">
                <CheckCircle2 className="text-green-300" size={22} />
                <span>People helping people</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section className="bg-gray-50 px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-700">
              Simple by design
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              From need to solution.
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-500">
              We've kept the experience straightforward so you can spend less
              time figuring things out and more time getting them done.
            </p>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <Step
              number="1"
              heading="Post"
              text="Tell the community what you need."
            />

            <Step
              number="2"
              heading="Discover"
              text="Find people whose skills match your needs."
            />

            <Step
              number="3"
              heading="Connect"
              text="Talk directly and choose the right person."
            />

            <Step
              number="4"
              heading="Get it done"
              text="Turn a simple connection into a completed task."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          TWO SIDES
      ========================================================= */}

      <section className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-700">
              One platform
            </p>

            <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Two sides. One purpose.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {/* NEED HELP */}

            <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <Search size={27} />
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-widest text-green-700">
                Need a hand?
              </p>

              <h3 className="mt-3 text-3xl font-bold text-gray-900">
                Find someone who can help.
              </h3>

              <p className="mt-5 leading-7 text-gray-500">
                Whether it's fixing something, learning something, or getting a
                task done, find the people who have the skills you need.
              </p>

              <a
                href="/collections"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-gray-900 transition-colors hover:text-green-700"
              >
                Find help
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* OFFER SKILLS */}

            <div className="group rounded-3xl bg-gray-900 p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-white">
                <BriefcaseBusiness size={27} />
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-widest text-green-400">
                Have a skill?
              </p>

              <h3 className="mt-3 text-3xl font-bold text-white">
                Turn your skills into opportunities.
              </h3>

              <p className="mt-5 leading-7 text-gray-400">
                Put your experience to work by discovering jobs and people
                looking for the services you can provide.
              </p>

              <a
                href="/find-work"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-green-400"
              >
                Find opportunities
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST / PROMISE
      ========================================================= */}

      <section className="px-6 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-white p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <ShieldCheck className="text-green-700" size={30} />

              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                Transparency
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                Clear information helps people make better decisions.
              </p>
            </div>

            <div>
              <Users className="text-green-700" size={30} />

              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                Community
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                We're building a platform around useful human connections.
              </p>
            </div>

            <div>
              <HandHelping className="text-green-700" size={30} />

              <h3 className="mt-5 text-xl font-semibold text-gray-900">
                Simplicity
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                The platform should make getting help easier, not harder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="px-6 pb-16 md:px-12 lg:px-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-linear-to-r from-green-700 to-green-600 px-8 py-16 text-center md:px-16">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Ready to find your Shohojogi?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-green-50/90">
              Whether you need a helping hand or have one to offer, there's a
              place for you here.
            </p>

            <a
              href="/join"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-green-800 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Get started
              <ArrowRight size={19} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyShohojogi;
