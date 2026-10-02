import React from "react";

function DashboardTabs({
    tabs,
    activeTab,
    onChange,
}) {
    return (
        <div className="mt-6 flex w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm lg:w-fit">
            {tabs.map((tab) => {
                const active = activeTab === tab.value;

                return (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => onChange(tab.value)}
                        className={`group flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${active
                                ? "bg-green-700 text-white shadow-sm"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                    >
                        {tab.label}

                        <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold transition ${active
                                    ? "bg-white/15 text-white"
                                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                                }`}
                        >
                            {tab.count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

export default DashboardTabs;