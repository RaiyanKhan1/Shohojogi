import React from 'react';
import { MessageCircle, CalendarClock } from 'lucide-react';


export default function HireCard({ hire, onMessage, onBookConsultation }) {
  return (
    <div className="fp-card fp-hire-card">
      <div className="fp-hire-rate">
        <span className="fp-hire-rate-value">{hire.rate}</span>
        <span className="fp-hire-rate-unit">{hire.rateUnit}</span>
      </div>
      

      <div className="fp-hire-divider" />

      <div className="fp-hire-row">
        <span className="fp-availability-dot" />
        {hire.availability}
      </div>
      <div className="fp-hire-row" style={{ marginBottom: 0 }}>
        {hire.responseTime}
      </div>

      <div className="fp-hire-actions">
        <button type="button" className="fp-btn fp-btn-primary" onClick={onMessage}>
          <MessageCircle size={16} />
          Hire
        </button>
        
        
      </div>
    </div>
  );
}
