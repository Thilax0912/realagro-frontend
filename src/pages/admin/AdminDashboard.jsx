// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/admin.css";

export default function AdminDashboard() {
  // You can wire these up to real API data later
  const newMessages = 0;
  const totalListings = 0;

  return (
    <div className="admin-dashboard">
      {/* Page header */}
      <header className="admin-dashboard-header">
        <div>
          <h1>Admin Console</h1>
          <p>Manage messages, listings, and admins for 7hilax RealAgro.</p>
        </div>

        <div className="admin-badge">
          <span className="admin-dot" />
          <span>Admin area</span>
        </div>
      </header>

      {/* Local admin nav (within admin section) */}
      <nav className="admin-tabs" aria-label="Admin sections">
        <Link to="/admin" className="admin-tab admin-tab-active">
          Dashboard
        </Link>
        <Link to="/admin/messages" className="admin-tab">
          Messages
        </Link>
        <Link to="/admin/listings" className="admin-tab">
          Listings
        </Link>
        <Link to="/admin/profile" className="admin-tab">
          Profile
        </Link>
        <div className="admin-tab-right">
          <Link to="/home" className="admin-tab ghost">
            ⟵ Back to site
          </Link>
        </div>
      </nav>

      {/* Metrics cards */}
      <section className="admin-metrics-grid" aria-label="Key metrics">
        <article className="admin-card primary">
          <div className="admin-card-header">
            <h2>New Messages</h2>
            <span className="admin-pill">Inbox</span>
          </div>
          <p className="admin-metric-number">{newMessages}</p>
          <p className="admin-card-text">
            Unread property inquiries waiting for your response.
          </p>
          <Link to="/admin/messages" className="admin-card-link">
            View messages →
          </Link>
        </article>

        <article className="admin-card">
          <div className="admin-card-header">
            <h2>Listings</h2>
            <span className="admin-pill outline">Properties</span>
          </div>
          <p className="admin-metric-number">{totalListings}</p>
          <p className="admin-card-text">
            Active and sold properties currently in 7hilax RealAgro.
          </p>
          <Link to="/admin/listings" className="admin-card-link">
            Manage listings →
          </Link>
        </article>
      </section>

      {/* Quick actions */}
      <section className="admin-quick-actions" aria-label="Quick actions">
        <div className="admin-qa-card">
          <h3>Review latest inquiries</h3>
          <p>
            Open the messages panel to respond quickly to buyers and keep your
            response time low.
          </p>
          <Link to="/admin/messages" className="admin-qa-btn">
            Go to Messages
          </Link>
        </div>

        <div className="admin-qa-card">
          <h3>Update property listings</h3>
          <p>
            Edit prices, availability, and descriptions so that buyers always
            see the most accurate information.
          </p>
          <Link to="/admin/listings" className="admin-qa-btn outline">
            Go to Listings
          </Link>
        </div>
      </section>
    </div>
  );
}
