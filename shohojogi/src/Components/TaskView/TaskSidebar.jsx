import React from "react";
import ApplyCard from "./ApplyCard";
import PosterCard from "./PosterCard";
import ApplicantsList from "./ApplicantsList";

export default function TaskSidebar({ task }) {
  return (
    <div className="td-sidebar">
      <ApplyCard budget={task.budget} applicants={task.applicants} />
      <PosterCard poster={task.poster} />
      <ApplicantsList applicants={task.applicantsList} />
    </div>
  );
}
