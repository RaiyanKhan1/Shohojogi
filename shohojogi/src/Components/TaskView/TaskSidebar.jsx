import React from "react";
import ApplyCard from "./ApplyCard";
import PosterCard from "./PosterCard";
import ApplicantsList from "./ApplicantsList";

export default function TaskSidebar({ task }) {
  return (
    <div className="td-sidebar">
      <ApplyCard
        taskId={task.id}
        budget={task.budget}
        deadline={task.deadline}
        status={task.status}
        applicants={task.applicants}
      />

      <PosterCard poster={task.poster} />

      {task.applicantsList?.length > 0 && (
        <ApplicantsList applicants={task.applicantsList} />
      )}
    </div>
  );
}