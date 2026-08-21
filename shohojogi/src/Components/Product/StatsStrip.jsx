import React from 'react';

export default function StatsStrip({ credibility }) {
  const items = [
    { value: credibility.totalJobs, unit: 'jobs', label: 'Total jobs completed' },
    { value: credibility.totalHours, unit: 'hrs', label: 'Total hours logged' },
    { value: `${credibility.jobSuccess}%`, unit: '', label: 'Job success score' },
    { value: credibility.rating, unit: '/ 5', label: `${credibility.reviewCount} client reviews` },
  ];

  return (
    <div className="fp-container">
      <div className="fp-stats">
        {items.map((it) => (
          <div className="fp-stat" key={it.label}>
            <div className="fp-stat-value">
              {it.value} {it.unit && <small>{it.unit}</small>}
            </div>
            <div className="fp-stat-label">{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
