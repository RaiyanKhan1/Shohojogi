import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  Search,
  BriefcaseBusiness,
  Clock3,
  CheckCircle2,
  XCircle,
  Settings,
  Menu,
} from "lucide-react";

import AdminPanel from "../../Components/ui/AdminPanel";
import JobCard from "../../Components/ui/JobCard";

// API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const ADMIN_API = `${API_URL.replace(/\/+$/, "")}/admin`;

// Convert backend Task -> JobCard format
function mapTaskToJob(task) {
  return {
    id: task._id,

    title: task.taskName,

    details: task.details || "",

    client: task.postedBy?.name || "Unknown user",

    clientEmail: task.postedBy?.email || "",

    location: task.location || "Not specified",

    budget:
      task.budget !== undefined && task.budget !== null
        ? `৳${Number(task.budget).toLocaleString()}`
        : "Not specified",

    deadline: task.deadline
      ? new Date(task.deadline).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "No deadline",

    tags: Array.isArray(task.tags) ? task.tags : [],

    requirements: Array.isArray(task.requirements) ? task.requirements : [],

    posted: task.createdAt ? getRelativeTime(task.createdAt) : "Recently",

    // New backend status system
    status: task.status || "pending",

    image: task.taskImage?.url || null,

    taskImage: task.taskImage || null,

    // Keep original backend task available
    rawTask: task,
  };
}

// Relative time
function getRelativeTime(dateValue) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const now = new Date();
  const difference = Math.floor((now - date) / 1000);

  if (difference < 60) {
    return "Just now";
  }

  const minutes = Math.floor(difference / 60);

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Stat Card
function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-green-50 transition-transform duration-300 group-hover:scale-125" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>

          <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-gray-400">{description}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}


