import { useState } from 'react'
import './Collections.css'
import ServiceList from '../../components/ServiceList/ServiceList.jsx'
import { servicesByCategory } from '../../data/dummyServices.js'

const CATEGORIES = Object.keys(servicesByCategory)

function Collections() {
  const [active, setActive] = useState(CATEGORIES[0])

  return (
    <section id="collections">
      <div className="hero-banner">
        <div className="hero-shape shape-1" aria-hidden="true"></div>
        <div className="hero-shape shape-2" aria-hidden="true"></div>
        <div className="hero-content">
          <h1>Find someone for the task</h1>
          <p>Trusted help for life’s everyday tasks and more.</p>
        </div>
      </div>

      <div className="collections-grid">
        {CATEGORIES.map((name) => (
          <button
            key={name}
            type="button"
            className={`cat-card${name === active ? ' active' : ''}`}
            onClick={() => setActive(name)}
          >
            <h2>{name}</h2>
          </button>
        ))}
      </div>

      <ServiceList key={active} title={active} services={servicesByCategory[active]} />
    </section>
  )
}

export default Collections