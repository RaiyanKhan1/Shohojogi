import { useState } from 'react'
import { Wallet, CalendarDays } from 'lucide-react'
import './JobList.css'

function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-title-block">
        <p className="job-title">{job.title}</p>
        {job.trustLevel && (
          <span className={`verify-tag verify-tag--${job.trustLevel.toLowerCase()}`}>
            {job.trustLevel === 'Verified' && '✓ NID & CV Verified'}
            {job.trustLevel === 'Trusted' && '✓ Police Verification'}
            {job.trustLevel === 'CV' && '✓ CV Verified'}
          </span>
        )}
      </div>
      <p className="job-meta">{job.type} - Posted {job.postedAgo}</p>

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
            <span className="job-tag" key={tag}>{tag}</span>
          ))}
        </div>
      )}

      <button type="button" className="job-see-more">View task</button>
    </div>
  )
}

function JobList({ title, jobs }) {
  const [type, setType] = useState('All')

  const types = ['All', ...new Set(jobs.map((j) => j.type))]

  // The dropdown is a placeholder for now; filtering is not wired up yet.

  return (
    <section className="job-list">
      <div className="job-list-head">
        <h2>{title}: {jobs.length} tasks found</h2>
        <select
          className="job-type-filter"
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Filter by task type"
        >
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {jobs.length === 0 ? (
        <p className="empty-state">No tasks posted yet. Check back soon.</p>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      )}
    </section>
  )
}

export default JobList
