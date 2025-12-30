import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import lands from "../data/lands";
import "./LandDetails.css";

export default function LandDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const land = useMemo(
    () => lands.find((l) => String(l.id) === String(id)),
    [id]
  );

  const [openFaq, setOpenFaq] = useState(0);

  // ✅ Hooks must be above any early return
  const similarLands = useMemo(() => {
    // ❗ exclude current land AND sold-out lands
    const others = lands.filter(
      (l) => String(l.id) !== String(id) && l.status === "available"
    );

    return others.slice(0, 6);
  }, [id]);


  if (!land) {
    return (
      <div className="ld-wrap" style={{ padding: "120px 16px" }}>
        <div className="ld-notFound">
          <h1>Land not found</h1>
          <p>The listing you’re looking for is not available.</p>
          <button
            className="ld-btn ld-btnPrimary"
            onClick={() => navigate("/lands")}
          >
            Back to Lands
          </button>
        </div>
      </div>
    );
  }

  // (Nice defaults if your land data doesn't have these fields)
  const title = land.title || "Premium Land";
  const location = land.location || "Sri Lanka";
  const price = land.price || "Contact for price";
  const area = land.area || "—";
  const status = land.status || "available";

  // Gallery: use land.img + some classy fallback images (so it always looks premium)
  const gallery = [
    land.img,
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
  ].filter(Boolean);

  const faq = [
    {
      q: "Are the documents verified and clear?",
      a: "We list lands with ownership clarity and basic verification. For final purchase, we recommend lawyer review and original deed checking.",
    },
    {
      q: "Can I do a site visit before buying?",
      a: "Yes. We can arrange a guided site visit and help you understand access roads, boundaries, and surrounding area.",
    },
    {
      q: "Is bank loan possible for this land?",
      a: "Many lands can be bank-loan friendly depending on documentation and bank policy. We’ll help you prepare required papers.",
    },
    {
      q: "Is the price negotiable?",
      a: "In most cases, yes. Negotiation depends on owner preference and current demand. Contact our agent for the best offer.",
    },
  ];

  const isAvailable = status === "available";

  return (
    <div className="ld">
      {/* TOP HERO */}
      <section className="ld-hero">
        <div
          className="ld-heroBg"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(6, 95, 70, .86), rgba(15, 23, 42, .65)), url("${gallery[0]}")`,
          }}
        />

        <div className="ld-wrap">
          <div className="ld-breadcrumbs">
            <button className="ld-link" onClick={() => navigate("/home")}>
              Home
            </button>
            <span>›</span>
            <button className="ld-link" onClick={() => navigate("/lands")}>
              Lands
            </button>
            <span>›</span>
            <span className="ld-bcActive">{title}</span>
          </div>

          <div className="ld-heroGrid">
            {/* Left Hero Content */}
            <div className="ld-heroContent">
              <div className="ld-badges">
                <span className="ld-badge ld-badgeVerified">
                  ✔ Verified Listing
                </span>
                <span
                  className={`ld-badge ${
                    isAvailable ? "ld-badgeAvail" : "ld-badgeSold"
                  }`}
                >
                  {isAvailable ? "Available" : "Sold Out"}
                </span>
                <span className="ld-badge ld-badgeCode">#{land.id}</span>
              </div>

              <h1 className="ld-title">{title}</h1>
              <p className="ld-sub">
                Premium land listing with a clean presentation — clear details,
                trusted location, and professional support for buyers.
              </p>

              <div className="ld-chips">
                <div className="ld-chip">📍 {location}</div>
                <div className="ld-chip">📐 {area}</div>
                <div className="ld-chip">🧾 Document-focused</div>
                <div className="ld-chip">📞 Agent support</div>
              </div>

              <div className="ld-heroActions">
                <button
                  className="ld-btn ld-btnPrimary"
                  onClick={() => navigate("/contact")}
                >
                  Contact Agent →
                </button>
                <button
                  className="ld-btn ld-btnGhost"
                  onClick={() => navigate("/lands")}
                >
                  Back to Listings
                </button>
              </div>
            </div>

            {/* Right Gallery Card */}
            <div className="ld-galleryCard">
              <div className="ld-gallery">
                <div className="ld-gMain">
                  <img src={gallery[0]} alt={title} />
                </div>
                <div className="ld-gSide">
                  <img src={gallery[1]} alt="Land view 2" />
                  <img src={gallery[2]} alt="Land view 3" />
                </div>
              </div>

              <div className="ld-galleryNote">
                <div className="ld-noteTitle">Premium Preview</div>
                <div className="ld-noteText">
                  Images are for preview. Site visit recommended for full
                  confirmation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="ld-body">
        <div className="ld-wrap ld-bodyGrid">
          {/* LEFT CONTENT */}
          <div className="ld-left">
            {/* Price + Key Specs */}
            <div className="ld-card ld-priceCard">
              <div>
                <div className="ld-label">Price</div>
                <div className="ld-price">{price}</div>
                <div className="ld-small">
                  Transparent guidance • Quick agent response • Negotiation
                  support
                </div>
              </div>
              <button
                className="ld-btn ld-btnPrimary"
                onClick={() => navigate("/contact")}
              >
                Get Best Offer →
              </button>
            </div>

            <div className="ld-specGrid">
              <div className="ld-spec">
                <div className="k">Area</div>
                <div className="v">{area}</div>
              </div>
              <div className="ld-spec">
                <div className="k">Location</div>
                <div className="v">{location}</div>
              </div>
              <div className="ld-spec">
                <div className="k">Listing Status</div>
                <div className="v">
                  {isAvailable ? "Available" : "Sold Out"}
                </div>
              </div>
              <div className="ld-spec">
                <div className="k">Support</div>
                <div className="v">Site Visit + Agent</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="ld-card">
              <div className="ld-cardHead">
                <h2>Highlights</h2>
                <span className="ld-pill">Trust-first</span>
              </div>
              <div className="ld-highlights">
                <div className="ld-hItem">✔ Clear details shown</div>
                <div className="ld-hItem">✔ Location-focused listing</div>
                <div className="ld-hItem">✔ Site visit guidance</div>
                <div className="ld-hItem">✔ Professional support</div>
              </div>
            </div>

            {/* About */}
            <div className="ld-card">
              <div className="ld-cardHead">
                <h2>About this land</h2>
              </div>
              <p className="ld-p">
                This listing is presented in a premium format to help buyers
                understand key factors quickly. For final purchase, we always
                recommend verifying original documents, survey plan, and
                boundaries through a site visit and legal review.
              </p>
              <p className="ld-p">
                Perfect for investment or future development depending on local
                regulations and access.
              </p>
            </div>

            {/* Documents & Verification */}
            <div className="ld-card ld-verifyCard">
              <div className="ld-cardHead">
                <h2>Documents & Verification</h2>
                <span className="ld-pill green">✔ Verified Focus</span>
              </div>
              <div className="ld-verifyGrid">
                <div className="ld-verify">
                  <div className="t">🧾 Ownership</div>
                  <div className="d">Clear deed guidance</div>
                </div>
                <div className="ld-verify">
                  <div className="t">📐 Survey</div>
                  <div className="d">Survey plan recommended</div>
                </div>
                <div className="ld-verify">
                  <div className="t">🏦 Bank Loan</div>
                  <div className="d">Possible (depends on bank)</div>
                </div>
                <div className="ld-verify">
                  <div className="t">🛡️ Safety</div>
                  <div className="d">No hidden content</div>
                </div>
              </div>

              <div className="ld-verifyNote">
                Tip: Final verification should be done with original documents &
                legal professional.
              </div>
            </div>

            {/* FAQ */}
            <div className="ld-card">
              <div className="ld-cardHead">
                <h2>FAQ</h2>
                <span className="ld-pill">Most asked</span>
              </div>

              <div className="ld-faq">
                {faq.map((item, idx) => (
                  <button
                    key={item.q}
                    className={`ld-faqItem ${openFaq === idx ? "open" : ""}`}
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    type="button"
                  >
                    <div className="ld-faqQ">
                      <span>{item.q}</span>
                      <span className="ld-faqIcon">
                        {openFaq === idx ? "−" : "+"}
                      </span>
                    </div>
                    {openFaq === idx && <div className="ld-faqA">{item.a}</div>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT STICKY */}
          <aside className="ld-right">
            <div className="ld-sticky">
              <div className="ld-card ld-agentCard">
                <div className="ld-agentTop">
                  <div className="ld-agentAvatar">RA</div>
                  <div>
                    <div className="ld-agentTitle">RealAgro Support</div>
                    <div className="ld-agentSub">
                      Fast reply • Professional guidance
                    </div>
                  </div>
                </div>

                <div className="ld-agentActions">
                  <button
                    className="ld-btn ld-btnPrimary"
                    onClick={() => navigate("/contact")}
                  >
                    Talk to Agent →
                  </button>
                  <button
                    className="ld-btn ld-btnDark"
                    onClick={() => navigate("/contact")}
                  >
                    Request Site Visit
                  </button>
                </div>

                <div className="ld-miniTrust">
                  <div className="mt">✅ Verified-focused</div>
                  <div className="mt">🧾 Clear guidance</div>
                  <div className="mt">📍 Location info</div>
                  <div className="mt">🛡️ Safer process</div>
                </div>
              </div>

              <div className="ld-card ld-locCard">
                <div className="ld-cardHead">
                  <h3>Location</h3>
                  <span className="ld-pill green">📍 {location}</span>
                </div>

                <div className="ld-mapMock">
                  Map Preview
                  <div className="ld-mapSmall">
                    Add Google Map later if you want
                  </div>
                </div>

                <div className="ld-small">
                  We recommend a site visit to confirm road access, boundaries,
                  and neighborhood details.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ✅ Similar Lands (added at end, UI unchanged) */}
      <section className="ld-body" style={{ paddingTop: 0 }}>
        <div className="ld-wrap">
          <div className="ld-card">
            <div className="ld-cardHead">
              <h2>Similar Lands</h2>
              <span className="ld-pill green">Explore more</span>
            </div>

            <p className="ld-small" style={{ marginTop: 0 }}>
              Click any land to view details instantly.
            </p>

            <div className="ld-simGrid">
              {similarLands.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="ld-simCard"
                  onClick={() => navigate(`/lands/${s.id}`)}
                >
                  <div className="ld-simImg">
                    <img src={s.img} alt={s.title} />
                    <span
                      className={`ld-simBadge ${
                        s.status === "available" ? "a" : "s"
                      }`}
                    >
                      {s.status === "available" ? "Available" : "Sold Out"}
                    </span>
                  </div>

                  <div className="ld-simBody">
                    <div className="ld-simTitle">{s.title}</div>
                    <div className="ld-simLoc">📍 {s.location}</div>

                    <div className="ld-simMeta">
                      <span>📐 {s.area}</span>
                      <span className="p">{s.price}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="ld-footer">
        <div className="ld-wrap ld-footerInner">
          <div>
            <h2>Ready to explore this land?</h2>
            <p>
              Contact our agent for price confirmation, site visit, and next
              steps.
            </p>
          </div>
          <button
            className="ld-btn ld-btnPrimary big"
            onClick={() => navigate("/contact")}
          >
            Contact Agent →
          </button>
        </div>
      </section>
    </div>
  );
}
