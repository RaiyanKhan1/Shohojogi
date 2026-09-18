import React from "react";

const reviews = [
  {
    name: "Mohimenul Omi",
    role: "Homeowner",
    review:
      "I needed a plumber for a leaking kitchen sink and found someone quickly. The whole process was surprisingly simple.",
  },
  {
    name: "Sadia Islam",
    role: "Student",
    review:
      "Finding a tutor used to take so much time. Shohojogi made it much easier to find someone who matched what I needed.",
  },
  {
    name: "Muntasir Mahmud",
    role: "Service Provider",
    review:
      "I joined Shohojogi to find local work and got my first job shortly after. The platform is really straightforward.",
  },
  {
    name: "Mehreen Islam",
    role: "Customer",
    review:
      "I needed an electrician urgently and didn't know who to call. Shohojogi helped me find someone without the usual hassle.",
  },
  {
    name: "Shakibul Alam",
    role: "Chauffeur",
    review:
      "The platform gives service providers a simple way to connect with people who actually need their skills.",
  },
  {
    name: "Fariha Chowdhury",
    role: "Customer",
    review:
      "What I like most is how easy everything feels. You post what you need and can start looking for the right person.",
  },
];

function Reviews() {
  // Duplicate the reviews for seamless infinite scrolling
  const scrollingReviews = [...reviews, ...reviews];

  return (
    <section className="overflow-hidden bg-gray-50 py-20 md:py-25">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 px-6 text-center md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
            What people say
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
            Trusted by people like you.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500 md:text-lg">
            See what our users have to say about finding the right help.
          </p>
        </div>

        {/* Continuous Scrolling Reviews */}
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-[reviewScroll_35s_linear_infinite] gap-5 hover:[animation-play-state:paused]">
            {scrollingReviews.map((item, index) => (
              <div
                key={index}
                className="flex w-[300px] shrink-0 flex-col justify-between rounded-2xl border border-gray-800 bg-black p-6 md:w-[380px]"
              >
                {/* Stars */}
                <div>
                  <div className="mb-4 flex gap-1 text-lg text-green-500">
                    ★ ★ ★ ★ ★
                  </div>

                  <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                    {item.review}
                  </p>
                </div>

                {/* User */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 font-bold text-white">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes reviewScroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </section>
  );
}

export default Reviews;
