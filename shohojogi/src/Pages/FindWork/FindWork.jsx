import { useEffect, useState } from 'react'
import './FindWork.css'
import JobList from '../../components/JobList/JobList.jsx'
import { toJob } from '../../lib/taskMappers.js'

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
