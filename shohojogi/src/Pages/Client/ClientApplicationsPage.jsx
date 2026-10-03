import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    BriefcaseBusiness,
    CheckCircle2,
    Clock3,
    XCircle,
} from "lucide-react";

import StatCard from "../../Components/ui/StatCard";
import DashboardHero from "../../Components/ui/DashboardHero";
import DashboardSearch from "../../Components/ui/DashboardSearch";
import DashboardTabs from "../../Components/ui/DashboardTabs";
import ApplicationCard from "../../Components/ui/ApplicationCard";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

export default function ClientApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const [activeTab, setActiveTab] = useState("pending");
    const [search, setSearch] = useState("");

    const loadApplications = useCallback(async () => {
        if (!API_URL) {
            setError("API URL is not configured.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/client/applications`,
                {
                    credentials: "include",
                },
            );

            const data = await response.json().catch(() => []);

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to load applications.",
                );
            }

            setApplications(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(
                err.message || "Unable to connect to the server.",
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadApplications();
    }, [loadApplications]);

    const updateStatus = async (applicationId, status) => {
        if (!API_URL) {
            setError("API URL is not configured.");
            return;
        }

        setUpdatingId(applicationId);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/client/applications/${applicationId}/status`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                },
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to update application.",
                );
            }

            setApplications((current) =>
                current.map((application) =>
                    application._id === applicationId
                        ? {
                            ...application,
                            status: data.application.status,
                        }
                        : application,
                ),
            );
        } catch (err) {
            setError(
                err.message || "Unable to update application.",
            );
        } finally {
            setUpdatingId(null);
        }
    };

    // Accepting a worker requires paying through SSLCommerz first.
    const startPayment = async (applicationId) => {
        if (!API_URL) {
            setError("API URL is not configured.");
            return;
        }

        setUpdatingId(applicationId);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/payment/init/${applicationId}`,
                {
                    method: "POST",
                    credentials: "include",
                },
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok || !data.url) {
                throw new Error(
                    data.error || "Unable to start payment.",
                );
            }

            // Go to the SSLCommerz payment page.
            window.location.href = data.url;
        } catch (err) {
            setError(
                err.message || "Unable to start payment.",
            );
            setUpdatingId(null);
        }
    };

    // Rate the worker of an accepted application (1-5).
    // Returns true when saved so the card can close its rating form.
    const rateWorker = async (applicationId, rating) => {
        if (!API_URL) {
            setError("API URL is not configured.");
            return false;
        }

        setUpdatingId(applicationId);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/client/applications/${applicationId}/rating`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ rating }),
                },
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.error || "Unable to save rating.");
            }

            // Save this application's rating and refresh the worker's
            // average on every card for the same worker.
            setApplications((current) =>
                current.map((application) => {
                    const updated =
                        application._id === applicationId
                            ? { ...application, rating: data.application.rating }
                            : application;

                    return updated.worker?._id === data.worker._id
                        ? {
                            ...updated,
                            worker: {
                                ...updated.worker,
                                rating: data.worker.rating,
                                ratingCount: data.worker.ratingCount,
                            },
                        }
                        : updated;
                }),
            );

            return true;
        } catch (err) {
            setError(err.message || "Unable to save rating.");
            return false;
        } finally {
            setUpdatingId(null);
        }
    };

    const stats = useMemo(() => {
        const total = applications.length;

        const pending = applications.filter(
            (application) => application.status === "pending",
        ).length;

        const accepted = applications.filter(
            (application) => application.status === "accepted",
        ).length;

        const rejected = applications.filter(
            (application) => application.status === "rejected",
        ).length;

        return {
            total,
            pending,
            accepted,
            rejected,
        };
    }, [applications]);

    const filteredApplications = useMemo(() => {
        const query = search.trim().toLowerCase();

        return applications.filter((application) => {
            if (application.status !== activeTab) {
                return false;
            }

            if (!query) {
                return true;
            }

            const worker = application.worker;
            const task = application.task;

            const searchableText = [
                worker?.name,
                worker?.email,
                task?.taskName,
                task?.location,
                task?.budget,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableText.includes(query);
        });
    }, [applications, activeTab, search]);

    const tabs = useMemo(
        () => [
            {
                value: "pending",
                label: "Pending",
                count: stats.pending,
            },
            {
                value: "accepted",
                label: "Accepted",
                count: stats.accepted,
            },
            {
                value: "rejected",
                label: "Rejected",
                count: stats.rejected,
            },
        ],
        [stats],
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="min-h-screen pt-20">
                <DashboardHero
                    eyebrow="APPLICATIONS"
                    title="Manage Applications"
                    description="Review the people who applied to your tasks and choose the right worker for the job."
                    miniStats={[
                        {
                            label: "Pending",
                            value: stats.pending,
                            icon: Clock3,
                        },
                        {
                            label: "Accepted",
                            value: stats.accepted,
                            icon: CheckCircle2,
                        },
                    ]}
                    totalLabel="Total Applications"
                    totalValue={stats.total}
                />

                <div className="mx-auto max-w-[1450px] px-3 pb-12 sm:px-5 lg:px-7">
                    <section className="mt-6 grid grid-cols-4 gap-4">
                        <StatCard
                            icon={BriefcaseBusiness}
                            label="Total Applications"
                            value={stats.total}
                            description="Applications received"
                        />

                        <StatCard
                            icon={Clock3}
                            label="Pending"
                            value={stats.pending}
                            description="Waiting for review"
                        />

                        <StatCard
                            icon={CheckCircle2}
                            label="Accepted"
                            value={stats.accepted}
                            description="Workers selected"
                        />

                        <StatCard
                            icon={XCircle}
                            label="Rejected"
                            value={stats.rejected}
                            description="Applications declined"
                        />
                    </section>

                    <section className="mt-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-green-700">
                                    Application Management
                                </p>

                                <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                                    Worker Applications
                                </h2>

                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Review applicants for your posted tasks and manage
                                    their application status.
                                </p>
                            </div>

                            <DashboardSearch
                                value={search}
                                onChange={setSearch}
                                placeholder="Search applications..."
                            />
                        </div>

                        {error && (
                            <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                <span>{error}</span>

                                <button
                                    type="button"
                                    onClick={loadApplications}
                                    className="shrink-0 cursor-pointer rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-red-700 shadow-sm transition hover:bg-red-100"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        <DashboardTabs
                            tabs={tabs}
                            activeTab={activeTab}
                            onChange={setActiveTab}
                        />
                    </section>

                    <section className="mt-6">
                        {loading ? (
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="h-[430px] animate-pulse rounded-2xl border border-gray-200 bg-white"
                                    />
                                ))}
                            </div>
                        ) : filteredApplications.length > 0 ? (
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {filteredApplications.map((application) => (
                                    <ApplicationCard
                                        key={application._id}
                                        application={application}
                                        updating={
                                            updatingId === application._id
                                        }
                                        onAccept={() =>
                                            startPayment(application._id)
                                        }
                                        onReject={() =>
                                            updateStatus(
                                                application._id,
                                                "rejected",
                                            )
                                        }
                                        onRate={(rating) =>
                                            rateWorker(application._id, rating)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                tab={
                                    activeTab === "pending"
                                        ? "pending"
                                        : activeTab === "accepted"
                                            ? "accepted"
                                            : "rejected"
                                }
                                hasSearch={Boolean(search.trim())}
                            />
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

function EmptyState({ tab, hasSearch }) {
    const labels = {
        pending: "pending applications",
        accepted: "accepted applications",
        rejected: "rejected applications",
    };

    return (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <BriefcaseBusiness size={25} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900">
                No {labels[tab]} found
            </h3>

            <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
                {hasSearch
                    ? "Try adjusting your search to find the application you're looking for."
                    : `There are currently no ${labels[tab]} for your tasks.`}
            </p>
        </div>
    );
}
