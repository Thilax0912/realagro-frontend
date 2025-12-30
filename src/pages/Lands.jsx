import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added
import lands from "../data/lands";
import "./Lands.css";

export default function Lands() {
  const navigate = useNavigate(); // ✅ added

  const [active, setActive] = useState("all"); // all | available | sold
  const [q, setQ] = useState(""); // UI-only search (filters title/location)

  const counts = useMemo(() => {
    const c = { all: lands.length, available: 0, sold: 0 };
    lands.forEach((l) => {
      if (l.status === "available") c.available += 1;
      if (l.status === "sold") c.sold += 1;
    });
    return c;
  }, []);

  const filtered = useMemo(() => {
    const base =
      active === "all" ? lands : lands.filter((l) => l.status === active);

    const term = q.trim().toLowerCase();
    if (!term) return base;

    return base.filter((l) => {
      const t = `${l.title} ${l.location}`.toLowerCase();
      return t.includes(term);
    });
  }, [active, q]);

  return (
    <div className="landsX">
      {/* HERO */}
      <section className="landsX-hero">
        <div className="landsX-heroBg" />
        <div className="landsX-heroGlow" />

        <div className="landsX-wrap">
          <div className="landsX-heroContent">
            <div className="landsX-pill">
              <span className="landsX-dot" />
              RealAgro Verified Lands
              <span className="landsX-ping" />
            </div>

            <h1 className="landsX-title">
              Premium <span>Lands</span> for Smart Investors
            </h1>

            <p className="landsX-sub">
              Explore curated land plots across Sri Lanka with a clean, premium
              experience — with trust-first details, professional support, and
              verified focus.
            </p>

            <div className="landsX-stats">
              <div className="landsX-stat">
                <div className="n">{counts.all}</div>
                <div className="t">Total Listings</div>
              </div>
              <div className="landsX-stat">
                <div className="n">{counts.available}</div>
                <div className="t">Available</div>
              </div>
              <div className="landsX-stat">
                <div className="n">{counts.sold}</div>
                <div className="t">Sold</div>
              </div>
            </div>

            {/* Premium Search / Filter Bar */}
            <div className="landsX-searchCard">
              <div className="landsX-searchTop">
                <div className="landsX-input">
                  <span className="ic">🔎</span>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by land name or location..."
                  />
                </div>

                <div className="landsX-tabs">
                  <button
                    className={`landsX-tab ${
                      active === "all" ? "isActive" : ""
                    }`}
                    onClick={() => setActive("all")}
                  >
                    All <span className="landsX-count">{counts.all}</span>
                  </button>
                  <button
                    className={`landsX-tab ${
                      active === "available" ? "isActive" : ""
                    }`}
                    onClick={() => setActive("available")}
                  >
                    Available{" "}
                    <span className="landsX-count">{counts.available}</span>
                  </button>
                  <button
                    className={`landsX-tab ${
                      active === "sold" ? "isActive" : ""
                    }`}
                    onClick={() => setActive("sold")}
                  >
                    Sold <span className="landsX-count">{counts.sold}</span>
                  </button>
                </div>
              </div>

              <div className="landsX-trustRow">
                <div className="landsX-trust">✅ Document-focused</div>
                <div className="landsX-trust">🧾 Clear details</div>
                <div className="landsX-trust">📍 Trusted locations</div>
                <div className="landsX-trust">📞 Agent support</div>
                <a className="landsX-ctaBtn" href="#lands-list">
                  Browse Lands →
                </a>
              </div>
            </div>
          </div>

          {/* Hero Side Card */}
          <div className="landsX-sideCard">
            <div className="landsX-sideTop">
              <div className="landsX-sideBadge">Verified Style</div>
              <div className="landsX-sideTitle">Buy with confidence</div>
              <div className="landsX-sideSub">
                We highlight listings with clean presentation, trust-first info,
                and professional guidance.
              </div>
            </div>

            <div className="landsX-sideKpis">
              <div className="kpi">
                <div className="k">Fast</div>
                <div className="v">Replies</div>
              </div>
              <div className="kpi">
                <div className="k">Clear</div>
                <div className="v">Docs</div>
              </div>
              <div className="kpi">
                <div className="k">Safe</div>
                <div className="v">Process</div>
              </div>
            </div>

            <a className="landsX-sideBtn" href="/contact">
              Talk to Agent →
            </a>
          </div>
        </div>
      </section>

      {/* LIST */}
      <section className="landsX-section" id="lands-list">
        <div className="landsX-head">
          <div>
            <h2 className="landsX-h2">Land Listings</h2>
            <p className="landsX-desc">
              Premium cards with clean details. Use search + tabs to filter
              instantly.
            </p>
          </div>

          <div className="landsX-miniInfo">
            Showing <b>{filtered.length}</b> results
          </div>
        </div>

        <div className="landsX-grid">
          {filtered.map((land) => (
            <article
              className={`landsX-card ${
                land.status === "sold" ? "isSold" : ""
              }`}
              key={land.id}
            >
              <div className="landsX-imgWrap">
                <img src={land.img} alt={land.title} />
                <div className="landsX-imgOverlay" />
                <div className={`landsX-badge ${land.status}`}>
                  {land.status === "available" ? "Available" : "Sold Out"}
                </div>
                <div className="landsX-code">#{land.id}</div>
              </div>

              <div className="landsX-body">
                <div className="landsX-nameRow">
                  <h3 className="landsX-name">{land.title}</h3>
                  <div className="landsX-verified">✔ Verified</div>
                </div>

                <p className="landsX-loc">📍 {land.location}</p>

                <div className="landsX-meta">
                  <div className="mBox">
                    <div className="mLbl">Area</div>
                    <div className="mVal">{land.area}</div>
                  </div>
                  <div className="mBox">
                    <div className="mLbl">Price</div>
                    <div className="mVal price">{land.price}</div>
                  </div>
                </div>

                <div className="landsX-actions">
                  <a className="landsX-btn primary" href="/contact">
                    Contact Agent
                  </a>

                  <button
                    className="landsX-btn ghost"
                    type="button"
                    onClick={() => {
                      if (land.status !== "sold") {
                        navigate(`/lands/${land.id}`);
                      }
                    }}
                    disabled={land.status === "sold"}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PRO CTA (premium long page feel) */}
      <section className="landsX-footerCta">
        <div className="landsX-footerInner">
          <div>
            <h3>Need help picking the right land?</h3>
            <p>
              Our team can guide you with location, pricing, and next steps —
              fast and professional.
            </p>
          </div>
          <a className="landsX-btn primary big" href="/contact">
            Contact Support →
          </a>
        </div>
      </section>
    </div>
  );
}
