import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import estates from "../data/estates";
import "./propertyDetails.css";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const property = estates.find((p) => String(p.id) === String(id));

  if (!property) {
    return (
      <div className="pd-wrap">
        <div className="pd-notfound">
          <h1>Property not found</h1>
          <p>This listing may have been updated or removed.</p>
          <button
            className="pd-btn pd-btn-primary"
            onClick={() => navigate("/properties")}
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const isSold = property.status === "sold";

  const features =
    Array.isArray(property.features) && property.features.length
      ? property.features
      : [
          "Clear title / documents",
          "Good access road",
          "Ideal for investment",
          "Peaceful neighbourhood",
          "Electricity & water nearby",
          "Fast site visit support",
        ];

  const nearby =
    Array.isArray(property.nearby) && property.nearby.length
      ? property.nearby
      : [
          "Main road access",
          "Schools nearby",
          "Town area within reach",
          "Public transport",
        ];

  const description =
    property.description ||
    `A well-located ${property.area || "property"} in ${
      property.location || "Sri Lanka"
    } — carefully presented with a clean and professional buying process. Contact our team for availability, site visit scheduling, and guidance on next steps.`;

  return (
    <div className="pd-wrap">
      {/* HERO */}
      <section className="pd-hero">
        <img className="pd-hero-img" src={property.img} alt={property.title} />
        <div className="pd-hero-overlay" />

        <div className="pd-hero-content">
          <button className="pd-back" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <div className={`pd-badge ${isSold ? "sold" : "live"}`}>
            {isSold ? "Sold Out" : "Available"}
          </div>

          <h1 className="pd-hero-title">{property.title}</h1>

          <div className="pd-hero-sub">
            <span className="pd-pin">📍</span>
            <span>{property.location}</span>
            <span className="pd-dot">•</span>
            <span>{property.area}</span>
          </div>

          <div className="pd-price-row">
            <div className="pd-price">
              {property.price}
              <span className="pd-price-sub">Estimated market pricing</span>
            </div>

            <button
              className="pd-btn pd-btn-light"
              onClick={() => navigate("/contact")}
              disabled={isSold}
              title={isSold ? "This property is sold out" : "Contact agent"}
            >
              Contact Agent
            </button>
          </div>
        </div>
      </section>

      {/* BODY GRID */}
      <section className="pd-body">
        {/* LEFT */}
        <div className="pd-left">
          {/* KEY FACTS */}
          <div className="pd-card">
            <div className="pd-card-head">
              <h2>Key facts</h2>
              <p>Quick overview of the listing</p>
            </div>

            <div className="pd-facts">
              <Fact label="Location" value={property.location || "Sri Lanka"} />
              <Fact label="Area" value={property.area || "—"} />
              <Fact
                label="Status"
                value={isSold ? "Sold Out" : "Available"}
                highlight={!isSold}
              />
              <Fact label="Price" value={property.price || "—"} highlight />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="pd-card">
            <div className="pd-card-head">
              <h2>About this property</h2>
              <p>Details, guidance, and value</p>
            </div>
            <p className="pd-desc">{description}</p>

            <div className="pd-info-strip">
              <div className="pd-info">
                <b>✅ Verified support</b>
                <span>We guide you through every step</span>
              </div>
              <div className="pd-info">
                <b>⚡ Fast replies</b>
                <span>We respond quickly to enquiries</span>
              </div>
              <div className="pd-info">
                <b>📍 Site visits</b>
                <span>Schedule a visit easily</span>
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <div className="pd-card">
            <div className="pd-card-head">
              <h2>Highlights</h2>
              <p>Why buyers like this listing</p>
            </div>

            <div className="pd-feature-grid">
              {features.map((f, i) => (
                <div key={i} className="pd-feature">
                  <span className="pd-feature-ic">✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NEARBY */}
          <div className="pd-card">
            <div className="pd-card-head">
              <h2>Nearby & access</h2>
              <p>Connectivity and surroundings</p>
            </div>

            <div className="pd-nearby">
              {nearby.map((n, i) => (
                <div key={i} className="pd-nearby-item">
                  <span className="pd-nearby-dot" />
                  <span>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT (STICKY CONTACT) */}
        <aside className="pd-right">
          <div className="pd-sticky">
            <div className="pd-side-card">
              <div className="pd-side-title">Contact & next steps</div>
              <div className="pd-side-sub">
                Talk with our team and book a site visit.
              </div>

              <div className="pd-side-price">{property.price}</div>

              <button
                className="pd-btn pd-btn-primary"
                onClick={() => navigate("/contact")}
                disabled={isSold}
              >
                {isSold ? "Sold Out" : "Send Message"}
              </button>

              <a
                className="pd-btn pd-btn-outline"
                href="https://wa.me/94740404505"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Chat
              </a>

              <div className="pd-mini">
                <div className="pd-mini-row">
                  <span>Response time</span>
                  <b>Within the day</b>
                </div>
                <div className="pd-mini-row">
                  <span>Service area</span>
                  <b>Island-wide</b>
                </div>
                <div className="pd-mini-row">
                  <span>Support</span>
                  <b>Verified guidance</b>
                </div>
              </div>
            </div>

            <div className="pd-trust">
              <div className="pd-trust-title">Why 7hilax RealAgro?</div>
              <div className="pd-trust-row">✅ Clean process</div>
              <div className="pd-trust-row">✅ Transparent deal</div>
              <div className="pd-trust-row">✅ Quick site visits</div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Fact({ label, value, highlight }) {
  return (
    <div className={`pd-fact ${highlight ? "hl" : ""}`}>
      <div className="pd-fact-label">{label}</div>
      <div className="pd-fact-value">{value}</div>
    </div>
  );
}
