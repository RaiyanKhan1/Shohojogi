import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  LoaderCircle,
  CalendarDays,
  Users,
} from "lucide-react";

export default function ApplyCard({
  taskId,
  budget,
  deadline,
  status,
  applicants,
}) {
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleApply = async () => {
    const apiBase = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

    if (!apiBase) {
      setError("API URL is not configured.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${apiBase}/worker/tasks/${taskId}/apply`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to submit your application.",
        );
      }

      setApplied(true);
      setSuccess("Your application has been submitted.");
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const isOpen = String(status).toLowerCase() === "open";

  return (
    <section className="td-card td-apply-card td-fade-in-up" style={{ animationDelay: "100ms" }}>
      <h3 className="td-card__eyebrow">Budget</h3>
      <div className="td-apply-card__price">
        ৳{budget != null ? budget.toLocaleString() : "—"}
        <span className="td-apply-card__price-unit">fixed price</span>
      </div>

      <ul className="td-apply-card__facts">
        <li>
          <span className={`td-apply-card__dot${isOpen ? "" : " td-apply-card__dot--muted"}`} />
          {isOpen ? "Open for applicants" : `Status: ${status}`}
        </li>
        {deadline && (
          <li>
            <CalendarDays size={15} /> Apply before {deadline}
          </li>
        )}
        {applicants != null && (
          <li>
            <Users size={15} /> {applicants} people already applied
          </li>
        )}
      </ul>

      <button
        onClick={handleApply}
        disabled={loading || applied}
        className={`td-apply-btn${applied ? " td-apply-btn--applied" : ""}`}
      >
        {loading ? (
          <>
            <LoaderCircle size={16} className="td-spin" />
            Submitting...
          </>
        ) : applied ? (
          <>
            <CheckCircle2 size={16} />
            Application sent
          </>
        ) : (
          <>
            <Send size={16} />
            Apply for this task
          </>
        )}
      </button>

      {error && (
        <p role="alert" className="td-alert td-alert--error">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="td-alert td-alert--success">
          {success}
        </p>
      )}
    </section>
  );
}
