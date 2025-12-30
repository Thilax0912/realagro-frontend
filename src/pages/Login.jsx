// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import api from "../lib/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.from?.pathname || "/home"; // 👈 redirect target

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { token, user } = await api("/api/auth/login", {
        method: "POST",
        body: { email: form.email, password: form.password },
      });

      // persist auth
      localStorage.setItem("token", token);
      localStorage.setItem("auth_demo", JSON.stringify(user));

      // 👇 go back to where user wanted to go (contact/details) or home
      navigate(returnTo, { replace: true });
    } catch (error) {
      setErr(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back 👋</h1>
        <p className="auth-sub">Sign in to continue to 7hilax RealAgro</p>

        {err && <div className="auth-alert">{err}</div>}

        <form className="auth-form" onSubmit={onSubmit}>
          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={onChange}
              required
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="pwd">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={onChange}
                required
                minLength={6}
              />
              <button
                type="button"
                className="toggle"
                onClick={() => setShow((s) => !s)}
                aria-label="toggle password visibility"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <button className="auth-btn" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div className="or">
          <span>or</span>
        </div>

        <button
          className="google-btn"
          onClick={() => alert("Google sign-in stub")}
          type="button"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt=""
          />
          Continue with Google
        </button>

        <p className="auth-foot">
          Don’t have an account?{" "}
          <Link className="link" to="/signup">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
