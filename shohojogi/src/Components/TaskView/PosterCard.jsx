import React from "react";
import { ShieldCheck } from "lucide-react";

export default function PosterCard({ poster }) {
  const hasStats = poster.tasksPosted != null || poster.rating != null;

  return (
    <div className="td-poster-card td-fade-in-up" style={{ animationDelay: "200ms" }}>
      <h3 className="td-poster-card__title">Posted by</h3>
      <div className="td-poster-card__row">
        <div className="td-poster-avatar">{poster.name.charAt(0)}</div>
        <div>
          <div className="td-poster-name">
            {poster.name}
            {poster.verified && <ShieldCheck size={14} color="#15803d" />}
          </div>
          {poster.memberSince && (
            <div className="td-poster-since">Member since {poster.memberSince}</div>
          )}
        </div>
      </div>
      {hasStats && (
        <div className="td-poster-stats">
          {poster.tasksPosted != null && <span>{poster.tasksPosted} tasks posted</span>}
          {poster.rating != null && <span>★ {poster.rating}</span>}
        </div>
      )}
    </div>
  );
}
