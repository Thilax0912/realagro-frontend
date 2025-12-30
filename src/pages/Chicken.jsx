import React from "react";
import "./Chicken.css";

import heroImg from "../assets/chicken/chicken-hero.png";
import wholeImg from "../assets/chicken/whole.png";
import breastImg from "../assets/chicken/breast.png";
import drumImg from "../assets/chicken/drumsticks.png";
import wingsImg from "../assets/chicken/wings.png";

const chickenProducts = [
  {
    id: 1,
    name: "Fresh Whole Chicken",
    price: "LKR 1,450 / kg",
    desc: "Farm-raised whole chicken, hygienically processed and freshly packed.",
    img: wholeImg,
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Chicken Breast",
    price: "LKR 2,200 / kg",
    desc: "Lean, boneless chicken breast – perfect for healthy meals.",
    img: breastImg,
    tag: "High Protein",
  },
  {
    id: 3,
    name: "Chicken Drumsticks",
    price: "LKR 1,850 / kg",
    desc: "Juicy drumsticks ideal for frying, grilling, or roasting.",
    img: drumImg,
    tag: "Family Pack",
  },
  {
    id: 4,
    name: "Chicken Wings",
    price: "LKR 1,750 / kg",
    desc: "Tender wings with rich flavor – great for snacks and BBQ.",
    img: wingsImg,
    tag: "BBQ Ready",
  },
];

export default function Chicken() {
  return (
    <div className="chicken-page">
      {/* background decoration */}
      <div className="bg-blob blob-a" />
      <div className="bg-blob blob-b" />

      {/* HERO */}
      <section className="chicken-hero">
        <div className="chicken-hero-text">
          <span className="badge">Fresh • Hygienic • Daily Cut</span>

          <h1>
            Premium <span className="accent">Chicken</span> Cuts
            <br />
            Delivered Fresh
          </h1>

          <p>
            Carefully sourced, freshly cut, and packed with high hygiene
            standards. Clean taste, better quality, and perfect for every meal.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">Shop Chicken</button>
            <button className="ghost-btn">View Pricing</button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">100%</div>
              <div className="stat-label">Hygienic Packed</div>
            </div>
            <div className="stat">
              <div className="stat-num">Daily</div>
              <div className="stat-label">Fresh Cutting</div>
            </div>
            <div className="stat">
              <div className="stat-num">Fast</div>
              <div className="stat-label">Delivery</div>
            </div>
          </div>
        </div>

        <div className="chicken-hero-media">
          <div className="hero-card">
            <img src={heroImg} alt="Fresh Chicken" />
            <div className="hero-chip chip-a">🔥 Hot Deals</div>
            <div className="hero-chip chip-b">✅ Quality Checked</div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="chicken-products">
        <div className="section-head">
          <h2>Our Chicken Products</h2>
          <p className="sub-text">
            Fresh cuts prepared daily to ensure quality, taste, and nutrition.
          </p>
        </div>

        <div className="product-grid">
          {chickenProducts.map((item) => (
            <div key={item.id} className="product-card">
              <div className="product-img">
                <img src={item.img} alt={item.name} />
                <span className="product-pill">{item.tag}</span>
              </div>

              <div className="product-body">
                <h3>{item.name}</h3>
                <p className="desc">{item.desc}</p>

                <div className="meta-row">
                  <span className="price">{item.price}</span>
                  <span className="mini">
                    ⭐ 4.{(item.id + 3) % 10} • Fresh
                  </span>
                </div>

                <div className="btn-row">
                  <button className="cart-btn">Add to Cart</button>
                  <button className="outline-btn">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
