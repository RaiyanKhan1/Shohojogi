import React from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  UserRound,
  Check,
  X,
  Clock3,
  CheckCircle2,
  XCircle,
  Tag,
  ClipboardList,
  Info,
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
    rejected: {
      label: "Rejected",
      icon: XCircle,
      className: "bg-red-50 text-red-600 border-red-100",
    },
  };

  const item = config[status];
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

function JobCard({ job, openFlyoutId, setOpenFlyoutId, onApprove, onReject }) {
  const detailsOpen = openFlyoutId === `details-${job.id}`;
  const tagsOpen = openFlyoutId === `tags-${job.id}`;
  const requirementsOpen = openFlyoutId === `requirements-${job.id}`;

  // Keep the entire card above neighboring cards while a flyout is open.
  const flyoutOpen = detailsOpen || tagsOpen || requirementsOpen;

  const statusDot =
    job.status === "pending"
      ? "bg-amber-400"
      : job.status === "approved"
        ? "bg-green-600"
        : "bg-red-500";

  return (
    <article
      className={`group relative flex h-full min-w-0 flex-col overflow-visible rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl ${
        flyoutOpen ? "z-50" : "z-0"
      }`}
    >
      <div className="flex flex-1 flex-col p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 shrink-0 rounded-full ${statusDot}`} />

              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-green-700">
                Job Request
              </p>
            </div>

            <h3 className="mt-1.5 line-clamp-2 min-h-[44px] text-[17px] font-bold leading-6 text-gray-900">
              {job.title}
            </h3>
          </div>

          <StatusBadge status={job.status} />
        </div>

        {/* Posted */}
        <p className="mt-2 text-xs text-gray-400">Posted {job.posted}</p>

        {/* Client */}
        <div className="mt-4 flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
            <UserRound size={15} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Client
            </p>

            <p className="truncate text-sm font-semibold text-gray-800">
              {job.client}
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
              {job.location}
            </p>
          </div>
        </div>

        {/* Budget / Deadline */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
              <BriefcaseBusiness size={14} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-400">Budget</p>

              <p className="truncate text-sm font-semibold text-gray-800">
                {job.budget}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
              <CalendarDays size={14} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-400">Deadline</p>

              <p className="truncate text-sm font-semibold text-gray-800">
                {job.deadline}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="relative mt-auto pt-5">
          <div className="flex items-center gap-2">
            {/* DETAILS */}
            <div
              className="group/details relative"
              onMouseEnter={() => setOpenFlyoutId(`details-${job.id}`)}
              onMouseLeave={() => setOpenFlyoutId(null)}
            >
              <button
                type="button"
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 ${
                  detailsOpen
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                }`}
                aria-label="View details"
              >
                <Info size={16} />
              </button>

              {/* Details Flyout */}
              {detailsOpen && (
                <div
                  className="absolute bottom-full left-0 z-[60] mb-3 w-[320px] max-w-[calc(100vw-40px)] rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-2xl"
                  onMouseEnter={() => setOpenFlyoutId(`details-${job.id}`)}
                  onMouseLeave={() => setOpenFlyoutId(null)}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                      <Info size={17} />
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      Job Details
                    </p>
                  </div>

                  <p className="text-sm leading-6 text-gray-600">
                    {job.details}
                  </p>
                </div>
              )}

              {/* Tooltip */}
              {!detailsOpen && (
                <div className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/details:opacity-100">
                  View details
                </div>
              )}
            </div>

            {/* TAGS */}
            <div
              className="relative"
              onMouseEnter={() => setOpenFlyoutId(`tags-${job.id}`)}
              onMouseLeave={() => setOpenFlyoutId(null)}
            >
              <button
                type="button"
                className={`flex h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold transition-all duration-200 ${
                  tagsOpen
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <Tag size={14} />
                Tags
              </button>

              {/* Tags Flyout */}
              {tagsOpen && (
                <div
                  className="absolute bottom-full left-0 z-[60] mb-3 w-[280px] rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl"
                  onMouseEnter={() => setOpenFlyoutId(`tags-${job.id}`)}
                  onMouseLeave={() => setOpenFlyoutId(null)}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-700">
                      <Tag size={15} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                        Tags
                      </p>

                      <p className="text-[11px] text-gray-400">
                        Verification requirements
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* REQUIREMENTS */}
            <div
              className="relative"
              onMouseEnter={() => setOpenFlyoutId(`requirements-${job.id}`)}
              onMouseLeave={() => setOpenFlyoutId(null)}
            >
              <button
                type="button"
                className={`flex h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-semibold transition-all duration-200 ${
                  requirementsOpen
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <ClipboardList size={14} />
                Requirements
              </button>

              {/* Requirements Flyout */}
              {requirementsOpen && (
                <div
                  className="absolute bottom-full left-0 z-[60] mb-3 w-[290px] rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl"
                  onMouseEnter={() => setOpenFlyoutId(`requirements-${job.id}`)}
                  onMouseLeave={() => setOpenFlyoutId(null)}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-700">
                      <ClipboardList size={15} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                        Requirements
                      </p>

                      <p className="text-[11px] text-gray-400">
                        Things the worker should have
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {job.requirements.map((requirement) => (
                      <div
                        key={requirement}
                        className="flex items-start gap-2.5 rounded-lg bg-gray-50 px-3 py-2.5"
                      >
                        <Check
                          size={14}
                          className="mt-0.5 shrink-0 text-green-600"
                        />

                        <span className="text-xs leading-5 text-gray-600">
                          {requirement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Approve / Reject */}
          {job.status === "pending" && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onApprove(job.id)}
                className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-green-500 bg-green-600 text-xs font-semibold text-white cursor-pointer transition-colors duration-200 hover:bg-green-700"
              >
                <Check size={15} />
                Approve
              </button>

              <button
                type="button"
                onClick={() => onReject(job.id)}
                className="flex h-9 items-center justify-center gap-1.5 rounded-xl border bg-rose-700 border-rose-600 text-xs font-semibold text-white cursor-pointer transition-colors duration-200 hover:bg-rose-600"
              >
                <X size={15} />
                Reject
              </button>
            </div>
          )}

          {/* Approved */}
          {job.status === "approved" && (
            <div className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-xl bg-green-50 text-xs font-semibold text-green-700">
              <CheckCircle2 size={15} />
              Job Approved
            </div>
          )}

          {/* Rejected */}
          {job.status === "rejected" && (
            <div className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-xl bg-red-50 text-xs font-semibold text-red-600">
              <XCircle size={15} />
              Job Rejected
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default JobCard;
