import React from "react";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AccessRestricted({ message }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-lg">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <ShieldAlert size={32} />
                </div>

                <h1 className="mt-5 text-2xl font-bold text-gray-900">
                    Access Restricted
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    {message}
                </p>

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mt-6 rounded-xl bg-green-600 cursor-pointer px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}