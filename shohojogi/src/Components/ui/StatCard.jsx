import React from "react";

function StatCard({ icon: Icon, label, value, description }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Decorative background circle */}
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-green-50 transition-transform duration-300 group-hover:scale-125" />

            <div className="relative flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {label}
                    </p>

                    <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        {description}
                    </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <Icon size={21} />
                </div>
            </div>
        </div>
    );
}

export default StatCard;