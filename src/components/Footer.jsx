import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="ra2-footer">
      {/* BIG TOP-LEFT CURVE */}
      <div className="ra2-curve" aria-hidden="true" />

      <div className="ra2-inner">
        {/* LEFT: BRAND */}
        <section className="ra2-brand">
          <div className="ra2-brand-top">
            <div className="ra2-mark" aria-hidden="true" />
            <div>
              <h2 className="ra2-title">7hilax RealAgro</h2>
              <p className="ra2-sub">
                Verified properties • Trusted agents • Fast replies
              </p>
            </div>
          </div>

          <p className="ra2-desc">
            Find lands and properties across Sri Lanka with clear guidance and
            transparent deals. We help you shortlist, verify, and close — with
            friendly support.
          </p>

          <div className="ra2-badges">
            <span className="ra2-badge">Island-wide</span>
            <span className="ra2-badge">Verified</span>
            <span className="ra2-badge">Quick Site Visits</span>
          </div>

          <div className="ra2-contact">
            <a href="tel:+94740404505">📞 +94 740404505</a>
            <a href="mailto:7hilaxrealagro@gmail.com">
              ✉️ 7hilaxrealagro@gmail.com
            </a>
          </div>
        </section>

        {/* MIDDLE: OFFICE */}
        <section className="ra2-col">
          <h3 className="ra2-h">Office</h3>
          <ul className="ra2-list">
            <li>📍 Sri Lanka • Island-wide projects</li>
            <li>🕒 Mon – Sat: 9.00 AM – 7.00 PM</li>
            <li>✅ Fast response for enquiries</li>
          </ul>

          <div className="ra2-miniCard">
            <div className="ra2-miniTitle">Need a quick reply?</div>
            <div className="ra2-miniText">
              Message us anytime — we’ll respond as soon as possible.
            </div>
            <a
              className="ra2-miniBtn"
              href="https://wa.me/94740404505"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp →
            </a>
          </div>
        </section>

        {/* MIDDLE: LINKS */}
        <section className="ra2-col">
          <h3 className="ra2-h">Links</h3>
          <div className="ra2-links">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/properties">Properties</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/messages">Messages</NavLink>
          </div>

          <h3 className="ra2-h ra2-h2">Quick actions</h3>
          <div className="ra2-actions">
            <NavLink className="ra2-actionBtn" to="/properties">
              Explore Listings
            </NavLink>
            <NavLink className="ra2-actionBtn ghost" to="/contact">
              Contact Agent
            </NavLink>
          </div>
        </section>

        {/* RIGHT: NEWSLETTER + SOCIAL */}
        <section className="ra2-col">
          <h3 className="ra2-h">Stay updated</h3>
          <p className="ra2-note">
            Get new listings & updates. (Optional demo field)
          </p>

          <form className="ra2-news" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit" aria-label="Subscribe">
              Subscribe
            </button>
          </form>

          <div className="ra2-socialRow" aria-label="Social links">
            <a
              className="ra2-social"
              href="https://wa.me/94740404505"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              💬
            </a>
            <a
              className="ra2-social"
              href="mailto:7hilaxrealagro@gmail.com"
              aria-label="Email"
              title="Email"
            >
              ✉️
            </a>
            <a
              className="ra2-social"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              f
            </a>
            <a
              className="ra2-social"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              ⦿
            </a>
          </div>
        </section>
      </div>

      <div className="ra2-bottom">
        <span>© {new Date().getFullYear()} 7hilax RealAgro</span>
        <span className="ra2-sep">•</span>
        <span>All Rights Reserved</span>
      </div>
    </footer>
  );
}
