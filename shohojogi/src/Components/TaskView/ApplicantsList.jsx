import React from "react";
import { Wallet } from "lucide-react";

export default function ApplicantsList({ applicants }) {
  return (
    <div className="td-fade-in-up" style={{ animationDelay: "280ms" }}>
      <h3 className="td-applicants__title">Applicants</h3>
      <div className="td-applicants__list">
        {applicants.map((a, i) => (
          <div
            key={a.name}
            className="td-applicant td-fade-in-up"
            style={{ animationDelay: `${340 + i * 90}ms` }}
          >
            <span className="td-applicant__marker" />
            <div className="td-applicant__row">
              <span className="td-applicant__name">{a.name}</span>
              <span className="td-applicant__rating">
                <Wallet size={12} /> ★ {a.rating}
              </span>
            </div>
            <p className="td-applicant__note">{a.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
