import React from "react";
import {
  Wallet,
  CalendarDays,
  MapPin,
  Timer,
  Users,
  ShieldCheck,
  CircleCheck,
} from "lucide-react";
import StatBox from "./StatBox";

export default function TaskInfo({ task }) {
  const stats = [
    task.budget != null && {
      icon: Wallet,
      value: `৳${task.budget.toLocaleString()}`,
      sub: "Budget",
    },
    task.deadline && { icon: CalendarDays, value: task.deadline, sub: "Deadline" },
    task.location && { icon: MapPin, value: task.location, sub: "Location" },
    task.duration && { icon: Timer, value: task.duration, sub: "Estimated time" },
    task.applicants != null && { icon: Users, value: task.applicants, sub: "Applicants" },
  ].filter(Boolean);

  return (
    <div className="td-main">
      {stats.length > 0 && (
        <section className="td-card td-fade-in-up" style={{ animationDelay: "60ms" }}>
          <h2 className="td-card__title">Overview</h2>
          <div className="td-stats-grid">
            {stats.map((stat) => (
              <StatBox key={stat.sub} icon={stat.icon} value={stat.value} sub={stat.sub} />
            ))}
          </div>
        </section>
      )}

      {task.description && (
        <section className="td-card td-fade-in-up" style={{ animationDelay: "120ms" }}>
          <h2 className="td-card__title">About this task</h2>
          <p className="td-card__text">{task.description}</p>
        </section>
      )}

      {(task.tags.length > 0 || task.requirements.length > 0) && (
        <section className="td-card td-fade-in-up" style={{ animationDelay: "180ms" }}>
          {task.tags.length > 0 && (
            <div className="td-block">
              <h2 className="td-card__title">Helper must have</h2>
              <div className="td-pills">
                {task.tags.map((tag) => (
                  <span key={tag} className="td-pill">
                    <ShieldCheck size={15} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {task.requirements.length > 0 && (
            <div className="td-block">
              <h2 className="td-card__title">Requirements</h2>
              <ul className="td-checklist">
                {task.requirements.map((item) => (
                  <li key={item}>
                    <CircleCheck size={17} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {task.image && (
        <section className="td-card td-fade-in-up" style={{ animationDelay: "240ms" }}>
          <h2 className="td-card__title">Photo</h2>
          <a href={task.image} target="_blank" rel="noreferrer">
            <img className="td-task-image" src={task.image} alt={task.title} loading="lazy" />
          </a>
        </section>
      )}
    </div>
  );
}
