import React from "react";
import { ShieldCheck, Star } from "lucide-react";

export default function PosterCard({ poster }) {
  const hasStats = poster.tasksPosted != null || poster.rating != null;

  return (
    <section className="td-card td-fade-in-up" style={{ animationDelay: "160ms" }}>
      <h3 className="td-card__eyebrow">Posted by</h3>
      <div className="td-poster">
        <div className="td-poster__avatar">{poster.name.charAt(0).toUpperCase()}</div>
        <div>
          <div className="td-poster__name">
            {poster.name}
            {poster.verified && <ShieldCheck size={15} className="td-poster__verified" />}
          </div>
          <div className="td-poster__since">
            {poster.memberSince ? `Member since ${poster.memberSince}` : "Client"}
          </div>
        </div>
      </div>
      {hasStats && (
        <div className="td-poster__stats">
          {poster.tasksPosted != null && <span>{poster.tasksPosted} tasks posted</span>}
          {poster.rating != null && (
            <span className="td-poster__rating">
              <Star size={13} /> {poster.rating}
            </span>
          )}
        </div>
      )}
    </section>
  );
}
