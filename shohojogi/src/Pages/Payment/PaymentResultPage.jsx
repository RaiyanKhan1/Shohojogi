import { Link, useParams, useSearchParams } from "react-router-dom";

const RESULTS = {
    success: {
        title: "Payment successful",
        message: "Your payment was received and the worker has been accepted.",
        color: "#166534",
        background: "#dcfce7",
    },
    failed: {
        title: "Payment failed",
        message: "The payment could not be completed. The application is still pending.",
        color: "#991b1b",
        background: "#fee2e2",
    },
    cancelled: {
        title: "Payment cancelled",
        message: "You cancelled the payment. The application is still pending.",
        color: "#92400e",
        background: "#fef3c7",
    },
};

export default function PaymentResultPage() {
    const { result } = useParams();
    const [searchParams] = useSearchParams();
    const tranId = searchParams.get("tran_id");
    const info = RESULTS[result] || RESULTS.failed;

    return (
        <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
            <section
                style={{
                    padding: 24,
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    background: "#ffffff",
                }}
            >
                <span
                    style={{
                        display: "inline-block",
                        padding: "6px 10px",
                        borderRadius: 20,
                        fontSize: 13,
                        color: info.color,
                        background: info.background,
                    }}
                >
                    {result}
                </span>

                <h1>{info.title}</h1>
                <p>{info.message}</p>

                {tranId && (
                    <p>
                        <strong>Transaction ID:</strong> {tranId}
                    </p>
                )}

                <Link
                    to="/client/applications"
                    style={{
                        display: "inline-block",
                        marginTop: 16,
                        padding: "10px 16px",
                        borderRadius: 8,
                        background: "#15803d",
                        color: "white",
                        textDecoration: "none",
                    }}
                >
                    Back to applications
                </Link>
            </section>
        </main>
    );
}
