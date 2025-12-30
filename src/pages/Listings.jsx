// src/pages/Listings.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import estates from "../data/estates";
import "./listings.css";

export default function Listings() {
  const ongoing = estates.filter((e) => e.status === "ongoing");
  const sold = estates.filter((e) => e.status === "sold");

  return (
    <div className="wrap">
      <h1 className="title">Real Estate Listings</h1>
      <p className="subtitle">
        Browse our ongoing projects and recently sold lands.
      </p>

      <Section title="Ongoing Projects" count={ongoing.length}>
        <div className="grid">
          {ongoing.map((item) => (
            <EstateCard key={item.id} {...item} />
          ))}
        </div>
      </Section>

      <Section title="Sold Out Lands" count={sold.length} grey>
        <div className="grid">
          {sold.map((item) => (
            <EstateCard key={item.id} {...item} sold />
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, count, children, grey }) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        <span className={`badge ${grey ? "grey" : ""}`}>{count}</span>
      </div>
      {children}
    </section>
  );
}

function EstateCard({ id, img, title, location, price, area, sold = false }) {
  const navigate = useNavigate();

  // ✅ your project stores auth in "auth_demo" (and sometimes "token")
  const authed =
    !!localStorage.getItem("auth_demo") || !!localStorage.getItem("token");

  const gotoContact = () => {
    if (authed) navigate("/contact");
    else navigate("/login", { state: { from: { pathname: "/contact" } } });
  };

  const viewDetails = () => {
    // ✅ FIX: go to /properties/:id (NOT /listings/:id)
    const dest = `/properties/${id}`;

    if (authed) navigate(dest);
    else navigate("/login", { state: { from: { pathname: dest } } });
  };

  return (
    <article className={`card ${sold ? "card--sold" : ""}`}>
      <div
        className="thumb"
        onClick={!sold ? viewDetails : undefined}
        style={{ cursor: sold ? "default" : "pointer" }}
        role={!sold ? "button" : undefined}
        tabIndex={!sold ? 0 : undefined}
        onKeyDown={
          !sold
            ? (e) => {
                if (e.key === "Enter") viewDetails();
              }
            : undefined
        }
      >
        <img src={img} alt={title} />
        {sold && <span className="ribbon">SOLD OUT</span>}
      </div>

      <div className="body">
        <h3>{title}</h3>
        <p className="muted">
          {location} • {area}
        </p>
        <div className="row">
          <span className="price">{price}</span>

          {!sold ? (
            <button className="btn" onClick={gotoContact}>
              Contact Agent
            </button>
          ) : (
            <button className="btn ghost" disabled>
              View Details
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
