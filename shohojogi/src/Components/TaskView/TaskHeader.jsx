import React from "react";
import { MapPin } from "lucide-react";

export default function TaskHeader({ task }) {
  return (
    <div className="td-header td-fade-in-up">
      <div>
        <div className="td-header__title-row">
          <h1 className="td-header__title">{task.title}</h1>
          <span className="td-status-badge">{task.status}</span>
        </div>
        <p className="td-header__category">{task.category}</p>
        <div className="td-header__meta">
          <span className="td-header__meta-item">
            <MapPin size={14} /> {task.location}
          </span>
          <span>Posted {task.postedDate}</span>
          <span>Deadline {task.deadline}</span>
        </div>
      </div>
    </div>
  );
}
