import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, CalendarDays, Clock, Tag } from "lucide-react";

const statusClass = (status) => {
  const value = String(status).toLowerCase();

  if (value === "open") return "td-status td-status--open";
  if (value === "rejected") return "td-status td-status--closed";

  return "td-status td-status--pending";
};

export default function TaskHeader({ task }) {
  return (
    <header className="td-header td-fade-in-up">
      <Link to="/find-work" className="td-back">
        <ArrowLeft size={16} /> Back to tasks
      </Link>

      <div className="td-header__badges">
        {task.category && (
          <span className="td-category">
            <Tag size={13} /> {task.category}
          </span>
        )}
        <span className={statusClass(task.status)}>{task.status}</span>
      </div>

      <h1 className="td-header__title">{task.title}</h1>

      <div className="td-header__meta">
        {task.location && (
          <span className="td-header__meta-item">
            <MapPin size={15} /> {task.location}
          </span>
        )}
        {task.postedDate && (
          <span className="td-header__meta-item">
            <CalendarDays size={15} /> Posted {task.postedDate}
          </span>
        )}
        {task.deadline && (
          <span className="td-header__meta-item">
            <Clock size={15} /> Due {task.deadline}
          </span>
        )}
      </div>
    </header>
  );
}
