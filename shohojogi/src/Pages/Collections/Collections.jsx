import './Collections.css'

const CATEGORIES = [
  { name: 'Home Services', blurb: 'Electricians, plumbers, cleaners and repair help.' },
  { name: 'Errands & Bill Pay', blurb: 'Bank queues, utility bills, ticket counters, pickups.' },
  { name: 'Elder & Child Care', blurb: 'In-home companionship, babysitting, daily check-ins.' },
  { name: 'Drivers & Movers', blurb: 'Personal drivers, house shifting, heavy lifting.' },
  { name: 'Tutors', blurb: 'Subject tutors, exam prep, language coaching.' },
  { name: 'Security Guards', blurb: 'Event security, night watch, gate duty.' },
  { name: 'Event Specialists', blurb: 'Mehendi artists, decorators, photographers.' },
  { name: 'Delivery & Food Runs', blurb: 'Parcel pickup, hospital meal delivery, shopping runs.' },
  { name: 'Tour Guides', blurb: 'Local guides for visitors and out-of-town family.' },
]

function Collections() {
  return (
    <section id="collections">
      <h1>Find someone for the task</h1>
      <div className="collections-grid">
        {CATEGORIES.map((c) => (
          <div className="cat-card" key={c.name}>
            <h2>{c.name}</h2>
            <p>{c.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Collections
