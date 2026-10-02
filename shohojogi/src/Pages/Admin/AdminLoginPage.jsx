
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

export default function AdminLoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        if (!API_URL) {
            setError("The API URL is not configured.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/admin/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to sign in. Please try again."
                );
            }

            if (data.user?.role !== "admin") {
                throw new Error("This account is not authorized for admin access.");
            }

            // Store only the user profile, never the JWT.
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/admin/dashboard", { replace: true });
        } catch (err) {
            setError(
                err.message || "Unable to connect to the server."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-4 py-10">
            {/* Background decoration */}
            <div
                className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-green-200/40 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl"
                aria-hidden="true"
            />

            <section className="relative w-full max-w-md">
                {/* Brand */}
                <div className="mb-8 text-center">
                    <img
                        src="/src/assets/icons/banner.svg"
                        alt="Shohojogi"
                        className="mx-auto mb-7 h-10 w-auto"
                    />

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/15">
                        <ShieldCheck size={27} />
                    </div>

                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-green-700">
                        Restricted access
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                        Admin Panel
                    </h1>
                </div>

                {/* Login form */}
                <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-xl shadow-gray-900/[0.04] sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="admin-email"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Email address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="admin-email"
                                    type="email"
                                    autoComplete="username"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Enter your admin email"
                                    required
                                    disabled={loading}
                                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100 disabled:opacity-60"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="admin-password"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="admin-password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    disabled={loading}
                                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100 disabled:opacity-60"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((current) => !current)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-50 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div
                                role="alert"
                                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                            >
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in to dashboard
                                    <ArrowRight size={17} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 flex items-start gap-2.5 border-t border-gray-100 pt-5">
                        <ShieldCheck
                            size={16}
                            className="mt-0.5 shrink-0 text-green-700"
                        />
                        <p className="text-xs leading-5 text-gray-500">
                            This portal is for authorized administrators only.
                            Admin accounts cannot be created from this page.
                        </p>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-gray-400">
                    Shohojogi · Admin Portal
                </p>
            </section>
        </main>
    );
}