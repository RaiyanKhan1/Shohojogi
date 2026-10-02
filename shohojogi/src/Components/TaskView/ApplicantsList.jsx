import React from "react";
import { Star } from "lucide-react";

export default function ApplicantsList({ applicants }) {
  return (
    <section className="td-card td-fade-in-up" style={{ animationDelay: "220ms" }}>
      <h3 className="td-card__eyebrow">Applicants</h3>
      <div className="td-applicants">
        {applicants.map((a) => (
          <div key={a.name} className="td-applicant">
            <div className="td-applicant__row">
              <span className="td-applicant__name">{a.name}</span>
              <span className="td-applicant__rating">
                <Star size={12} /> {a.rating}
              </span>
            </div>
            <p className="td-applicant__note">{a.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
