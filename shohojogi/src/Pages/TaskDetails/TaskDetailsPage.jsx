import React from "react";
import "./task-details.css";
import TaskHeader from "../../Components/TaskView/TaskHeader";
import TaskInfo from "../../Components/TaskView/TaskInfo";
import TaskSidebar from "../../Components/TaskView/TaskSidebar";

import task from "../../Data/task.js";


export default function TaskDetailsPage() {
  return (
    <div className="td-page">
      <div className="td-container">
        <TaskHeader task={task} />
        <div className="td-grid">
          <TaskInfo task={task} />
          <TaskSidebar task={task} />
        </div>
      </div>
    </div>
  );
}
