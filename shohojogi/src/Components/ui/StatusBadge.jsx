import React from "react";
import {
    Clock3,
    CheckCircle2,
    XCircle,
} from "lucide-react";

function StatusBadge({ status }) {
    const config = {
        pending: {
            label: "Pending",
            icon: Clock3,
            className: "bg-amber-50 text-amber-700 border-amber-100",
        },

        approved: {
            label: "Approved",
            icon: CheckCircle2,
            className: "bg-green-50 text-green-700 border-green-100",
        },

        accepted: {
            label: "Accepted",
            icon: CheckCircle2,
            className: "bg-green-50 text-green-700 border-green-100",
        },

        rejected: {
            label: "Rejected",
            icon: XCircle,
            className: "bg-red-50 text-red-600 border-red-100",
        },
    };

    const item = config[status] || config.pending;
    const Icon = item.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${item.className}`}
        >
            <Icon size={12} />
            {item.label}
        </span>
    );
}

export default StatusBadge;