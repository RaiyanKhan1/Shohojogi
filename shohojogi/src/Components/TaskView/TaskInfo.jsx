import React from "react";
import StatBox from "./StatBox";

export default function TaskInfo({ task }) {
  return (
    <div className="td-main">
     
      <div className="td-stats-row">
        <StatBox value={`${task.budget}tk`} sub="Budget" delay={0} />
        <StatBox value={task.duration} sub="Estimated time" delay={80} />
        <StatBox value={task.applicants} sub="Applicants" delay={160} />
      </div>

     
      <div className="td-tags-box td-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="td-tags-box__row">
          {task.tags.map((p, i) => (
            <span
              key={p}
              className="td-fade-in-up"
              style={{ animationDelay: `${240 + i * 80}ms`, display: "inline-block" }}
            >
              <span className="td-pill">{p}</span>
            </span>
          ))}
        </div>
      </div>

     
      <div className="td-fade-in-up" style={{ animationDelay: "300ms" }}>
        <h2 className="td-section__title">Details</h2>
        <p className="td-section__text">{task.description}</p>
      </div>

     
      <div className="td-fade-in-up" style={{ animationDelay: "360ms" }}>
        <h2 className="td-section__title td-section__title--spaced">What's needed</h2>
        <div className="td-requirements">
          {task.requirements.map((r) => (
            <span key={r} className="td-requirement-chip">
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
