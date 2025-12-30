import React from "react";
import "./Fruits.css";

// ✅ Put these images in: src/assets/fruits/
// You can rename them, just match the imports.
import heroImg from "../assets/fruits/hero-fruits.png";
import card1 from "../assets/fruits/card-order.jpg";
import card2 from "../assets/fruits/card-fresh.jpg";
import card3 from "../assets/fruits/card-new.jpg";
import card4 from "../assets/fruits/card-shop.jpg";

export default function Fruits() {
  return (
    <main className="fruits-page">
      {/* HERO */}
      <section className="fruits-hero">
        <div className="fruits-hero__inner">
          <div className="fruits-hero__left">
            <p className="fruits-hero__kicker">PROVIDING QUALITY PRODUCTS</p>

            <h1 className="fruits-hero__title">
              ORGANIC <span>FRUITS</span>
            </h1>

            <p className="fruits-hero__sub">100% Healthy &amp; Affordable</p>

            <div className="fruits-hero__actions">
              <button className="fruits-btn fruits-btn--primary">
                Shop Now
              </button>
              <button className="fruits-btn fruits-btn--ghost">
                View Offers
              </button>
            </div>

            <div className="fruits-hero__badges">
              <span className="fruit-badge">Fresh Daily</span>
              <span className="fruit-badge">Local Farmers</span>
              <span className="fruit-badge">Islandwide Delivery</span>
            </div>
          </div>

          <div className="fruits-hero__right">
            <div className="fruits-hero__imgWrap">
              <img src={heroImg} alt="Organic fruits" />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="fruits-cards">
        <div className="fruits-cards__inner">
          <Card
            title="ORDER"
            subtitle="Fresh fruits daily"
            price="From Rs. 180"
            img={card1}
          />
          <Card
            title="FRESH"
            subtitle="Seasonal selection"
            price="From Rs. 150"
            img={card2}
          />
          <Card
            title="NEW"
            subtitle="Latest arrivals"
            price="From Rs. 220"
            img={card3}
          />
          <Card
            title="SHOP"
            subtitle="All categories"
            price="From Rs. 120"
            img={card4}
          />
        </div>
      </section>
    </main>
  );
}

function Card({ title, subtitle, price, img }) {
  return (
    <article className="fruit-card">
      <div className="fruit-card__img">
        <img src={img} alt={title} />
      </div>

      <div className="fruit-card__body">
        <h3 className="fruit-card__title">{title}</h3>
        <p className="fruit-card__sub">{subtitle}</p>
        <p className="fruit-card__price">{price}</p>

        <button
          className="fruit-card__btn"
          type="button"
          aria-label={`Open ${title}`}
        >
          +
        </button>
      </div>
    </article>
  );
}
