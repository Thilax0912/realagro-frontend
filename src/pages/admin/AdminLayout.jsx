import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div style={{ maxWidth: 1200, margin: "20px auto", padding: "0 20px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>Admin Console</h2>
        <nav style={{ display: "flex", gap: 12 }}>
          <NavLink to="/admin" end>
            Dashboard
          </NavLink>
          <NavLink to="/admin/messages">Messages</NavLink>
          <NavLink to="/admin/listings">Listings</NavLink>
          <NavLink to="/admin/profile">Profile</NavLink>
          <Link to="/home" style={{ marginLeft: 8 }}>
            ↩ Back to site
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
