import React, { useState } from "react";
import { MessageCircle, CheckCircle2 } from "lucide-react";

export default function ApplyCard({ budget, applicants }) {
  const [applied, setApplied] = useState(false);

  return (
    <div className="td-apply-card td-fade-in-up" style={{ animationDelay: "120ms" }}>
      <div className="td-apply-card__price">
        {budget}tk <span className="td-apply-card__price-unit">/ task</span>
      </div>
      <div className="td-apply-card__divider" />
      <div className="td-apply-card__status">
        <span className="td-apply-card__dot" />
        Open for applicants
      </div>
      <p className="td-apply-card__sub">{applicants} people already applied</p>
      <button
        onClick={() => setApplied(true)}
        disabled={applied}
        className={`td-apply-btn${applied ? " td-apply-btn--applied" : ""}`}
      >
        {applied ? (
          <>
            <CheckCircle2 size={16} className="td-pop" /> Application sent
          </>
        ) : (
          <>
            <MessageCircle size={16} /> Apply for this task
          </>
        )}
      </button>
    </div>
  );
}
