import { useEffect, useState } from 'react'
import './FindWork.css'
import JobList from '../../components/JobList/JobList.jsx'

const timeAgo = (value) => {
  const posted = new Date(value)

  if (Number.isNaN(posted.getTime())) return 'recently'

  const minutes = Math.floor((Date.now() - posted.getTime()) / 60000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`

  const hours = Math.floor(minutes / 60)

  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`

  const days = Math.floor(hours / 24)

  return `${days} day${days === 1 ? '' : 's'} ago`
}

const formatDeadline = (value) => {
  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
}

// Map an API task onto the shape JobList/JobCard already render.
const toJob = (task) => ({
  id: task._id,
  title: task.taskName,
  type: task.location,
  postedAgo: timeAgo(task.createdAt),
  description: task.details,
  budget: task.budget,
  deadline: formatDeadline(task.deadline),
  tags: task.tags ?? [],
})

function FindWork() {
  const [jobs, setJobs] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL?.replace(/\/+$/, '')

    let cancelled = false

    const loadTasks = async () => {
      try {
        if (!apiBase) throw new Error('API URL is not configured.')

        const response = await fetch(`${apiBase}/admin/tasks?status=approved`, {
          credentials: 'include',
        })

        const responseText = await response.text()
        let data = []

        if (responseText) {
          try {
            data = JSON.parse(responseText)
          } catch {
            data = []
          }
        }

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.message ||
              `Unable to load tasks (HTTP ${response.status}).`
          )
        }

        if (!cancelled) {
          setJobs(Array.isArray(data) ? data.map(toJob) : [])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to connect to the server.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadTasks()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="find-work">
      <div className="find-work-hero">
        <div className="find-work-shape shape-1" aria-hidden="true"></div>
        <div className="find-work-shape shape-2" aria-hidden="true"></div>
        <div className="find-work-hero-content">
          <h1>Find your task</h1>
        </div>
      </div>

      {loading && (
        <section className="job-list">
          <p>Loading tasks...</p>
        </section>
      )}

      {!loading && error && (
        <section className="job-list">
          <p role="alert">{error}</p>
        </section>
      )}

      {!loading && !error && <JobList title="All Tasks" jobs={jobs} />}
    </section>
  )
}

export default FindWork
