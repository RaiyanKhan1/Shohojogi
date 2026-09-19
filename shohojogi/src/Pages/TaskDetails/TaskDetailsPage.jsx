import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./task-details.css";
import TaskHeader from "../../Components/TaskView/TaskHeader";
import TaskInfo from "../../Components/TaskView/TaskInfo";
import TaskSidebar from "../../Components/TaskView/TaskSidebar";

import { toTaskView } from "../../lib/taskMappers.js";

export default function TaskDetailsPage() {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

    let cancelled = false;

    const loadTask = async () => {
      setLoading(true);
      setError("");

      try {
        if (!apiBase) throw new Error("API URL is not configured.");

        const response = await fetch(`${apiBase}/tasks/${id}`, {
          credentials: "include",
        });

        const responseText = await response.text();
        let data = {};

        if (responseText) {
          try {
            data = JSON.parse(responseText);
          } catch {
            data = {};
          }
        }

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.message ||
              `Unable to load this task (HTTP ${response.status}).`,
          );
        }

        if (!cancelled) setTask(toTaskView(data));
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to connect to the server.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadTask();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="td-page">
      <div className="td-container">
        {loading && <p>Loading task...</p>}

        {!loading && error && <p role="alert">{error}</p>}

        {!loading && !error && task && (
          <>
            <TaskHeader task={task} />
            <div className="td-grid">
              <TaskInfo task={task} />
              <TaskSidebar task={task} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
