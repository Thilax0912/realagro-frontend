import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import logo from "../assets/logo.jpg";

// Optional images (recommended). If you don't have, comment these imports and it's still nice.
// Put any high-quality images with these names:
import heroImg from "../assets/home-hero.jpg";
import verifyImg from "../assets/home-verify.jpg";
import supportImg from "../assets/home-support.jpg";

export default function Home() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    q: "",
    loc: "",
    cat: "All",
    min: "",
    max: "",
  });

  const featured = useMemo(
    () => [
      {
        tag: "Verified",
        title: "Premium Land – Colombo",
        place: "Colombo",
        price: "LKR 12.5M",
        meta: ["12 Perches", "Clear Deeds"],
      },
      {
        tag: "Hot",
        title: "Farmland – Jaffna",
        place: "Jaffna",
        price: "LKR 7.9M",
        meta: ["25 Perches", "Road Access"],
      },
      {
        tag: "New",
        title: "Investment Plot – Galle",
        place: "Galle",
        price: "LKR 9.2M",
        meta: ["15 Perches", "Near Town"],
      },
    ],
    []
  );

  const categories = useMemo(
    () => [
      {
        title: "Lands",
        desc: "Verified plots & farmland",
        icon: "🌿",
        route: "/lands",
      },
      {
        title: "Fruits",
        desc: "Fresh harvest marketplace",
        icon: "🍍",
        route: "/fruits",
      },
      {
        title: "Chicken",
        desc: "Trusted poultry supply",
        icon: "🍗",
        route: "/chicken",
      },
    ],
    []
  );

  const reviews = useMemo(
    () => [
      {
        name: "Tharushi",
        place: "Colombo",
        text: "Very professional. Document verification was clear and fast. The UI feels premium and trustworthy.",
        rating: 5,
      },
      {
        name: "Suresh",
        place: "Jaffna",
        text: "Site visit was arranged quickly. The agent support was excellent. I bought farmland with confidence.",
        rating: 5,
      },
      {
        name: "Kavitha",
        place: "Galle",
        text: "Clean platform with verified listings. Loved the support team and the detail in each listing.",
        rating: 5,
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Are documents verified before listing?",
        a: "Yes. Listings are checked for ownership clarity, deed status, and basic legal validation before highlighting as verified.",
      },
      {
        q: "Can I book a site visit?",
        a: "Yes. Contact support or the agent directly from the platform to schedule a visit quickly.",
      },
      {
        q: "How do I get help if I’m new?",
        a: "Our customer support team will guide you step-by-step from search → visit → purchase.",
      },
    ],
    []
  );

  const onChange = (k) => (e) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.q) params.set("q", form.q);
    if (form.loc) params.set("loc", form.loc);
    if (form.cat && form.cat !== "All") params.set("cat", form.cat);
    if (form.min) params.set("min", form.min);
    if (form.max) params.set("max", form.max);
    navigate(`/lands?${params.toString()}`);
  };

  return (
    <div className="homeX">
      {/* ================= HERO ================= */}
      <section className="heroX">
        <div className="heroX-bg">
          {/* If image exists, it shows. If not, gradients still look premium */}
          <div
            className="heroX-img"
            style={{ backgroundImage: `url(${heroImg})` }}
            aria-hidden="true"
          />
          <div className="heroX-grad" aria-hidden="true" />
          <div className="heroX-noise" aria-hidden="true" />
        </div>

        <div className="wrapX heroX-wrap">
          <div className="heroX-left">
            <div className="topPill">
              <span className="dot" />
              Verified Real Estate & Agro Marketplace
              <span className="spark" />
            </div>

            <h1 className="heroX-title">
              Discover Premium <span className="g">Lands</span>,{" "}
              <span className="g">Fruits</span> &{" "}
              <span className="g">Chicken</span>
              <span className="br" /> with{" "}
              <span className="brand">7hilax RealAgro</span>
            </h1>

            <p className="heroX-sub">
              A modern platform built on trust:{" "}
              <b>document-cleared verification</b>, transparent details, fast
              support, and premium experience across Sri Lanka.
            </p>

            {/* SEARCH */}
            <form className="searchX" onSubmit={onSearch}>
              <div className="searchX-row">
                <div className="inX">
                  <span className="ic">🔎</span>
                  <input
                    value={form.q}
                    onChange={onChange("q")}
                    placeholder="Search lands, farms, fruits..."
                  />
                </div>

                <div className="inX">
                  <span className="ic">📍</span>
                  <input
                    value={form.loc}
                    onChange={onChange("loc")}
                    placeholder="Location (Colombo, Jaffna...)"
                  />
                </div>

                <div className="inX">
                  <span className="ic">🗂️</span>
                  <select value={form.cat} onChange={onChange("cat")}>
                    <option>All</option>
                    <option>Lands</option>
                    <option>Fruits</option>
                    <option>Chicken</option>
                  </select>
                </div>

                <button className="btnX btnX-green" type="submit">
                  Search
                </button>
              </div>

              <div className="searchX-bottom">
                <div className="chips">
                  <button
                    type="button"
                    className="chipX"
                    onClick={() => navigate("/lands")}
                  >
                    🌿 Explore Lands
                  </button>
                  <button
                    type="button"
                    className="chipX"
                    onClick={() => navigate("/fruits")}
                  >
                    🍍 Fruits Market
                  </button>
                  <button
                    type="button"
                    className="chipX"
                    onClick={() => navigate("/chicken")}
                  >
                    🍗 Chicken Supply
                  </button>
                  <button
                    type="button"
                    className="chipX chipX-soft"
                    onClick={() => navigate("/contact")}
                  >
                    📞 Support / Agent
                  </button>
                </div>

                <div className="miniPrice">
                  <div className="miniIn">
                    <label>Min</label>
                    <input
                      value={form.min}
                      onChange={onChange("min")}
                      placeholder="1000000"
                      inputMode="numeric"
                    />
                  </div>
                  <div className="miniIn">
                    <label>Max</label>
                    <input
                      value={form.max}
                      onChange={onChange("max")}
                      placeholder="15000000"
                      inputMode="numeric"
                    />
                  </div>
                </div>
              </div>
            </form>

            <div className="heroX-stats">
              <div className="statX">
                <div className="n">500+</div>
                <div className="t">Happy Clients</div>
              </div>
              <div className="statX">
                <div className="n">120+</div>
                <div className="t">Active Listings</div>
              </div>
              <div className="statX">
                <div className="n">100%</div>
                <div className="t">Verification Focus</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="heroX-right">
            <div className="glassCard">
              <div className="glassTop">
                <img className="glassLogo" src={logo} alt="7hilax RealAgro" />
                <div className="glassBadge">Document Cleared</div>
              </div>

              <div
                className="glassImg"
                style={{ backgroundImage: `url(${heroImg})` }}
              >
                <div className="glassFloat">
                  <div className="gfT">Verified Listings</div>
                  <div className="gfS">Deeds • Survey • Location</div>
                </div>
              </div>

              <div className="glassBody">
                <div className="glassTitle">
                  Trusted Deals. Premium Experience.
                </div>
                <div className="glassSub">
                  Book site visits & connect with agents fast.
                </div>

                <div className="kpis">
                  <div className="kpi">
                    <div className="k">Fast</div>
                    <div className="v">Support</div>
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

                <div className="glassBtns">
                  <button
                    className="btnX btnX-dark"
                    onClick={() => navigate("/lands")}
                  >
                    View Listings →
                  </button>
                  <button
                    className="btnX btnX-line"
                    onClick={() => navigate("/contact")}
                  >
                    Talk to Support
                  </button>
                </div>
              </div>
            </div>

            <div className="trustStrip">
              <div className="trustItem">✅ Verified Deeds</div>
              <div className="trustItem">🛡️ Safe Guidance</div>
              <div className="trustItem">⚡ Fast Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="sectionX">
        <div className="headX wrapX">
          <div>
            <h2>Featured Verified Listings</h2>
            <p>Premium lands with trusted details & clear documents.</p>
          </div>
          <button
            className="btnX btnX-lineDark"
            onClick={() => navigate("/lands")}
          >
            See All →
          </button>
        </div>

        <div className="wrapX grid3X">
          {featured.map((x, i) => (
            <article key={i} className="cardX">
              <div className="cardTopX">
                <span className={`tagX t-${x.tag.toLowerCase()}`}>{x.tag}</span>
                <span className="priceX">{x.price}</span>
              </div>

              <div className="cardTitleX">{x.title}</div>
              <div className="cardSubX">{x.place} • Sri Lanka</div>

              <div className="metaX">
                <span>📌 {x.meta[0]}</span>
                <span>📄 {x.meta[1]}</span>
              </div>

              <div className="cardBtnsX">
                <button
                  className="btnX btnX-green"
                  onClick={() => navigate("/lands")}
                >
                  View
                </button>
                <button
                  className="btnX btnX-ghost"
                  onClick={() => navigate("/contact")}
                >
                  Contact
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= VERIFICATION ================= */}
      <section className="sectionX softX">
        <div className="wrapX splitX">
          <div
            className="imgBoxX"
            style={{ backgroundImage: `url(${verifyImg})` }}
          >
            <div className="imgGlowX" />
          </div>

          <div className="textBoxX">
            <h2>Document-Cleared Verification</h2>
            <p>
              We focus on trust. Verified listings are highlighted after basic
              checks — ownership clarity, deed status, and information accuracy
              — so buyers feel confident.
            </p>

            <div className="tickGridX">
              <div className="tickX">✔ Clear deed focus</div>
              <div className="tickX">✔ No confusion pricing</div>
              <div className="tickX">✔ Verified location info</div>
              <div className="tickX">✔ Buyer guidance</div>
            </div>

            <div className="ctaRowX">
              <button
                className="btnX btnX-green"
                onClick={() => navigate("/contact")}
              >
                Verify With Team →
              </button>
              <button
                className="btnX btnX-lineDark"
                onClick={() => navigate("/lands")}
              >
                Explore Verified Listings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUPPORT ================= */}
      <section className="sectionX">
        <div className="wrapX splitX reverseX">
          <div
            className="imgBoxX"
            style={{ backgroundImage: `url(${supportImg})` }}
          >
            <div className="imgGlowX" />
          </div>

          <div className="textBoxX">
            <h2>Customer Support That Feels Premium</h2>
            <p>
              Get help anytime. Our support guides you from search → visit →
              documents → purchase. Quick replies and clear answers.
            </p>

            <div className="supportCardsX">
              <div className="miniCardX">
                <div className="miniIconX">💬</div>
                <div>
                  <div className="miniT">Fast Replies</div>
                  <div className="miniS">Message support & quick help</div>
                </div>
              </div>
              <div className="miniCardX">
                <div className="miniIconX">📞</div>
                <div>
                  <div className="miniT">Agent Calls</div>
                  <div className="miniS">Talk directly for guidance</div>
                </div>
              </div>
              <div className="miniCardX">
                <div className="miniIconX">📍</div>
                <div>
                  <div className="miniT">Site Visits</div>
                  <div className="miniS">Schedule visits easily</div>
                </div>
              </div>
            </div>

            <button
              className="btnX btnX-green"
              onClick={() => navigate("/contact")}
            >
              Contact Support →
            </button>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="sectionX softX">
        <div className="headX wrapX">
          <div>
            <h2>Customer Reviews</h2>
            <p>Real trust comes from real experiences.</p>
          </div>
        </div>

        <div className="wrapX grid3X">
          {reviews.map((r, idx) => (
            <div className="reviewX" key={idx}>
              <div className="starsX">{"★★★★★".slice(0, r.rating)}</div>
              <p className="reviewTextX">“{r.text}”</p>
              <div className="reviewByX">
                <div className="avatarX">{r.name.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="byNameX">{r.name}</div>
                  <div className="byPlaceX">{r.place}, Sri Lanka</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="sectionX">
        <div className="headX wrapX">
          <div>
            <h2>Explore Categories</h2>
            <p>Everything in one platform — clean, fast, trusted.</p>
          </div>
        </div>

        <div className="wrapX grid3X">
          {categories.map((c) => (
            <button
              key={c.title}
              className="catX"
              onClick={() => navigate(c.route)}
            >
              <div className="catIconX">{c.icon}</div>
              <div className="catTextX">
                <div className="catTitleX">{c.title}</div>
                <div className="catSubX">{c.desc}</div>
              </div>
              <div className="catGoX">→</div>
            </button>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="sectionX softX">
        <div className="headX wrapX">
          <div>
            <h2>FAQ</h2>
            <p>Quick answers to common questions.</p>
          </div>
        </div>

        <div className="wrapX faqX">
          {faqs.map((f, i) => (
            <details key={i} className="faqItemX">
              <summary>{f.q}</summary>
              <div className="faqA">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="ctaX">
        <div className="wrapX ctaInnerX">
          <div>
            <h2>Ready to Find Your Best Deal?</h2>
            <p>
              Explore verified listings and talk to support to get started
              today.
            </p>
          </div>
          <div className="ctaBtnsX">
            <button
              className="btnX btnX-dark"
              onClick={() => navigate("/lands")}
            >
              Explore Lands →
            </button>
            <button
              className="btnX btnX-line"
              onClick={() => navigate("/contact")}
            >
              Talk to Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
