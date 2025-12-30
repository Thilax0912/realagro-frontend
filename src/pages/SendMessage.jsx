// src/pages/SendMessage.jsx
import React, { useState } from "react";
import "../styles/sendMessage.css";
import api from "../lib/api";

export default function SendMessage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setOk("");
    setErr("");

    const name = (form.name || "").trim();
    const email = (form.email || "").trim();
    const message = (form.message || "").trim();

    // ✅ strong validation (prevents empty spaces)
    if (!name || !email || !message) {
      setErr("Message is required");
      return;
    }

    try {
      setLoading(true);

      // ✅ Send multiple keys so backend validation will pass
      // (some backends expect: message OR text OR content OR msg OR body)
      const payload = {
        name,
        email,

        // main key
        message,

        // compatibility keys (safe, backend will ignore unknown ones)
        text: message,
        content: message,
        msg: message,
        body: message,
      };

      await api.post("/api/messages", payload);

      setOk("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (e2) {
      setErr(e2?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      <div className="contact-page">
        {/* LEFT CARD (your old UI) */}
        <div className="contact-card contact-left">
          <h2 className="contact-title">
            Let's Talk <span className="contact-emoji">🤝</span>
          </h2>
          <p className="contact-subtitle">
            Ask about pricing, availability, or book a quick site visit. We'll
            get back to you within the day.
          </p>

          <ul className="contact-info-list">
            <li>
              <span className="contact-icon">📍</span>
              Sri Lanka • Island-wide projects
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <a className="contact-link" href="tel:+94740404505">
                +94 740404505
              </a>
            </li>
            <li>
              <span className="contact-icon">📧</span>
              <a
                className="contact-link"
                href="mailto:7hilaxrealagro@gmail.com"
              >
                7hilaxrealagro@gmail.com
              </a>
            </li>
          </ul>

          <a
            className="whatsapp-btn"
            href="https://wa.me/94740404505"
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* RIGHT CARD FORM (your old UI) */}
        <div className="contact-card contact-right">
          <h2 className="contact-title">
            Contact Our Team <span className="contact-emoji">📞</span>
          </h2>
          <p className="contact-subtitle">
            Send us a message and we&apos;ll reply as soon as possible.
          </p>

          {err && (
            <div className="contact-banner contact-banner-error">⚠️ {err}</div>
          )}
          {ok && (
            <div className="contact-banner contact-banner-success">✅ {ok}</div>
          )}

          <form className="contact-form" onSubmit={submit}>
            <div className="contact-field">
              <label>Your Name</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your name"
              />
            </div>

            <div className="contact-field">
              <label>Your Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
              />
            </div>

            <div className="contact-field">
              <label>Your Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Type your message..."
                rows={6}
              />
            </div>

            <button className="contact-submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            <div className="contact-privacy-text">
              By sending, you agree to our privacy policy.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
