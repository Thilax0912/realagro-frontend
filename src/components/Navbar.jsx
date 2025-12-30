import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, isAdmin } from "../lib/auth";
import "./Navbar.css";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = getAuth();
  const admin = isAdmin();

  const logout = () => {
    localStorage.removeItem("auth_demo");
    localStorage.removeItem("token");
    navigate("/home", { replace: true });
  };

  const navLinkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " nav-link--active" : "");

  const firstLetter = (user?.name || user?.email || "U")
    .toString()
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* ----- LEFT: Brand + main links ----- */}
        <div className="navbar-left">
          {/* BRAND: ONLY LOGO */}
          <button
            type="button"
            className="brand-btn"
            onClick={() => navigate("/home")}
          >
            <img
              src={logo}
              alt="7hilax RealAgro"
              style={{
                height: "70px",
                objectFit: "contain",
                display: "block",
              }}
            />
          </button>

          <nav className="navbar-links">
            <NavLink to="/home" className={navLinkClass}>
              Home
            </NavLink>

            {/* ❌ Properties REMOVED */}

            <NavLink to="/lands" className={navLinkClass}>
              Lands
            </NavLink>

            <NavLink to="/fruits" className={navLinkClass}>
              Fruits
            </NavLink>

            <NavLink to="/chicken" className={navLinkClass}>
              Chicken
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>

            {user && (
              <NavLink to="/messages" className={navLinkClass}>
                Messages
              </NavLink>
            )}

            {(!user || admin) && (
              <NavLink
                to={admin ? "/admin" : "/admin-login"}
                className={navLinkClass}
              >
                Admin
              </NavLink>
            )}
          </nav>
        </div>

        {/* ----- RIGHT: Auth actions ----- */}
        <div className="navbar-auth">
          {user ? (
            <>
              <button
                type="button"
                className="chip"
                onClick={() => navigate("/profile")}
              >
                <span className="chip-avatar">{firstLetter}</span>
                <span className="chip-label">{user.name || "Profile"}</span>
              </button>

              <button
                type="button"
                className="nav-btn nav-btn--ghost"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              className="nav-btn nav-btn--primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
