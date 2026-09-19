import React from "react";
import StatBox from "./StatBox";

export default function TaskInfo({ task }) {
  const stats = [
    task.budget != null && { value: `${task.budget}tk`, sub: "Budget" },
    task.duration && { value: task.duration, sub: "Estimated time" },
    task.applicants != null && { value: task.applicants, sub: "Applicants" },
  ].filter(Boolean);

  return (
    <div className="td-main">
      {stats.length > 0 && (
        <div className="td-stats-row">
          {stats.map((stat, i) => (
            <StatBox
              key={stat.sub}
              value={stat.value}
              sub={stat.sub}
              delay={i * 80}
            />
          ))}
        </div>
      )}

      {task.tags.length > 0 && (
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
      )}

      {task.description && (
        <div className="td-fade-in-up" style={{ animationDelay: "300ms" }}>
          <h2 className="td-section__title">Details</h2>
          <p className="td-section__text">{task.description}</p>
        </div>
      )}

      {task.image && (
        <div className="td-fade-in-up" style={{ animationDelay: "330ms" }}>
          <h2 className="td-section__title td-section__title--spaced">Photo</h2>
          <img className="td-task-image" src={task.image} alt={task.title} loading="lazy" />
        </div>
      )}

      {task.requirements.length > 0 && (
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
      )}
    </div>
  );
}
