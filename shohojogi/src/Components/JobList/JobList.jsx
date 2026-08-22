import { useState } from 'react'
import './JobList.css'

function JobCard({ job }) {
  return (
    <div className="job-card">
      <p className="job-title">
        {job.title}
        {job.trustLevel && (
          <span className={`verify-tag verify-tag--${job.trustLevel.toLowerCase()}`}>
            {job.trustLevel === 'Verified' && '✓ NID & CV Verified'}
            {job.trustLevel === 'Trusted' && '✓ Police Verification'}
            {job.trustLevel === 'CV' && '✓ CV Verified'}
          </span>
        )}
      </p>
      <p className="job-meta">{job.type} - Posted {job.postedAgo}</p>

      <p className="job-desc">{job.description}</p>

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

  const filtered = jobs.filter((j) => type === 'All' || j.type === type)

  return (
    <section className="job-list">
      <div className="job-list-head">
        <h2>{title}: {filtered.length} tasks found</h2>
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

      {filtered.length === 0 ? (
        <p className="empty-state">No tasks match this filter. Try a different type.</p>
      ) : (
        <div className="job-grid">
          {filtered.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      )}
    </section>
  )
}

export default JobList