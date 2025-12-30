// src/components/ProductGrid.jsx
import React from "react";
import { products } from "../data/products";

/**
 * ProductGrid
 * Props:
 *  - title: section title
 *  - subtitle: small description
 *  - category: "fruit" | "chicken"
 *  - onProductClick?: (product) => void
 */
export default function ProductGrid({
  title,
  subtitle,
  category,
  onProductClick,
}) {
  const list = products[category] || [];

  return (
    <section style={{ padding: "60px 0" }}>
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "800",
            color: "#d97706",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            marginTop: "10px",
            maxWidth: "720px",
            marginInline: "auto",
            color: "#6b7280",
            fontSize: "15px",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          paddingInline: "16px",
        }}
      >
        {list.map((item) => {
          const isAvailable = item.available;

          return (
            <button
              key={item.id}
              onClick={() => onProductClick && onProductClick(item)}
              type="button"
              style={{
                // reset button
                border: "none",
                padding: 0,
                background: "transparent",
                textAlign: "inherit",
                cursor: "pointer",
              }}
            >
              <div
                className="product-card"
                style={{
                  position: "relative",
                  background: "#ffffff",
                  borderRadius: "18px",
                  padding: "16px 16px 18px",
                  boxShadow: "0 14px 35px rgba(15, 23, 42, 0.08)",
                  overflow: "hidden",
                  transition: "transform 0.18s ease, box-shadow 0.18s ease",
                  transform: "translateY(0)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 45px rgba(15, 23, 42, 0.16)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 35px rgba(15, 23, 42, 0.08)";
                }}
              >
                {/* Sold out ribbon */}
                {!isAvailable && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "-36px",
                      padding: "4px 50px",
                      background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "11px",
                      textTransform: "uppercase",
                      transform: "rotate(-35deg)",
                      boxShadow: "0 4px 10px rgba(239, 68, 68, 0.4)",
                    }}
                  >
                    Sold Out
                  </div>
                )}

                {/* Image wrapper */}
                <div
                  style={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    marginBottom: "14px",
                    position: "relative",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "170px",
                      objectFit: "cover",
                      display: "block",
                      transition:
                        "transform 0.25s ease, filter 0.25s ease, opacity 0.25s ease",
                      filter: isAvailable ? "none" : "grayscale(80%)",
                      opacity: isAvailable ? 1 : 0.7,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />

                  {/* subtle gradient shine on hover via pseudo-element effect */}
                  <div
                    style={{
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(120deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.0) 80%)",
                      opacity: 0,
                      pointerEvents: "none",
                      transition: "opacity 0.25s ease",
                    }}
                    className="shine-layer"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = 1;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = 0;
                    }}
                  />
                </div>

                {/* Text */}
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "4px",
                    }}
                  >
                    {item.name}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      marginBottom: "10px",
                    }}
                  >
                    {item.subtitle}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        color: isAvailable ? "#16a34a" : "#9ca3af",
                        fontSize: "14px",
                      }}
                    >
                      {item.price}
                    </span>

                    <span
                      style={{
                        fontSize: "12px",
                        padding: "5px 10px",
                        borderRadius: "999px",
                        backgroundColor: isAvailable
                          ? "rgba(34,197,94,0.08)"
                          : "rgba(156,163,175,0.15)",
                        color: isAvailable ? "#15803d" : "#6b7280",
                        fontWeight: 600,
                      }}
                    >
                      {isAvailable ? "Available" : "Coming soon"}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
