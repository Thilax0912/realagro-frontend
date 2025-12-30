// src/pages/admin/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  api  from "../../lib/api";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api("/api/auth/login", {
        method: "POST",
        body: {
          email: form.email,
          password: form.password,
        },
      });

      const { token, user } = data;

      if (!user || user.role !== "admin") {
        setError("This account does not have admin access.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("auth_demo", JSON.stringify(user));

      // go to admin console (or /admin/profile if you prefer)
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Admin login failed");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
        background:
          "radial-gradient(circle at top left, #ecfdf5 0, #f9fafb 40%, #fefce8 90%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          backgroundColor: "#ffffff",
          borderRadius: 28,
          boxShadow: "0 22px 60px rgba(15, 23, 42, 0.18)",
          padding: "30px 28px 26px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle green ribbon */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at top right, rgba(22,163,74,0.10), transparent 55%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 10px",
              borderRadius: 999,
              backgroundColor: "#ecfdf5",
              color: "#166534",
              fontSize: 12,
              fontWeight: 500,
              marginBottom: 10,
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              A
            </span>
            Admin access only
          </div>

          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 4,
            }}
          >
            Admin Console Login
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#6b7280",
              marginBottom: 20,
            }}
          >
            Sign in with your admin credentials to manage 7hilax RealAgro.
          </p>

          {error && (
            <div
              style={{
                marginBottom: 14,
                padding: "9px 11px",
                borderRadius: 12,
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#b91c1c",
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#4b5563",
                }}
              >
                Admin email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@realagro.lk"
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  fontSize: 14,
                  outline: "none",
                  backgroundColor: "#f9fafb",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#4b5563",
                }}
              >
                Password
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#f9fafb",
                  paddingRight: 10,
                }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    border: "none",
                    background: "transparent",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={{
                    border: "none",
                    background: "none",
                    fontSize: 12,
                    color: "#16a34a",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: 999,
                border: "none",
                fontWeight: 600,
                fontSize: 15,
                color: "#ffffff",
                background:
                  "linear-gradient(135deg, #22c55e 0%, #16a34a 60%, #15803d 100%)",
                boxShadow: "0 16px 36px rgba(22, 163, 74, 0.45)",
                cursor: "pointer",
                marginBottom: 10,
                opacity: loading ? 0.9 : 1,
              }}
            >
              {loading ? "Signing in..." : "Sign in as Admin"}
            </button>
          </form>

          <div
            style={{
              marginTop: 4,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: "#6b7280",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/login")}
              style={{
                border: "none",
                background: "none",
                padding: 0,
                color: "#4b5563",
                cursor: "pointer",
              }}
            >
              ← Back to user login
            </button>
            <span>Need help? Contact the site owner.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
