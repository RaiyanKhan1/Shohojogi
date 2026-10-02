import React from "react";
import { Search } from "lucide-react";

function DashboardSearch({
    value,
    onChange,
    placeholder = "Search...",
}) {
    return (
        <div className="relative w-full lg:w-80">
            <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
            />
        </div>
    );
}

export default DashboardSearch;