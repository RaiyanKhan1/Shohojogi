import React, { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle2,
    Copy,
    Check,
    XCircle,
    Ban,
} from "lucide-react";

const RESULTS = {
    success: {
        label: "Payment successful",
        title: "Worker accepted!",
        message:
            "Your payment was received and the worker has been accepted for your task.",
        icon: CheckCircle2,
        iconWrap: "bg-green-100 text-green-700",
        ring: "bg-green-500/15",
        badge: "bg-green-50 text-green-700 border-green-200",
        dot: "bg-green-500",
    },
    failed: {
        label: "Payment failed",
        title: "Payment didn't go through",
        message:
            "The payment could not be completed. The application is still pending, so you can try again.",
        icon: XCircle,
        iconWrap: "bg-red-100 text-red-600",
        ring: "bg-red-500/15",
        badge: "bg-red-50 text-red-700 border-red-200",
        dot: "bg-red-500",
    },
    cancelled: {
        label: "Payment cancelled",
        title: "You cancelled the payment",
        message:
            "No money was taken. The application is still pending, so you can accept the worker later.",
        icon: Ban,
        iconWrap: "bg-amber-100 text-amber-700",
        ring: "bg-amber-500/15",
        badge: "bg-amber-50 text-amber-800 border-amber-200",
        dot: "bg-amber-500",
    },
};

export default function PaymentResultPage() {
    const { result } = useParams();
    const [searchParams] = useSearchParams();
    const tranId = searchParams.get("tran_id");
    const info = RESULTS[result] || RESULTS.failed;
    const Icon = info.icon;

    const [copied, setCopied] = useState(false);

    const copyTranId = async () => {
        try {
            await navigator.clipboard.writeText(tranId);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // Clipboard may be blocked; the ID is still visible to copy by hand.
        }
    };

    return (
        <main className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pb-12 pt-28 sm:pt-32">
            <section className="w-full max-w-md rounded-3xl border border-gray-200/80 bg-white p-6 text-center shadow-xl sm:p-8">
                {/* Icon */}
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                    <span
                        className={`absolute inset-0 rounded-full ${info.ring} animate-ping`}
                        style={{ animationIterationCount: 2 }}
                        aria-hidden="true"
                    />
                    <span
                        className={`relative flex h-20 w-20 items-center justify-center rounded-full ${info.iconWrap}`}
                    >
                        <Icon size={40} strokeWidth={2.2} />
                    </span>
                </div>

                {/* Status badge */}
                <span
                    className={`mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${info.badge}`}
                >
                    <span className={`h-2 w-2 rounded-full ${info.dot}`} />
                    {info.label}
                </span>

                <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {info.title}
                </h1>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                    {info.message}
                </p>

                {/* Transaction ID */}
                {tranId && (
                    <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-4 text-left">
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                            Transaction ID
                        </p>

                        <div className="mt-1 flex items-center justify-between gap-3">
                            <p className="min-w-0 truncate font-mono text-sm font-semibold text-gray-800">
                                {tranId}
                            </p>

                            <button
                                type="button"
                                onClick={copyTranId}
                                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-white text-gray-500 ring-1 ring-gray-200 transition hover:text-green-700 hover:ring-green-300"
                                aria-label="Copy transaction ID"
                                title={copied ? "Copied" : "Copy"}
                            >
                                {copied ? <Check size={15} /> : <Copy size={15} />}
                            </button>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <Link
                    to="/client/applications"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                >
                    <ArrowLeft size={16} />
                    Back to applications
                </Link>

                <Link
                    to="/"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                >
                    Go to homepage
                </Link>
            </section>
        </main>
    );
}
