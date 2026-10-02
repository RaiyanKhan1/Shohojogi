import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  ExternalLink,
  MapPin,
  Search,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const VERIFICATIONS_API = `${API_URL.replace(/\/+$/, "")}/admin/verifications`;

const DOCUMENT_LABELS = {
  nidFront: "NID (Front)",
  nidBack: "NID (Back)",
  cv: "CV / Resume",
  policeClearance: "Police Clearance",
  utilityBill: "House Bill",
};

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

const TABS = ["pending", "approved", "rejected"];

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

function VerificationCard({ verification, onOpen }) {
  const { worker, documents, address, status, createdAt } = verification;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="grid h-36 grid-cols-2 gap-px bg-gray-100">
        <img
          src={documents?.nidFront?.url}
          alt="NID front"
          className="h-full w-full object-cover"
        />
        <img
          src={documents?.nidBack?.url}
          alt="NID back"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-bold text-gray-900">
              {worker?.name || "Unknown worker"}
            </h3>
            <p className="truncate text-sm text-gray-500">{worker?.email}</p>
          </div>
          <StatusBadge status={status} />
        </div>

        <p className="mt-3 flex items-start gap-2 text-sm text-gray-600">
          <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
          <span className="line-clamp-2">{address}</span>
        </p>

        <p className="mt-2 text-xs text-gray-400">
          Submitted {formatDate(createdAt)}
        </p>

        <button
          type="button"
          onClick={() => onOpen(verification)}
          className="mt-4 w-full cursor-pointer rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          {status === "pending" ? "Review documents" : "View documents"}
        </button>
      </div>
    </div>
  );
}

function ReviewModal({ verification, onClose, onReview, actionLoading }) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const { worker, documents, address, status, rejectionReason, reviewedAt } =
    verification;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-100 bg-white px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">
                {worker?.name}
              </h2>
              <StatusBadge status={status} />
            </div>
            <p className="text-sm text-gray-500">{worker?.email}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-50 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Present address
            </p>
            <p className="mt-1 text-sm text-gray-800">{address}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(DOCUMENT_LABELS).map(([key, label]) => (
              <a
                key={key}
                href={documents?.[key]?.url}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <img
                  src={documents?.[key]?.url}
                  alt={label}
                  className="h-44 w-full bg-gray-100 object-cover transition group-hover:opacity-90"
                />
                <div className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-gray-700">
                  {label}
                  <ExternalLink size={15} className="text-gray-400" />
                </div>
              </a>
            ))}
          </div>

          {status !== "pending" && (
            <p className="text-sm text-gray-500">
              Reviewed on {formatDate(reviewedAt)}
              {rejectionReason && (
                <span className="mt-1 block text-red-700">
                  Reason: {rejectionReason}
                </span>
              )}
            </p>
          )}

          {rejecting && (
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are these documents rejected? The worker will see this."
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
            />
          )}
        </div>

        <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-gray-100 bg-white px-6 py-4 sm:flex-row sm:justify-end">
          {rejecting ? (
            <>
              <button
                type="button"
                onClick={() => setRejecting(false)}
                className="cursor-pointer rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!reason.trim() || actionLoading}
                onClick={() => onReview("rejected", reason.trim())}
                className="cursor-pointer rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {actionLoading ? "Saving..." : "Confirm rejection"}
              </button>
            </>
          ) : (
            <>
              {status !== "rejected" && (
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => setRejecting(true)}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed"
                >
                  <XCircle size={17} />
                  Reject
                </button>
              )}
              {status !== "approved" && (
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => onReview("approved")}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  <BadgeCheck size={17} />
                  {actionLoading ? "Saving..." : "Approve & verify"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function WorkerVerifications() {
  const [verifications, setVerifications] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const fetchVerifications = async () => {
      try {
        const response = await fetch(VERIFICATIONS_API, {
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to load verifications.");
        }

        setVerifications(Array.isArray(data) ? data : []);
        setError("");
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchVerifications();
  }, [reloadKey]);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        TABS.map((tab) => [
          tab,
          verifications.filter((v) => v.status === tab).length,
        ]),
      ),
    [verifications],
  );

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    return verifications.filter((v) => {
      if (v.status !== activeTab) return false;
      if (!query) return true;
      return [v.worker?.name, v.worker?.email, v.address]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [verifications, activeTab, search]);

  const reviewVerification = async (status, rejectionReason) => {
    try {
      setActionLoading(true);
      setError("");

      const response = await fetch(
        `${VERIFICATIONS_API}/${selected._id}/review`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, rejectionReason }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || `Failed to ${status} verification.`);
      }

      // Keep the list's populated worker; the review response has fewer fields.
      setVerifications((current) =>
        current.map((v) =>
          v._id === selected._id
            ? { ...v, ...data.verification, worker: v.worker }
            : v,
        ),
      );
      setSelected(null);
    } catch (err) {
      setError(err.message || "Failed to update verification.");
      setSelected(null);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1450px] px-3 py-6 sm:px-5 lg:px-7 lg:py-8">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { tab: "pending", icon: Clock3, text: "Waiting for review" },
          { tab: "approved", icon: CheckCircle2, text: "Verified workers" },
          { tab: "rejected", icon: XCircle, text: "Declined requests" },
        ].map(({ tab, icon: Icon, text }) => (
          <div
            key={tab}
            className="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div>
              <p className="text-sm font-medium capitalize text-gray-500">
                {tab}
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                {counts[tab]}
              </p>
              <p className="mt-1 text-xs text-gray-400">{text}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
              <Icon size={21} />
            </div>
          </div>
        ))}
      </section>

      <section className="mt-9">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">
              Worker Verification
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
              Verification Requests
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Check worker documents and grant the verified badge.
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search workers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
            />
          </div>
        </div>

        {error && (
          <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setReloadKey((key) => key + 1);
              }}
              className="shrink-0 cursor-pointer rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
            >
              Retry
            </button>
          </div>
        )}

        <div className="mt-6 flex w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm lg:w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition-all duration-200 ${
                activeTab === tab
                  ? "bg-green-700 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {tab}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  activeTab === tab
                    ? "bg-white/15 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-2xl border border-gray-200 bg-white"
              />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((verification) => (
              <VerificationCard
                key={verification._id}
                verification={verification}
                onOpen={setSelected}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
              <ShieldCheck size={25} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No {activeTab} verifications
            </h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
              There are no worker verification requests in this section.
            </p>
          </div>
        )}
      </section>

      {selected && (
        <ReviewModal
          key={selected._id}
          verification={selected}
          onClose={() => setSelected(null)}
          onReview={reviewVerification}
          actionLoading={actionLoading}
        />
      )}
    </div>
  );
}

export default WorkerVerifications;
