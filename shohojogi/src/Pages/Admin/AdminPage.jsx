import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MapPin,
  Search,
  Users,
  X,
  XCircle,
} from "lucide-react";

const initialJobs = [
  {
    id: 1,
    title: "Need a Plumber for Kitchen Sink",
    description:
      "Looking for an experienced plumber to fix a leaking kitchen sink and check the water connection.",
    client: "Rahim Ahmed",
    location: "Dhanmondi, Dhaka",
    budget: "৳1,500",
    posted: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    title: "House Cleaning Service",
    description:
      "Need someone for a complete house cleaning including bedrooms, kitchen, bathrooms and living room.",
    client: "Nusrat Jahan",
    location: "Uttara, Dhaka",
    budget: "৳2,500",
    posted: "4 hours ago",
    status: "pending",
  },
  {
    id: 3,
    title: "Math Tutor for Class 10",
    description:
      "Looking for a university student or experienced tutor to teach mathematics twice a week.",
    client: "Tanvir Hasan",
    location: "Mirpur, Dhaka",
    budget: "৳4,000/month",
    posted: "6 hours ago",
    status: "pending",
  },
  {
    id: 4,
    title: "Electrician Needed",
    description:
      "Need an electrician to install ceiling lights and repair a few electrical connections.",
    client: "Sadia Rahman",
    location: "Banani, Dhaka",
    budget: "৳2,000",
    posted: "Yesterday",
    status: "pending",
  },
  {
    id: 5,
    title: "Private Car Driver",
    description:
      "Looking for a reliable driver for daily transportation within Dhaka city.",
    client: "Fahim Chowdhury",
    location: "Gulshan, Dhaka",
    budget: "৳18,000/month",
    posted: "Yesterday",
    status: "approved",
  },
  {
    id: 6,
    title: "AC Servicing",
    description:
      "Need an experienced technician to service two split AC units at home.",
    client: "Mehedi Hasan",
    location: "Mohammadpur, Dhaka",
    budget: "৳1,800",
    posted: "2 days ago",
    status: "approved",
  },
  {
    id: 7,
    title: "Security Guard Required",
    description:
      "Looking for a responsible security guard for a residential building.",
    client: "Arif Khan",
    location: "Bashundhara, Dhaka",
    budget: "৳15,000/month",
    posted: "3 days ago",
    status: "rejected",
  },
  {
    id: 8,
    title: "Furniture Assembly",
    description: "Need help assembling a few newly purchased furniture items.",
    client: "Ayesha Islam",
    location: "Wari, Dhaka",
    budget: "৳1,200",
    posted: "4 days ago",
    status: "rejected",
  },
];

function StatCard({ icon: Icon, label, value, accent, red }) {
  let iconClasses = "bg-green-50 text-green-700";

  if (accent) {
    iconClasses = "bg-green-100 text-green-700";
  }

  if (red) {
    iconClasses = "bg-red-50 text-red-600";
  }

  return (
    <div className="rounded-2xl border border-green-100 bg-white p-5 text-gray-900 shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClasses}`}
        >
          <Icon size={20} />
        </div>

        <ChevronDown size={16} className="rotate-[-45deg] text-green-200" />
      </div>

      <p className="mt-5 text-sm font-medium text-gray-500">{label}</p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
        {value}
      </p>
    </div>
  );
}

