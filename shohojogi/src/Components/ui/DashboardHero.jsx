import React from "react";

function DashboardHero({
    eyebrow,
    title,
    description,
    miniStats = [],
    totalLabel,
    totalValue,
}) {
    return (
        <section className="relative mx-3 mt-3 overflow-hidden rounded-3xl bg-green-800 sm:mx-5 sm:mt-5 lg:mx-7">
            {/* Background decoration */}
            <div
                className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-green-500/20 blur-2xl"
                aria-hidden="true"
            />

            <div
                className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"
                aria-hidden="true"
            />

            <div
                className="absolute right-10 top-8 hidden h-32 w-32 rounded-full border border-white/10 lg:block"
                aria-hidden="true"
            />

            <div
                className="absolute right-16 top-14 hidden h-20 w-20 rounded-full border border-white/10 lg:block"
                aria-hidden="true"
            />

            {/* Content */}
            <div className="relative mx-auto flex max-w-[1450px] flex-col gap-8 px-6 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-10">
                {/* Left side */}
                <div className="max-w-2xl">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-green-50 backdrop-blur-sm">
                        {eyebrow}
                    </span>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        {title}
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-green-50/75 sm:text-base">
                        {description}
                    </p>

                    {/* Mini stats */}
                    {miniStats.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-3">
                            {miniStats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3.5 py-2 backdrop-blur-sm"
                                >
                                    {stat.icon && (
                                        <stat.icon
                                            size={15}
                                            className="text-green-100"
                                        />
                                    )}

                                    <span className="text-xs text-green-50/70">
                                        {stat.label}
                                    </span>

                                    <span className="text-sm font-bold text-white">
                                        {stat.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right side total panel */}
                {totalValue !== undefined && (
                    <div className="relative shrink-0 lg:mr-4">
                        <div className="rounded-2xl border border-white/10 bg-white/10 px-7 py-6 text-center backdrop-blur-md">
                            <p className="text-xs font-medium uppercase tracking-[0.16em] text-green-50/60">
                                {totalLabel}
                            </p>

                            <p className="mt-1 text-4xl font-bold tracking-tight text-white">
                                {totalValue}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default DashboardHero;