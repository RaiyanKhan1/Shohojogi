import { useState } from 'react'
import './ServiceList.css'

function ServiceCard({ service }) {
  const [saved, setSaved] = useState(false)

  return (
    <div className="service-card">
      <div className="service-thumb" style={{ background: service.thumbColor }}>
        {service.photo && (
          <img className="service-thumb-img" src={service.photo} alt={service.seller} />
        )}
        <button
          type="button"
          className={`service-heart${saved ? ' saved' : ''}`}
          onClick={() => setSaved((s) => !s)}
          aria-label="Save"
        >
          ♥
        </button>
      </div>

      <div className="service-body">
        <span className="service-seller-name">{service.seller}</span>

        <p className="service-location">{service.location}</p>

        <p className="service-title">{service.title}</p>

        {service.tags?.length > 0 && (
          <div className="service-tags">
            {service.tags.map((tag) => (
              <span className="service-tag" key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="service-side">
        <span className="service-rating-badge">{service.rating}</span>
        <p className="service-reviews">{service.reviews} reviews</p>
        <p className="service-price">From ৳{service.price}</p>
      </div>
    </div>
  )
}

function ServiceList({ title, services }) {
  const [location, setLocation] = useState('All')
  const [tag, setTag] = useState('All')

  const locations = ['All', ...new Set(services.map((s) => s.location))]
  const tags = ['All', ...new Set(services.flatMap((s) => s.tags ?? []))]

  const filtered = services
    .filter((s) => location === 'All' || s.location === location)
    .filter((s) => tag === 'All' || s.tags?.includes(tag))

  // Cheapest first. Sort a copy so the original data array never mutates.
  const sorted = [...filtered].sort((a, b) => a.price - b.price)

  return (
    <section className="service-list">
      <div className="service-list-head">
        <h2>{title}: {sorted.length} providers found</h2>
        <select
          className="location-filter"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Filter by location"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="tag-filters">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            className={`tag-chip${t === tag ? ' active' : ''}`}
            onClick={() => setTag(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <p className="empty-state">No providers match these filters. Try a different location or tag.</p>
      ) : (
        <div className="service-grid">
          {sorted.map((service) => (
            <ServiceCard service={service} key={service.id} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ServiceList