// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import "./styles.css";

import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";

import Home from "./pages/Home";
import Listings from "./pages/Listings";
import SendMessage from "./pages/SendMessage";
import PropertyDetails from "./pages/PropertyDetails";
import Properties from "./pages/Properties";
import LandDetails from "./pages/LandDetails";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Fruits from "./pages/Fruits";
import Lands from "./pages/Lands";
import Chicken from "./pages/Chicken";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import MyMessages from "./pages/MyMessages";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminListings from "./pages/admin/AdminListings";
import AdminProfile from "./pages/admin/AdminProfile";

import { isAdmin } from "./lib/auth";

// Admin Gate
function AdminRoute({ children }) {
  return isAdmin() ? children : <Navigate to="/admin-login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Redirect root to home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public Pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/properties" element={<Listings />} />
        <Route path="/listings" element={<Listings />} />

        {/* Contact / Messages - Protected */}
        <Route
          path="/contact"
          element={
            <RequireAuth>
              <SendMessage />
            </RequireAuth>
          }
        />

        <Route
          path="/contact-agent"
          element={
            <RequireAuth>
              <SendMessage />
            </RequireAuth>
          }
        />
        <Route path="/lands/:id" element={<LandDetails />} />

        <Route
          path="/listings/:id"
          element={
            <RequireAuth>
              <PropertyDetails />
            </RequireAuth>
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* User Dashboard Pages */}
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route
          path="/properties/:id"
          element={
            <RequireAuth>
              <PropertyDetails />
            </RequireAuth>
          }
        />
        <Route path="/chicken" element={<Chicken />} />

        <Route
          path="/messages"
          element={
            <RequireAuth>
              <MyMessages />
            </RequireAuth>
          }
        />
        <Route path="/properties/:id" element={<PropertyDetails />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/messages"
          element={
            <AdminRoute>
              <AdminMessages />
            </AdminRoute>
          }
        />
        <Route
          path="/fruits"
          element={<div style={{ padding: "80px" }}>🍎 Fruits Page</div>}
        />
        <Route
          path="/chicken"
          element={<div style={{ padding: "80px" }}>🍗 Chicken Page</div>}
        />
        <Route path="/lands" element={<Lands />} />

        <Route
          path="/admin/listings"
          element={
            <AdminRoute>
              <AdminListings />
            </AdminRoute>
          }
        />
        <Route path="/properties/:id" element={<PropertyDetails />} />

        <Route
          path="/admin/profile"
          element={
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div
              style={{
                padding: "80px 24px",
                textAlign: "center",
                fontSize: "18px",
                color: "#4b5563",
              }}
            >
              🛑 Page Not Found —{" "}
              <a href="/home" style={{ color: "#10b981", fontWeight: 600 }}>
                Go Home
              </a>
            </div>
          }
        />
      </Routes>
      <MobileNav />
      <Footer /> {/* ✅ ADDED */}
    </BrowserRouter>
  );
}
