import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/admin.css"; // keeps the admin styles available when sidebar renders

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 style={{ marginBottom: 20 }}>Admin Panel</h2>

      <NavLink to="/admin" end>
        Dashboard
      </NavLink>

      <NavLink to="/admin/messages">Messages</NavLink>

      <NavLink to="/admin/listings">Listings</NavLink>

      <NavLink to="/profile">Profile</NavLink>

      <NavLink to="/home">← Back to site</NavLink>
    </aside>
  );
}
