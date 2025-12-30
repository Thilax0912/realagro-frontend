import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import  api  from "../../lib/api";
import { getAuth } from "../../lib/auth";

export default function AdminProfile() {
  const [me, setMe] = useState(null);
  const [name, setName] = useState("");
  const { token } = getAuth();

  useEffect(() => {
    (async () => {
      const data = await api("/api/auth/me", { token });
      setMe(data.user);
      setName(data.user?.name || "");
    })();
  }, [token]);

  const save = async () => {
    // Implement server PATCH if you want to persist name changes.
    alert("Demo: Add a PATCH /api/auth/me to persist name changes.");
  };

  if (!me)
    return (
      <AdminLayout>
        <p>Loading…</p>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <h3 style={{ marginTop: 0 }}>My Profile</h3>
      <div
        style={{
          background: "#fff",
          border: "1px solid #eee",
          borderRadius: 12,
          padding: 16,
          maxWidth: 520,
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <strong>Email:</strong> {me.email}
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <label>
            <div style={{ color: "#64748b", fontWeight: 600 }}>Name</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e5e7eb",
              }}
            />
          </label>
          <button className="btn" onClick={save} style={{ width: 160 }}>
            Save
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
