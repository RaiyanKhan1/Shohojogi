import React, { useMemo, useState } from "react";
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

const initialJobs = [
  {
    id: 1,
    title: "Need a Plumber for Kitchen Sink",
    details:
      "Looking for an experienced plumber to fix a leaking kitchen sink and replace the damaged pipe.",
    client: "Rahim Ahmed",
    location: "Dhanmondi, Dhaka",
    budget: "৳1,500",
    deadline: "Sep 20, 2026",
    tags: ["NID required", "Location verified"],
    requirements: ["2+ years experience", "Own tools", "Available this week"],
    posted: "2 hours ago",
    status: "pending",
  },

  {
    id: 2,
    title: "House Cleaning Service",
    details:
      "Need someone for a complete apartment cleaning including bedrooms, kitchen, bathrooms and balcony.",
    client: "Nusrat Jahan",
    location: "Uttara, Dhaka",
    budget: "৳2,000",
    deadline: "Sep 21, 2026",
    tags: ["NID required", "Location verified"],
    requirements: [
      "Professional experience",
      "Bring cleaning supplies",
      "Available morning",
    ],
    posted: "4 hours ago",
    status: "approved",
  },

  {
    id: 3,
    title: "Math Tutor for University Student",
    details:
      "Looking for a tutor who can help with calculus and differential equations twice a week.",
    client: "Tanvir Hasan",
    location: "Mirpur, Dhaka",
    budget: "৳3,000/month",
    deadline: "Sep 25, 2026",
    tags: ["CV required", "NID required", "Location verified"],
    requirements: [
      "Strong mathematics background",
      "University-level experience",
      "2 sessions per week",
    ],
    posted: "6 hours ago",
    status: "pending",
  },

  {
    id: 4,
    title: "Electrical Wiring Repair",
    details:
      "Need an electrician to inspect and repair faulty wiring in several rooms of a residential apartment.",
    client: "Sakib Rahman",
    location: "Banani, Dhaka",
    budget: "৳2,500",
    deadline: "Sep 22, 2026",
    tags: ["Police verification required", "NID required", "Location verified"],
    requirements: [
      "Licensed electrician",
      "Own equipment",
      "Safety gear required",
    ],
    posted: "8 hours ago",
    status: "rejected",
  },

  {
    id: 5,
    title: "Personal Driver Needed",
    details:
      "Looking for a reliable driver for regular city travel during weekdays.",
    client: "Farhan Karim",
    location: "Gulshan, Dhaka",
    budget: "৳18,000/month",
    deadline: "Sep 23, 2026",
    tags: ["Police verification required", "NID required", "Location verified"],
    requirements: [
      "Valid driving license",
      "3+ years driving experience",
      "Good knowledge of Dhaka",
    ],
    posted: "1 day ago",
    status: "pending",
  },

  {
    id: 6,
    title: "AC Servicing Required",
    details:
      "Need professional servicing for two split AC units. One unit is not cooling properly.",
    client: "Imran Chowdhury",
    location: "Mohammadpur, Dhaka",
    budget: "৳1,800",
    deadline: "Sep 20, 2026",
    tags: ["CV required", "NID required", "Location verified"],
    requirements: [
      "AC servicing experience",
      "Own tools",
      "Same-day availability preferred",
    ],
    posted: "1 day ago",
    status: "approved",
  },

  {
    id: 7,
    title: "Security Guard for Office",
    details:
      "Looking for a responsible security guard for a small office building.",
    client: "Mahmud Hasan",
    location: "Motijheel, Dhaka",
    budget: "৳12,000/month",
    deadline: "Sep 24, 2026",
    tags: ["Police verification required", "NID required", "Location verified"],
    requirements: [
      "Previous security experience",
      "Professional behavior",
      "Night shift availability",
    ],
    posted: "2 days ago",
    status: "pending",
  },

  {
    id: 8,
    title: "Furniture Assembly",
    details:
      "Need help assembling a wardrobe, study table and several shelves.",
    client: "Ayesha Rahman",
    location: "Bashundhara, Dhaka",
    budget: "৳1,200",
    deadline: "Sep 22, 2026",
    tags: ["NID required", "Location verified"],
    requirements: [
      "Furniture assembly experience",
      "Bring basic tools",
      "Careful handling",
    ],
    posted: "2 days ago",
    status: "approved",
  },
];

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

function TabButton({ active, onClick, label, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
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

function AdminPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [activeTab, setActiveTab] = useState("pending");
  const [search, setSearch] = useState("");
  const [openFlyoutId, setOpenFlyoutId] = useState(null);

  const [activeSection, setActiveSection] = useState("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = useMemo(() => {
    return {
      total: jobs.length,

      pending: jobs.filter((job) => job.status === "pending").length,

      approved: jobs.filter((job) => job.status === "approved").length,

      rejected: jobs.filter((job) => job.status === "rejected").length,
    };
  }, [jobs]);

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

  const approveJob = (id) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === id
          ? {
              ...job,
              status: "approved",
            }
          : job,
      ),
    );

    setOpenFlyoutId(null);
  };

  const rejectJob = (id) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === id
          ? {
              ...job,
              status: "rejected",
            }
          : job,
      ),
    );

    setOpenFlyoutId(null);
  };

  const tabLabels = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Admin Panel */}
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

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-white/70 transition-all"
                      style={{
                        width: `${
                          stats.total
                            ? Math.max(8, (stats.approved / stats.total) * 100)
                            : 0
                        }%`,
                      }}
                    />
                  </div>

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
                {filteredJobs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        openFlyoutId={openFlyoutId}
                        setOpenFlyoutId={setOpenFlyoutId}
                        onApprove={approveJob}
                        onReject={rejectJob}
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