// Tab Button
function TabButton({ active, onClick, label, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-200 ${
        active
          ? "bg-green-700 text-white shadow-sm"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {label}

      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold transition ${
          active
            ? "bg-white/15 text-white"
            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

// Empty State
function EmptyState({ tab }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
        <BriefcaseBusiness size={25} />
      </div>

      <h3 className="mt-4 text-lg font-bold text-gray-900">
        No {tab} jobs found
      </h3>

      <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
        There are currently no job requests matching this section or your
        search.
      </p>
    </div>
  );
}

// Admin Page
function AdminPage() {
  const [jobs, setJobs] = useState([]);

  const [activeTab, setActiveTab] = useState("pending");

  const [search, setSearch] = useState("");

  const [openFlyoutId, setOpenFlyoutId] = useState(null);

  const [activeSection, setActiveSection] = useState("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [actionLoadingId, setActionLoadingId] = useState(null);



  // Fetch Tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${ADMIN_API}/tasks`, {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to load tasks.");
      }

      const mappedJobs = Array.isArray(data) ? data.map(mapTaskToJob) : [];

      setJobs(mappedJobs);
    } catch (err) {
      console.error("Failed to fetch admin tasks:", err);

      setError(err.message || "Something went wrong while loading jobs.");
    } finally {
      setLoading(false);
    }
  }, []);


  //Load tasks when AdminPage opens
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

 // Statistics
  const stats = useMemo(() => {
    return {
      total: jobs.length,

      pending: jobs.filter((job) => job.status === "pending").length,

      approved: jobs.filter((job) => job.status === "approved").length,

      rejected: jobs.filter((job) => job.status === "rejected").length,
    };
  }, [jobs]);

  // Search + tab filtering

  const filteredJobs = useMemo(() => {
    const query = search.toLowerCase().trim();

    return jobs.filter((job) => {
      const matchesTab = job.status === activeTab;

      if (!matchesTab) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchableText = [
        job.title,
        job.details,
        job.client,
        job.clientEmail,
        job.location,
        job.budget,
        job.deadline,
        ...job.tags,
        ...job.requirements,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [jobs, activeTab, search]);

// Change task status through backend
  const updateTaskStatus = async (id, status) => {
    try {
      setActionLoadingId(id);
      setError("");

      const response = await fetch(`${ADMIN_API}/tasks/${id}/approval`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || `Failed to ${status} task.`);
      }

      if (data.task) {
        const updatedJob = mapTaskToJob(data.task);

        setJobs((currentJobs) =>
          currentJobs.map((job) => (job.id === id ? updatedJob : job)),
        );
      } else {
        setJobs((currentJobs) =>
          currentJobs.map((job) =>
            job.id === id
              ? {
                  ...job,
                  status,
                }
              : job,
          ),
        );
      }

      setOpenFlyoutId(null);
    } catch (err) {
      console.error(`Failed to update task ${id}:`, err);

      setError(err.message || `Failed to ${status} the task.`);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Approve
  const approveJob = (id) => {
    updateTaskStatus(id, "approved");
  };

  // Reject
  const rejectJob = (id) => {
    updateTaskStatus(id, "rejected");
  };

  const tabLabels = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Admin Panel */}
      <AdminPanel
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        pendingCount={stats.pending}
      />

      {/* Main */}

      <main className="min-h-screen lg:pl-[252px]">
        {/* Mobile top bar */}

        <div className="flex h-16 items-center border-b border-gray-200 bg-white px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600"
          >
            <Menu size={20} />
          </button>

          <span className="ml-3 text-sm font-bold text-gray-900">
            Admin Dashboard
          </span>
        </div>

        {activeSection === "dashboard" ? (
          <>
            {/* Hero */}

            <section className="relative mx-3 mt-3 overflow-hidden rounded-3xl bg-green-800 sm:mx-5 sm:mt-5 lg:mx-7">
              <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-green-500/20 blur-2xl" />

              <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

              <div className="absolute right-10 top-8 hidden h-32 w-32 rounded-full border border-white/10 lg:block" />

              <div className="absolute right-16 top-14 hidden h-20 w-20 rounded-full border border-white/10 lg:block" />

              <div className="relative mx-auto flex max-w-[1450px] flex-col gap-8 px-6 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-green-50">
                    ADMIN DASHBOARD
                  </div>

                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Manage Jobs
                  </h1>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-green-100 sm:text-base">
                    Review job requests, approve suitable posts, and keep the
                    Shohojogi marketplace organized.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-green-200">
                        Approved
                      </p>

                      <p className="mt-0.5 text-lg font-bold text-white">
                        {stats.approved}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-green-200">
                        Pending
                      </p>

                      <p className="mt-0.5 text-lg font-bold text-white">
                        {stats.pending}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hidden min-w-[220px] rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md lg:block">
                  <div className="flex items-center gap-2 text-green-100">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Total Requests
                    </span>
                  </div>

                  <p className="mt-2 text-4xl font-bold text-white">
                    {stats.total}
                  </p>

                  <p className="mt-2 text-[11px] text-green-200">
                    {stats.approved} currently approved
                  </p>
                </div>
              </div>
            </section>

            {/* Content */}

            <div className="mx-auto max-w-[1450px] px-3 pb-10 sm:px-5 lg:px-7">
              {/* Stats */}

              <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-4">
                <StatCard
                  icon={BriefcaseBusiness}
                  label="Total Jobs"
                  value={stats.total}
                  description="All submitted requests"
                />

                <StatCard
                  icon={Clock3}
                  label="Pending"
                  value={stats.pending}
                  description="Waiting for review"
                />

                <StatCard
                  icon={CheckCircle2}
                  label="Approved"
                  value={stats.approved}
                  description="Published requests"
                />

                <StatCard
                  icon={XCircle}
                  label="Rejected"
                  value={stats.rejected}
                  description="Declined requests"
                />
              </section>

              {/* Header */}

              <section className="mt-9">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                      Job Management
                    </p>

                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                      Job Requests
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Review and manage posts submitted by users.
                    </p>
                  </div>

                  {/* Search */}

                  <div className="relative w-full lg:w-80">
                    <Search
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Search jobs..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                    />
                  </div>
                </div>

                {/* Error */}

                {error && (
                  <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <span>{error}</span>

                    <button
                      type="button"
                      onClick={fetchTasks}
                      className="shrink-0 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold cursor-pointer text-red-700 transition hover:bg-red-100"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Tabs */}

                <div className="mt-6 flex w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm lg:w-fit">
                  <TabButton
                    active={activeTab === "pending"}
                    onClick={() => {
                      setActiveTab("pending");
                      setOpenFlyoutId(null);
                    }}
                    label="Pending"
                    count={stats.pending}
                  />

                  <TabButton
                    active={activeTab === "approved"}
                    onClick={() => {
                      setActiveTab("approved");
                      setOpenFlyoutId(null);
                    }}
                    label="Approved"
                    count={stats.approved}
                  />

                  <TabButton
                    active={activeTab === "rejected"}
                    onClick={() => {
                      setActiveTab("rejected");
                      setOpenFlyoutId(null);
                    }}
                    label="Rejected"
                    count={stats.rejected}
                  />
                </div>
              </section>

              {/* Jobs */}

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
                ) : filteredJobs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        openFlyoutId={openFlyoutId}
                        setOpenFlyoutId={setOpenFlyoutId}
                        onApprove={approveJob}
                        onReject={rejectJob}
                        actionLoadingId={actionLoadingId}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState tab={tabLabels[activeTab].toLowerCase()} />
                )}
              </section>
            </div>
          </>
        ) : (
          /* Settings */

          <div className="mx-auto max-w-[1450px] px-3 py-6 sm:px-5 lg:px-7 lg:py-8">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                  <Settings size={22} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                    Administration
                  </p>

                  <h1 className="mt-1 text-2xl font-bold text-gray-900">
                    Settings
                  </h1>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                    Admin settings can be added here later, including account
                    preferences, moderation settings, and platform controls.
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6">
                <p className="text-sm font-semibold text-gray-800">
                  Settings panel coming soon
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  This section is ready for the next admin features.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPage;
