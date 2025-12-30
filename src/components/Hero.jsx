// src/components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/realagro.jpg"; // keep using your existing image
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/properties");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <section className="hero">
      <div className="hero-inner">
        {/* LEFT SIDE — TEXT */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>Real Estate Agency</span>
          </div>

          <h1 className="hero-title">
            Find Your Dream <span>Land</span> With 7hilax RealAgro
          </h1>

          <p className="hero-subtitle">
            Premium properties across Sri Lanka with trusted guidance from our
            expert agents. Discover homes, lands, and investment opportunities
            tailored just for you.
          </p>

          <div className="hero-cta">
            <button className="hero-primary-btn" onClick={handleExplore}>
              Explore Listings
            </button>

            <button className="hero-secondary-btn" onClick={handleContact}>
              Contact Agent
            </button>
          </div>

          <div className="hero-meta">
            <div>
              <span className="hero-meta-number">500+</span>
              <span className="hero-meta-label">Happy Clients</span>
            </div>
            <div>
              <span className="hero-meta-number">120+</span>
              <span className="hero-meta-label">Active Listings</span>
            </div>
            <div>
              <span className="hero-meta-number">Island-wide</span>
              <span className="hero-meta-label">Projects</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — IMAGE CARD */}
        <div className="hero-right">
          <div className="hero-card">
            <div className="hero-card-image-wrap">
              <img src={heroImg} alt="Featured property" />
            </div>

            <div className="hero-card-content">
              <p className="hero-card-tag">Featured Listing</p>
              <h3 className="hero-card-title">Find Your Dream Land</h3>
              <p className="hero-card-location">Colombo • Sri Lanka</p>

              <div className="hero-card-footer">
                <div>
                  <span className="hero-card-value">2</span>
                  <span className="hero-card-label">Ongoing Projects</span>
                </div>
                <div>
                  <span className="hero-card-value">27</span>
                  <span className="hero-card-label">Sold out lands</span>
                </div>
                <div>
                  <span className="hero-card-value">2,100</span>
                  <span className="hero-card-label">sq ft</span>
                </div>
              </div>
            </div>
          </div>

          {/* Small floating stats card, like the design */}
          <div className="hero-float-card">
            <span className="hero-float-dot" />
            <div>
              <p className="hero-float-title">Instant Site Visits</p>
              <p className="hero-float-sub">Book and confirm in minutes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
