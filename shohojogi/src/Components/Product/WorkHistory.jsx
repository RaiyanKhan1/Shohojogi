import React from 'react';

export default function WorkHistoryTimeline({ history }) {
  return (
    <section id="history" aria-labelledby="history-heading">
      <div className="fp-section-head">
        
        <h2 id="history-heading" className="fp-heading">Work history</h2>
      </div>

      <div className="fp-timeline">
        {history.map((job) => (
          <div className="fp-timeline-item" key={job.id}>
            <span className="fp-timeline-dot" />
            <div className="fp-timeline-header">
              <div>
                <div className="fp-timeline-role">{job.role}</div>
                <div className="fp-timeline-client">{job.client}</div>
              </div>
              <span className="fp-timeline-time">{job.timeframe}</span>
            </div>
            
            <span className="fp-timeline-budget">{job.budget}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