function TabButton({ active, onClick, label, count }) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-green-700 text-white shadow-sm"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {label}

      <span
        className={`rounded-full px-2 py-0.5 text-xs ${
          active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function JobCard({ job, onApprove, onReject }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-200 hover:shadow-lg">
      {/* Green accent */}
      <div className="h-1.5 bg-green-700" />

      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold leading-snug text-gray-900">
              {job.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">Posted {job.posted}</p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              job.status === "pending"
                ? "bg-amber-50 text-amber-700"
                : job.status === "approved"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
            }`}
          >
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
          {job.description}
        </p>

        {/* Job information */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} className="shrink-0 text-green-700" />
            <span>{job.client}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="shrink-0 text-green-700" />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BriefcaseBusiness size={16} className="shrink-0 text-green-700" />
            <span>{job.budget}</span>
          </div>
        </div>

        {/* Actions */}
        {job.status === "pending" && (
          <div className="mt-auto flex gap-3 pt-6">
            <button
              onClick={() => onApprove(job.id)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              <Check size={17} />
              Approve
            </button>

            <button
              onClick={() => onReject(job.id)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <X size={17} />
              Reject
            </button>
          </div>
        )}

        {job.status === "approved" && (
          <div className="mt-auto pt-6">
            <div className="flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700">
              <CheckCircle2 size={17} />
              Job Approved
            </div>
          </div>
        )}

        {job.status === "rejected" && (
          <div className="mt-auto pt-6">
            <div className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600">
              <XCircle size={17} />
              Job Rejected
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ status }) {
  const messages = {
    pending: {
      icon: Clock3,
      title: "No pending jobs",
      description: "There are currently no jobs waiting for approval.",
    },
    approved: {
      icon: CheckCircle2,
      title: "No approved jobs",
      description: "Jobs that you approve will appear here.",
    },
    rejected: {
      icon: XCircle,
      title: "No rejected jobs",
      description: "Jobs that you reject will appear here.",
    },
  };

  const data = messages[status];
  const Icon = data.icon;

  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-700">
        <Icon size={25} />
      </div>

      <h3 className="mt-4 text-lg font-bold text-gray-900">{data.title}</h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
        {data.description}
      </p>
    </div>
  );
}

export default function AdminPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [activeTab, setActiveTab] = useState("pending");
  const [search, setSearch] = useState("");

  const approveJob = (id) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === id ? { ...job, status: "approved" } : job,
      ),
    );
  };

  const rejectJob = (id) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === id ? { ...job, status: "rejected" } : job,
      ),
    );
  };

  const stats = useMemo(() => {
    return {
      total: jobs.length,
      pending: jobs.filter((job) => job.status === "pending").length,
      approved: jobs.filter((job) => job.status === "approved").length,
      rejected: jobs.filter((job) => job.status === "rejected").length,
    };
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesStatus = job.status === activeTab;

      const searchText = search.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(searchText) ||
        job.description.toLowerCase().includes(searchText) ||
        job.client.toLowerCase().includes(searchText) ||
        job.location.toLowerCase().includes(searchText);

      return matchesStatus && matchesSearch;
    });
  }, [jobs, activeTab, search]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero / Header */}
      <section className="relative overflow-hidden bg-green-700">
        <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-700 to-green-900" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              <BriefcaseBusiness size={15} />
              Admin Dashboard
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Manage Jobs
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-green-50 sm:text-base">
              Review job requests submitted by users and approve or reject them
              before they become available to workers.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={BriefcaseBusiness}
            label="Total Jobs"
            value={stats.total}
          />

          <StatCard
            icon={Clock3}
            label="Pending"
            value={stats.pending}
            accent
          />

          <StatCard
            icon={CheckCircle2}
            label="Approved"
            value={stats.approved}
            accent
          />

          <StatCard
            icon={XCircle}
            label="Rejected"
            value={stats.rejected}
            red
          />
        </div>

        {/* Jobs section */}
        <section className="mt-8">
          {/* Section header */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Job Requests</h2>

              <p className="mt-1 text-sm text-gray-500">
                Review and manage submitted jobs.
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
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition duration-300 placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex w-full overflow-x-auto rounded-xl border border-gray-200 bg-white p-2 lg:w-fit">
            <TabButton
              active={activeTab === "pending"}
              onClick={() => setActiveTab("pending")}
              label="Pending"
              count={stats.pending}
            />

            <TabButton
              active={activeTab === "approved"}
              onClick={() => setActiveTab("approved")}
              label="Approved"
              count={stats.approved}
            />

            <TabButton
              active={activeTab === "rejected"}
              onClick={() => setActiveTab("rejected")}
              label="Rejected"
              count={stats.rejected}
            />
          </div>

          {/* Job cards */}
          <div className="mt-6">
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApprove={approveJob}
                    onReject={rejectJob}
                  />
                ))}
              </div>
            ) : (
              <EmptyState status={activeTab} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
