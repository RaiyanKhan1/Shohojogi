import { useCallback, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

export default function ClientApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    const loadApplications = useCallback(async () => {
        if (!API_URL) {
            setError("API URL is not configured.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/client/applications`,
                { credentials: "include" },
            );

            const data = await response.json().catch(() => []);

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to load applications.",
                );
            }

            setApplications(data);
        } catch (err) {
            setError(err.message || "Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadApplications();
    }, [loadApplications]);

    const updateStatus = async (applicationId, status) => {
        setUpdatingId(applicationId);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/client/applications/${applicationId}/status`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                },
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to update application.",
                );
            }

            // Update the UI only after the server confirms the change.
            setApplications((current) =>
                current.map((application) =>
                    application._id === applicationId
                        ? { ...application, status: data.application.status }
                        : application,
                ),
            );
        } catch (err) {
            setError(err.message || "Unable to update application.");
        } finally {
            setUpdatingId(null);
        }
    };

    // Accepting a worker requires paying through SSLCommerz first.
    const startPayment = async (applicationId) => {
        setUpdatingId(applicationId);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/payment/init/${applicationId}`,
                {
                    method: "POST",
                    credentials: "include",
                },
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok || !data.url) {
                throw new Error(data.error || "Unable to start payment.");
            }

            window.location.href = data.url;
        } catch (err) {
            setError(err.message || "Unable to start payment.");
            setUpdatingId(null);
        }
    };

    if (loading) {
        return <main style={{ padding: 32 }}>Loading applications...</main>;
    }

    return (
        <main style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
            <header style={{ marginBottom: 24 }}>
                <h1>Worker Applications</h1>
                <p>Review the people who applied to your tasks.</p>
            </header>

            {error && (
                <p role="alert" style={{ color: "#dc2626" }}>
                    {error}
                </p>
            )}

            {!error && applications.length === 0 && (
                <section style={cardStyle}>
                    <h3>No applications yet</h3>
                    <p>Applications for your posted tasks will appear here.</p>
                </section>
            )}

            <div style={{ display: "grid", gap: 16 }}>
                {applications.map((application) => {
                    const worker = application.worker;
                    const task = application.task;
                    const updating = updatingId === application._id;

                    return (
                        <article key={application._id} style={cardStyle}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 16,
                                    flexWrap: "wrap",
                                }}
                            >
                                <div>
                                    <h2 style={{ marginTop: 0 }}>
                                        {task?.taskName || "Task unavailable"}
                                    </h2>

                                    <p>
                                        <strong>Worker:</strong>{" "}
                                        {worker?.name || "Unknown worker"}
                                    </p>

                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {worker?.email || "Unavailable"}
                                    </p>

                                    {task && (
                                        <>
                                            <p>
                                                <strong>Location:</strong> {task.location}
                                            </p>
                                            <p>
                                                <strong>Budget:</strong> {task.budget} tk
                                            </p>
                                        </>
                                    )}

                                    <p>
                                        <strong>Applied:</strong>{" "}
                                        {new Date(application.createdAt).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            },
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <span
                                        style={{
                                            ...badgeStyle,
                                            ...(application.status === "accepted"
                                                ? acceptedStyle
                                                : application.status === "rejected"
                                                    ? rejectedStyle
                                                    : pendingStyle),
                                        }}
                                    >
                                        {application.status}
                                    </span>
                                </div>
                            </div>

                            {application.status === "pending" && task && (
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 10,
                                        marginTop: 16,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <button
                                        disabled={updating}
                                        onClick={() => startPayment(application._id)}
                                        style={acceptButtonStyle}
                                    >
                                        {updating ? "Saving..." : "Accept worker"}
                                    </button>

                                    <button
                                        disabled={updating}
                                        onClick={() =>
                                            updateStatus(application._id, "rejected")
                                        }
                                        style={rejectButtonStyle}
                                    >
                                        {updating ? "Saving..." : "Reject"}
                                    </button>
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </main>
    );
}

const cardStyle = {
    padding: 20,
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    background: "#ffffff",
};

const badgeStyle = {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 20,
    fontSize: 13,
    textTransform: "capitalize",
};

const pendingStyle = {
    background: "#fef3c7",
    color: "#92400e",
};

const acceptedStyle = {
    background: "#dcfce7",
    color: "#166534",
};

const rejectedStyle = {
    background: "#fee2e2",
    color: "#991b1b",
};

const acceptButtonStyle = {
    padding: "10px 16px",
    border: 0,
    borderRadius: 8,
    background: "#15803d",
    color: "white",
    cursor: "pointer",
};

const rejectButtonStyle = {
    padding: "10px 16px",
    border: "1px solid #dc2626",
    borderRadius: 8,
    background: "white",
    color: "#dc2626",
    cursor: "pointer",
};