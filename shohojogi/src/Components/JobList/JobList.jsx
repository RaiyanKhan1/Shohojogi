import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, CalendarDays, Tag } from "lucide-react";
import "./JobList.css";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-title-block">
        {job.category && (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
            <Tag size={12} />
            {job.category}
          </span>
        )}
        <p className="job-title">{job.title}</p>
        {job.trustLevel && (
          <span
            className={`verify-tag verify-tag--${job.trustLevel.toLowerCase()}`}
          >
            {job.trustLevel === "Verified" && "✓ NID & CV Verified"}
            {job.trustLevel === "Trusted" && "✓ Police Verification"}
            {job.trustLevel === "CV" && "✓ CV Verified"}
          </span>
        )}
      </div>
      <p className="job-meta">
        {job.type} - Posted {job.postedAgo}
      </p>

      <p className="job-desc">{job.description}</p>

      {(job.budget != null || job.deadline) && (
        <div className="flex flex-wrap items-center gap-5">
          {job.budget != null && (
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                <Wallet size={15} />
              </span>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                  Budget
                </p>

                <p className="text-sm font-semibold text-gray-800">
                  ৳{job.budget.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {job.deadline && (
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                <CalendarDays size={15} />
              </span>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                  Deadline
                </p>

                <p className="text-sm font-semibold text-gray-800">
                  {job.deadline}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {job.tags?.length > 0 && (
        <div className="job-tags">
          {job.tags.map((tag) => (
            <span className="job-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link to={`/task/${job.id}`} className="job-see-more">
        View task
      </Link>
    </div>
  );
}

function JobList({ title, jobs }) {
  const [type, setType] = useState("All");

  // job.type holds the task location. Compare without case or extra spaces
  // so "Pabna" and "pabna " count as the same place.
  const normalize = (value) => (value ?? "").trim().toLowerCase();

  const types = [
    "All",
    ...new Map(
      jobs
        .filter((j) => normalize(j.type))
        .map((j) => [normalize(j.type), j.type.trim()]),
    ).values(),
  ];

  // Fall back to "All" if the chosen location is no longer in the list
  // (for example after switching category).
  const activeType = types.some((t) => normalize(t) === normalize(type))
    ? type
    : "All";

  const visibleJobs =
    activeType === "All"
      ? jobs
      : jobs.filter((j) => normalize(j.type) === normalize(activeType));

  return (
    <section className="job-list">
      <div className="job-list-head">
        <h2>
          {title}: {visibleJobs.length} tasks found
        </h2>
        <select
          className="job-type-filter"
          value={activeType}
          onChange={(e) => setType(e.target.value)}
          aria-label="Filter by location"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t === "All" ? "All locations" : t}
            </option>
          ))}
        </select>
      </div>

      {visibleJobs.length === 0 ? (
        <p className="empty-state">No tasks posted yet. Check back soon.</p>
      ) : (
        <div className="job-grid">
          {visibleJobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      )}
    </section>
  );
}

export default JobList;
