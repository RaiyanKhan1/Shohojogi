import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Link } from "react-router-dom";
import {
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    Clock3,
    MapPin,
    XCircle,
} from "lucide-react";

import StatCard from "../../Components/ui/StatCard";
import StatusBadge from "../../Components/ui/StatusBadge";
import DashboardHero from "../../Components/ui/DashboardHero";
import DashboardSearch from "../../Components/ui/DashboardSearch";
import DashboardTabs from "../../Components/ui/DashboardTabs";
import AccessRestricted from "../../Components/ui/AccessRestricted";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

export default function WorkerApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [activeTab, setActiveTab] = useState("pending");
    const [search, setSearch] = useState("");

    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user || user.role !== "worker") {
        return (
        <AccessRestricted message="Only workers can access this page." />
    );
}

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
                `${API_URL}/worker/applications`,
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

    const stats = useMemo(() => {
        const count = (status) =>
            applications.filter(
                (application) => application.status === status,
            ).length;

        return {
            total: applications.length,
            pending: count("pending"),
            accepted: count("accepted"),
            rejected: count("rejected"),
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

            const task = application.task;

            const searchableText = [
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
                label: "Approved",
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
                    eyebrow="MY APPLICATIONS"
                    title="Track Your Applications"
                    description="See which of your task applications have been approved and which are still waiting for the client."
                    miniStats={[
                        {
                            label: "Pending",
                            value: stats.pending,
                            icon: Clock3,
                        },
                        {
                            label: "Approved",
                            value: stats.accepted,
                            icon: CheckCircle2,
                        },
                    ]}
                    totalLabel="Total Applications"
                    totalValue={stats.total}
                />

                <div className="mx-auto max-w-[1450px] px-3 pb-12 sm:px-5 lg:px-7">
                    <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <StatCard
                            icon={BriefcaseBusiness}
                            label="Total Applications"
                            value={stats.total}
                            description="Tasks you applied to"
                        />

                        <StatCard
                            icon={Clock3}
                            label="Pending"
                            value={stats.pending}
                            description="Waiting for client"
                        />

                        <StatCard
                            icon={CheckCircle2}
                            label="Approved"
                            value={stats.accepted}
                            description="You got the job"
                        />

                        <StatCard
                            icon={XCircle}
                            label="Rejected"
                            value={stats.rejected}
                            description="Not selected"
                        />
                    </section>

                    <section className="mt-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-green-700">
                                    Worker Dashboard
                                </p>

                                <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                                    My Applications
                                </h2>
                            </div>

                            <DashboardSearch
                                value={search}
                                onChange={setSearch}
                                placeholder="Search tasks..."
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
                                        className="h-[200px] animate-pulse rounded-2xl border border-gray-200 bg-white"
                                    />
                                ))}
                            </div>
                        ) : filteredApplications.length > 0 ? (
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {filteredApplications.map((application) => (
                                    <WorkerApplicationCard
                                        key={application._id}
                                        application={application}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                    <BriefcaseBusiness size={25} />
                                </div>

                                <h3 className="mt-4 text-lg font-bold text-gray-900">
                                    No applications found
                                </h3>

                                <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
                                    {search.trim()
                                        ? "Try adjusting your search."
                                        : "Applications you send will show up here."}
                                </p>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

function WorkerApplicationCard({ application }) {
    const task = application.task;

    const formatDate = (value) =>
        value
            ? new Date(value).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
            : "Not specified";

    const budget =
        task?.budget !== undefined && task?.budget !== null
            ? `৳${Number(task.budget).toLocaleString()}`
            : "Not specified";

    return (
        <article className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold text-gray-900">
                    {task?._id ? (
                        <Link
                            to={`/task/${task._id}`}
                            className="hover:text-green-700"
                        >
                            {task.taskName || "Untitled task"}
                        </Link>
                    ) : (
                        task?.taskName || "Task unavailable"
                    )}
                </h3>

                <StatusBadge
                    status={
                        application.status === "accepted"
                            ? "approved"
                            : application.status
                    }
                />
            </div>

            <p className="mt-3 text-xl font-bold text-green-700">{budget}</p>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                    <MapPin size={15} className="text-gray-400" />
                    {task?.location || "Not specified"}
                </p>

                <p className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-gray-400" />
                    Applied {formatDate(application.createdAt)}
                </p>
            </div>
        </article>
    );
}
