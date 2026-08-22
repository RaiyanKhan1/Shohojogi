import { useState } from "react";
import {
  UserRoundSearch,
  BriefcaseBusiness,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import "./Join.css";

function Join() {
  const [mode, setMode] = useState("choose");
  const [role, setRole] = useState("");

  const openSignup = (selectedRole) => {
    setRole(selectedRole);
    setMode("signup");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mode === "login") {
      console.log("Login submitted");
    } else {
      console.log("Signup submitted as:", role);
    }
  };

  if (mode === "choose") {
    return (
      <main className="join-page">
        <section className="join-shell">
          <h1>Welcome to Shohojogi</h1>

          <p className="join-subtitle">
            Which describes you best?
          </p>

          <div className="role-grid">
       
            <button
              className="role-card"
              type="button"
              onClick={() => openSignup("client")}
            >
              <span className="role-visual">
                <UserRoundSearch
                  size={74}
                  strokeWidth={1.6}
                />
              </span>

              <span className="role-title">
                Client
                <ArrowRight size={25} />
              </span>

              <span className="role-description">
                Post jobs and hire
              </span>
            </button>

            <button
              className="role-card"
              type="button"
              onClick={() => openSignup("freelancer")}
            >
              <span className="role-visual">
                <BriefcaseBusiness
                  size={74}
                  strokeWidth={1.6}
                />
              </span>

              <span className="role-title">
                Shohojogi
                <ArrowRight size={25} />
              </span>

              <span className="role-description">
                Work and get paid
              </span>
            </button>
          </div>

          <p className="account-switch">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("login")}
            >
              Log in
            </button>
          </p>
        </section>
      </main>
    );
  }

 
  return (
    <main className="join-page">
      <section className="auth-card">
        <button
          className="back-button"
          type="button"
          onClick={() => setMode("choose")}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1>
          {mode === "login"
            ? "Log in to Shohojogi"
            : "Sign up for Shohojogi"}
        </h1>

        <p>
          {mode === "login"
            ? "Welcome back! Enter your details."
            : "Create your account to get started."}
        </p>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <input
                type="hidden"
                name="role"
                value={role}
              />

              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                aria-label="Full name"
                autoComplete="name"
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            aria-label="Email address"
            autoComplete="email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete={
              mode === "login"
                ? "current-password"
                : "new-password"
            }
            minLength={6}
            required
          />

          <button
            className="submit-button"
            type="submit"
          >
            {mode === "login"
              ? "Log in"
              : "Create account"}
          </button>
        </form>

        <p className="account-switch">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}

          <button
            type="button"
            onClick={() =>
              setMode(
                mode === "login"
                  ? "choose"
                  : "login"
              )
            }
          >
            {mode === "login"
              ? "Sign up"
              : "Log in"}
          </button>
        </p>
      </section>
    </main>
  );
}

export default Join;