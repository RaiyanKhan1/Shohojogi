import React, { useState } from "react";
import { MessageCircle, CheckCircle2, LoaderCircle } from "lucide-react";

export default function ApplyCard({
  taskId,
  budget,
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

  return (
    <div
      className="td-apply-card td-fade-in-up"
      style={{ animationDelay: "120ms" }}
    >
      <div className="td-apply-card__price">
        {budget}tk{" "}
        <span className="td-apply-card__price-unit">/ task</span>
      </div>

      <div className="td-apply-card__divider" />

      <div className="td-apply-card__status">
        <span className="td-apply-card__dot" />
        Open for applicants
      </div>

      {applicants != null && (
        <p className="td-apply-card__sub">
          {applicants} people already applied
        </p>
      )}

      <button
        onClick={handleApply}
        disabled={loading || applied}
        className={`td-apply-btn${applied ? " td-apply-btn--applied" : ""
          }`}
      >
        {loading ? (
          <>
            <LoaderCircle size={16} />
            Submitting...
          </>
        ) : applied ? (
          <>
            <CheckCircle2 size={16} />
            Application sent
          </>
        ) : (
          <>
            <MessageCircle size={16} />
            Apply for this task
          </>
        )}
      </button>

      {error && (
        <p role="alert" style={{ color: "#dc2626", marginTop: 10 }}>
          {error}
        </p>
      )}

      {success && (
        <p role="status" style={{ color: "#15803d", marginTop: 10 }}>
          {success}
        </p>
      )}
    </div>
  );
}