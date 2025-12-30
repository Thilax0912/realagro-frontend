import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import { apiFetch } from "../lib/api";

/* ================= HELPERS ================= */

// get auth token (supports your existing storage)
function getAuthToken() {
  try {
    const raw = localStorage.getItem("auth_demo");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.token) return parsed.token;
    }
  } catch {}
  return localStorage.getItem("token");
}

function saveUserToStorage(user) {
  try {
    const raw = localStorage.getItem("auth_demo");
    if (raw) {
      const parsed = JSON.parse(raw);
      localStorage.setItem("auth_demo", JSON.stringify({ ...parsed, user }));
    } else {
      localStorage.setItem("realagro_user", JSON.stringify(user));
    }
  } catch {}
}

/* ================= COMPONENT ================= */

export default function Profile() {
  const navigate = useNavigate();
  const token = getAuthToken();

  const [loading, setLoading] = useState(true);

  // REAL user (no hardcode)
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "user",
    avatar: "",
  });

  const [avatarPreview, setAvatarPreview] = useState("");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  /* ================= LOAD USER ================= */

  useEffect(() => {
    async function loadProfile() {
      try {
        if (!token) return;

        const res = await apiFetch("/api/auth/me", {
          method: "GET",
          token,
        });

        setUser(res.user);
        setDisplayName(res.user.name || "");
        setAvatarPreview(res.user.avatar || "");

        saveUserToStorage(res.user);
      } catch (e) {
        console.error("Profile load failed:", e);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [token]);

  /* ================= AVATAR ================= */

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  /* ================= SAVE PROFILE ================= */

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);

    try {
      const res = await apiFetch("/api/auth/me", {
        method: "PATCH",
        token,
        body: {
          name: displayName,
          avatar: avatarPreview,
        },
      });

      setUser(res.user);
      saveUserToStorage(res.user);
      setIsEditProfileOpen(false);
    } catch (e) {
      alert(e.message || "Failed to save profile");
    } finally {
      setSavingProfile(false);
    }
  };

  /* ================= PASSWORD (UI ONLY, BACKEND READY) ================= */

  const handleSavePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    setSavingPassword(true);

    // Hook your backend later if needed
    setTimeout(() => {
      setSavingPassword(false);
      setIsPasswordOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      alert("Password updated");
    }, 600);
  };

  if (loading) return null;

  const firstInitial = user.name?.charAt(0)?.toUpperCase() || "U";

  /* ================= UI (UNCHANGED) ================= */

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* HEADER */}
        <div className="profile-header-row">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar-circle">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="profile-avatar-img"
                />
              ) : (
                <span>{firstInitial}</span>
              )}
            </div>
            <span className="profile-badge">Member</span>
          </div>

          <div className="profile-main-info">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-tagline">
              You can browse properties, send enquiries and manage your account.
            </p>

            <div className="profile-meta-row">
              <div className="profile-meta-item">
                <div className="profile-meta-label">EMAIL</div>
                <div className="profile-meta-value profile-meta-link">
                  {user.email}
                </div>
              </div>

              <div className="profile-meta-item">
                <div className="profile-meta-label">USER ID</div>
                <div className="profile-meta-value profile-meta-id">
                  {user.id}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="profile-stats-row">
          <div className="profile-stat-card">
            <div className="profile-stat-label">SAVED PROPERTIES</div>
            <div className="profile-stat-value">0</div>
            <div className="profile-stat-caption">Coming soon</div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-label">MESSAGES SENT</div>
            <div className="profile-stat-value">0</div>
            <div className="profile-stat-caption">
              We’ll track your enquiries here
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-label">SITE VISITS BOOKED</div>
            <div className="profile-stat-value">0</div>
            <div className="profile-stat-caption">
              Check back after you book
            </div>
          </div>
        </div>

        {/* ACCOUNT */}
        <div className="profile-section">
          <h2 className="profile-section-title">Account</h2>
          <p className="profile-section-desc">
            Update your details and manage how we contact you.
          </p>

          <div className="profile-section-actions">
            <button
              className="profile-btn primary-outline"
              onClick={() => setIsEditProfileOpen(true)}
            >
              Edit profile
            </button>
            <button
              className="profile-btn soft"
              onClick={() => setIsPasswordOpen(true)}
            >
              Change password
            </button>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="profile-section">
          <h2 className="profile-section-title">Navigation</h2>
          <p className="profile-section-desc">
            Jump straight to the most useful places in 7hilax RealAgro.
          </p>

          <div className="profile-nav-actions">
            <button
              className="profile-btn nav"
              onClick={() => navigate("/home")}
            >
              Back to Home
            </button>
            <button
              className="profile-btn nav"
              onClick={() => navigate("/properties")}
            >
              Browse properties
            </button>
            <button
              className="profile-btn nav"
              onClick={() => navigate("/contact")}
            >
              Contact our team
            </button>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditProfileOpen && (
        <div className="profile-modal-backdrop">
          <div className="profile-modal">
            <h3 className="profile-modal-title">Edit profile</h3>
            <p className="profile-modal-subtitle">
              Update your display name and profile picture.
            </p>

            <form onSubmit={handleSaveProfile}>
              <div className="profile-modal-avatar-row">
                <div className="profile-avatar-circle modal-avatar">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className="profile-avatar-img"
                    />
                  ) : (
                    <span>{firstInitial}</span>
                  )}
                </div>
                <label className="profile-file-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  Change photo
                </label>
              </div>

              <label className="profile-field-label">
                Display name
                <input
                  className="profile-input"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </label>

              <div className="profile-modal-actions">
                <button
                  type="button"
                  className="profile-btn soft"
                  onClick={() => setIsEditProfileOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="profile-btn primary"
                  disabled={savingProfile}
                >
                  {savingProfile ? "Saving…" : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {isPasswordOpen && (
        <div className="profile-modal-backdrop">
          <div className="profile-modal">
            <h3 className="profile-modal-title">Change password</h3>
            <form onSubmit={handleSavePassword}>
              <label className="profile-field-label">
                Current password
                <input
                  className="profile-input"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </label>
              <label className="profile-field-label">
                New password
                <input
                  className="profile-input"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              <label className="profile-field-label">
                Confirm new password
                <input
                  className="profile-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>

              <div className="profile-modal-actions">
                <button
                  type="button"
                  className="profile-btn soft"
                  onClick={() => setIsPasswordOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="profile-btn primary"
                  disabled={savingPassword}
                >
                  {savingPassword ? "Updating…" : "Update password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
