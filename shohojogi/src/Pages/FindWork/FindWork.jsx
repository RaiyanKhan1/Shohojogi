import { useEffect, useMemo, useState } from 'react'
import './FindWork.css'
import JobList from '../../components/JobList/JobList.jsx'
import { toJob } from '../../lib/taskMappers.js'

// Must match CATEGORY_OPTIONS in PostTask.jsx and TASK_CATEGORIES on the server.
const CATEGORIES = [
  'Home Services',
  'Electricians & Plumbers',
  'Appliance & AC Repair',
  'Carpentry & Painting',
  'Drivers & Transport',
  'Movers & Shifting',
  'Delivery & Food Runs',
  'Errands & Bill Payments',
  'Tutors',
  'Child Care',
  'Elderly & Patient Care',
  'Security Guards',
  'Event Specialists',
  'Tour Guides',
  'Beauty & Grooming',
  'Tech Support',
]

const ALL = 'All'

function FindWork() {
  const [jobs, setJobs] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(ALL)

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL?.replace(/\/+$/, '')

    let cancelled = false

    const loadTasks = async () => {
      try {
        if (!apiBase) throw new Error('API URL is not configured.')

        const response = await fetch(`${apiBase}/tasks`, {
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

  // Count tasks per category so each chip can show how many it holds.
  const categoryCounts = useMemo(() => {
    const counts = {}
    jobs.forEach((job) => {
      if (job.category) counts[job.category] = (counts[job.category] || 0) + 1
    })
    return counts
  }, [jobs])

  // Known categories first, then any extra ones found in the data.
  const categories = useMemo(() => {
    const extra = Object.keys(categoryCounts).filter(
      (name) => !CATEGORIES.includes(name)
    )
    return [ALL, ...CATEGORIES, ...extra]
  }, [categoryCounts])

  const filteredJobs = useMemo(
    () =>
      activeCategory === ALL
        ? jobs
        : jobs.filter((job) => job.category === activeCategory),
    [jobs, activeCategory]
  )

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

      {!loading && !error && (
        <div className="mt-8" role="group" aria-label="Filter tasks by category">
          <p className="mb-3 text-sm font-semibold text-gray-700">
            Browse by category
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.map((name) => {
              const isActive = name === activeCategory
              const count =
                name === ALL ? jobs.length : categoryCounts[name] || 0

              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setActiveCategory(name)}
                  aria-pressed={isActive}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? 'border-green-800 bg-green-800 text-white shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50 hover:text-green-800'
                  }`}
                >
                  {name}
                  <span
                    className={`rounded-full px-1.5 text-xs ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {!loading && !error && activeCategory !== ALL && filteredJobs.length === 0 && (
        <section className="job-list">
          <h2>{activeCategory}: 0 tasks found</h2>
          <p className="empty-state">
            No tasks in this category yet.{' '}
            <button
              type="button"
              onClick={() => setActiveCategory(ALL)}
              className="cursor-pointer font-semibold text-green-700 underline"
            >
              Show all tasks
            </button>
          </p>
        </section>
      )}

      {!loading && !error && (activeCategory === ALL || filteredJobs.length > 0) && (
        <JobList
          title={activeCategory === ALL ? 'All Tasks' : activeCategory}
          jobs={filteredJobs}
        />
      )}
    </section>
  )
}

export default FindWork
