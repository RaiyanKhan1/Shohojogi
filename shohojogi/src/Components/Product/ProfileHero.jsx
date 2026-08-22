import React from 'react';
import { BadgeCheck, MapPin, Clock, Sparkles } from 'lucide-react';

export default function ProfileHero({ identity, credibility }) {
  const initials = identity.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

  return (
    <header className="fp-hero">
      <div className="fp-container fp-hero-inner">
        {identity.avatarUrl ? (
          <img className="fp-avatar" src={identity.avatarUrl} alt={identity.name} />
        ) : (
          <div className="fp-avatar-fallback">
            {initials}
            <span className={`fp-status-dot${identity.status === 'online' ? ' is-online' : ''}`} />
          </div>
        )}

        <div style={{ flex: 1, minWidth: 240 }}>
          <div className="fp-hero-name-row">
            <span className="fp-hero-name">{identity.name}</span>
            {identity.verified && (
              <span className="fp-verified" title="Identity verified">
                <BadgeCheck size={20} />
              </span>
            )}
            {credibility.badge && (
              <span className="fp-badge-rising">
                <Sparkles size={13} />
                {credibility.badge}
              </span>
            )}
          </div>

          <p className="fp-hero-title">{identity.title}</p>

          <div className="fp-hero-meta">
            <span className="fp-meta-item">
              <MapPin size={14} /> {identity.location}
            </span>
           
            <span className="fp-meta-item">
              ★ <strong>{credibility.rating}</strong> ({credibility.reviewCount} reviews)
            </span>
            <span className="fp-meta-item">
              <strong>{credibility.jobSuccess}%</strong> job success
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
