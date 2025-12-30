// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// CRA-style env var (NOT import.meta.env)
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");

    if (!form.name || !form.email || !form.password) {
      setErr("Please fill all fields.");
      return;
    }
    if (form.password.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setErr("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErr(data?.error || "Sign up failed");
        return;
      }

      // Save auth token (matches how your Login does it)
      localStorage.setItem(
        "auth_demo",
        JSON.stringify({
          token: data.token,
          email: data.user.email,
          id: data.user.id,
        })
      );

      setOk("Account created! Redirecting…");
      setTimeout(() => nav("/home"), 700);
    } catch (e2) {
      console.error(e2);
      setErr("Network error. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.cardWrap}>
        <form onSubmit={submit} style={styles.card}>
          <h1 style={styles.title}>Create your account</h1>
          <p style={styles.sub}>Join 7hilax RealAgro in seconds.</p>

          {err && (
            <div
              style={{
                ...styles.alert,
                background: "#ffe8e8",
                color: "#9b1c1c",
              }}
            >
              {err}
            </div>
          )}
          {ok && (
            <div
              style={{
                ...styles.alert,
                background: "#e7f7ee",
                color: "#146c3e",
              }}
            >
              {ok}
            </div>
          )}

          <label style={styles.field}>
            <span>Name</span>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
            />
          </label>

          <label style={styles.field}>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
            />
          </label>

          <label style={styles.field}>
            <span>Password</span>
            <div style={styles.pwdBox}>
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                style={styles.toggle}
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <label style={styles.field}>
            <span>Confirm Password</span>
            <input
              type={showPwd ? "text" : "password"}
              name="confirm"
              value={form.confirm}
              onChange={onChange}
              placeholder="••••••••"
            />
          </label>

          <button disabled={loading} style={styles.btn}>
            {loading ? "Creating…" : "Create Account"}
          </button>

          <p style={styles.foot}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #eef9f4 0, #ffffff 55%)",
  },
  cardWrap: {
    padding: "40px 16px",
    width: "100%",
    maxWidth: 760,
  },
  card: {
    margin: "0 auto",
    width: "100%",
    maxWidth: 520,
    background: "#fff",
    padding: 32,
    borderRadius: 20,
    boxShadow: "0 18px 60px rgba(15, 23, 42, 0.15)",
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
    color: "#111827",
  },
  sub: {
    marginTop: 6,
    marginBottom: 18,
    color: "#6b7280",
  },
  alert: {
    padding: "10px 12px",
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 12,
  },
  field: {
    display: "grid",
    gap: 6,
    marginBottom: 12,
    color: "#374151",
    fontSize: 14,
  },
  pwdBox: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  toggle: {
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    padding: "8px 10px",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 13,
  },
  btn: {
    width: "100%",
    marginTop: 10,
    background: "#22c55e",
    color: "#fff",
    border: 0,
    padding: "12px 14px",
    borderRadius: 999,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 15,
  },
  foot: {
    textAlign: "center",
    marginTop: 14,
    color: "#6b7280",
    fontSize: 14,
  },
};
