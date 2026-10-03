import React, { useState } from "react";
import {
    Award,
    BriefcaseBusiness,
    CalendarDays,
    Check,
    Clock3,
    Mail,
    MapPin,
    UserRound,
    WalletCards,
    X,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

function ApplicationCard({
    application,
    updating = false,
    onAccept,
    onReject,
    onRate,
}) {
    const worker = application?.worker;
    const task = application?.task;

    const status = application?.status || "pending";

    // Rating given by this client for this application (1-5), if any.
    const myRating = application?.rating ?? null;
    const [editingRating, setEditingRating] = useState(false);
    const [selectedRating, setSelectedRating] = useState(null);

    const workerRatingCount = worker?.ratingCount || 0;
    const workerRating =
        workerRatingCount > 0
            ? `${Number(worker.rating).toFixed(1)} / 5`
            : "No ratings yet";

    const submitRating = async () => {
        if (!selectedRating || !onRate) return;

        const saved = await onRate(selectedRating);

        if (saved) {
            setEditingRating(false);
            setSelectedRating(null);
        }
    };

    const appliedDate = application?.createdAt
        ? new Date(application.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "Unavailable";

    const budget =
        task?.budget !== undefined && task?.budget !== null
            ? `৳${Number(task.budget).toLocaleString()}`
            : "Not specified";

    const deadline = task?.deadline
        ? new Date(task.deadline).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "Not specified";

    const statusDot =
        status === "accepted"
            ? "bg-green-600"
            : status === "rejected"
                ? "bg-red-500"
                : "bg-amber-400";

    return (
        <article className="group relative flex h-full min-w-0 flex-col overflow-visible rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">
            <div className="flex flex-1 flex-col p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span
                                className={`h-2 w-2 shrink-0 rounded-full ${statusDot}`}
                            />

                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-green-700">
                                Worker Application
                            </p>
                        </div>

                        <h3 className="mt-1.5 line-clamp-2 min-h-[44px] text-[17px] font-bold leading-6 text-gray-900">
                            {task?.taskName || "Task unavailable"}
                        </h3>
                    </div>

                    <StatusBadge status={status} />
                </div>

                {/* Applied */}
                <p className="mt-2 text-xs text-gray-400">
                    Applied {appliedDate}
                </p>

                {/* Applicant */}
                <div className="mt-4 flex min-w-0 items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                        <UserRound size={15} />
                    </div>

                    <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                            Applicant
                        </p>

                        <p className="truncate text-sm font-semibold text-gray-800">
                            {worker?.name || "Unknown worker"}
                        </p>
                    </div>
                </div>

                {/* Worker Rating */}
                <div className="mt-3 flex min-w-0 items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                        <Award size={15} />
                    </div>

                    <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                            Worker Rating
                        </p>

                        <p className="truncate text-sm font-semibold text-gray-800">
                            {workerRating}
                            {workerRatingCount > 0 && (
                                <span className="ml-1.5 text-xs font-medium text-gray-400">
                                    ({workerRatingCount}{" "}
                                    {workerRatingCount === 1 ? "rating" : "ratings"})
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Worker Email */}
                <div className="mt-3 flex min-w-0 items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                        <Mail size={15} />
                    </div>

                    <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                            Email
                        </p>

                        <p className="truncate text-sm font-semibold text-gray-800">
                            {worker?.email || "Email unavailable"}
                        </p>
                    </div>
                </div>

                {/* Location */}
                <div className="mt-3 flex min-w-0 items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                        <MapPin size={15} />
                    </div>

                    <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                            Location
                        </p>

                        <p className="truncate text-sm font-semibold text-gray-800">
                            {task?.location || "Not specified"}
                        </p>
                    </div>
                </div>

                {/* Budget / Deadline */}
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                    <div className="flex min-w-0 items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                            <WalletCards size={14} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[11px] font-medium text-gray-400">
                                Budget
                            </p>

                            <p className="truncate text-sm font-semibold text-gray-800">
                                {budget}
                            </p>
                        </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                            <CalendarDays size={14} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[11px] font-medium text-gray-400">
                                Deadline
                            </p>

                            <p className="truncate text-sm font-semibold text-gray-800">
                                {deadline}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Task Details */}
                {task?.details && (
                    <div className="mt-4">
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <BriefcaseBusiness size={14} />

                            <span className="text-[10px] font-bold uppercase tracking-wider">
                                Task Details
                            </span>
                        </div>

                        <p className="mt-1 line-clamp-2 text-sm leading-5 text-gray-500">
                            {task.details}
                        </p>
                    </div>
                )}

                {/* Bottom actions */}
                <div className="relative mt-auto pt-5">
                    {/* Pending */}
                    {status === "pending" && (
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                disabled={updating}
                                onClick={onAccept}
                                className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-green-500 bg-green-600 text-xs font-semibold text-white cursor-pointer transition-colors duration-200 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Check size={15} />

                                {updating ? "Saving..." : "Accept"}
                            </button>

                            <button
                                type="button"
                                disabled={updating}
                                onClick={onReject}
                                className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-rose-600 bg-rose-700 text-xs font-semibold text-white cursor-pointer transition-colors duration-200 hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <X size={15} />
                                Reject
                            </button>
                        </div>
                    )}

                    {/* Accepted */}
                    {status === "accepted" && (
                        <div className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-green-50 text-xs font-semibold text-green-700">
                            <Check size={15} />
                            Worker Accepted
                        </div>
                    )}

                    {/* Rate the accepted worker */}
                    {status === "accepted" && onRate && (
                        <div className="mt-2 rounded-xl border border-gray-200 p-3">
                            {myRating && !editingRating ? (
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-xs text-gray-500">
                                        Your rating:{" "}
                                        <span className="text-sm font-bold text-gray-900">
                                            {myRating} / 5
                                        </span>
                                    </p>

                                    <button
                                        type="button"
                                        disabled={updating}
                                        onClick={() => {
                                            setSelectedRating(myRating);
                                            setEditingRating(true);
                                        }}
                                        className="cursor-pointer text-xs font-semibold text-green-700 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        Change
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                        Rate this worker (1-5)
                                    </p>

                                    <div className="mt-2 grid grid-cols-5 gap-1.5">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <button
                                                key={value}
                                                type="button"
                                                disabled={updating}
                                                onClick={() => setSelectedRating(value)}
                                                aria-pressed={selectedRating === value}
                                                className={`h-8 rounded-lg border text-sm font-semibold cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                                                    selectedRating === value
                                                        ? "border-green-700 bg-green-700 text-white"
                                                        : "border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50"
                                                }`}
                                            >
                                                {value}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-2 flex gap-2">
                                        <button
                                            type="button"
                                            disabled={!selectedRating || updating}
                                            onClick={submitRating}
                                            className="flex h-8 flex-1 items-center justify-center rounded-lg bg-green-600 text-xs font-semibold text-white cursor-pointer transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {updating ? "Saving..." : "Submit rating"}
                                        </button>

                                        {editingRating && (
                                            <button
                                                type="button"
                                                disabled={updating}
                                                onClick={() => {
                                                    setEditingRating(false);
                                                    setSelectedRating(null);
                                                }}
                                                className="h-8 rounded-lg px-3 text-xs font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Rejected */}
                    {status === "rejected" && (
                        <div className="flex h-9 items-center justify-center gap-1.5 rounded-xl bg-red-50 text-xs font-semibold text-red-600">
                            <X size={15} />
                            Application Rejected
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

export default ApplicationCard;