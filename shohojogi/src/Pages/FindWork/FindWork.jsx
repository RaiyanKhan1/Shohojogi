import './FindWork.css'
import JobList from '../../components/JobList/JobList.jsx'
import { jobsByCategory } from '../../data/dummyJobs.js'

const allJobs = Object.entries(jobsByCategory).flatMap(([category, jobs]) =>
  jobs.map((job) => ({ ...job, category }))
)

function FindWork() {
  return (
    <section id="find-work">
      <div className="find-work-hero">
        <div className="find-work-shape shape-1" aria-hidden="true"></div>
        <div className="find-work-shape shape-2" aria-hidden="true"></div>
        <div className="find-work-hero-content">
          <h1>Find your task</h1>
        </div>
      </div>

      <JobList title="All Tasks" jobs={allJobs} />
    </section>
  )
}

export default FindWork
