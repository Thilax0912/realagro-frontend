// src/lib/auth.js

// Read auth from localStorage
export function getAuth() {
  try {
    const raw = localStorage.getItem("auth_demo");
    if (!raw) return { token: null, user: null };
    const parsed = JSON.parse(raw);
    // support both { token, user } and { token, email, id, role }
    if (parsed.user) {
      return { token: parsed.token || null, user: parsed.user };
    }
    const user = {
      email: parsed.email,
      id: parsed.id || parsed._id,
      role: parsed.role || "user",
      name: parsed.name || "",
    };
    return { token: parsed.token || null, user };
  } catch {
    return { token: null, user: null };
  }
}

// Quick helper: is this user an admin?
export function isAdmin() {
  const { user } = getAuth();
  return !!user && user.role === "admin";
}

// Save auth result from backend into localStorage
// Expecting backend to return: { token, user: { ... } }
export function saveAuth(token, user) {
  if (!token || !user) return;
  localStorage.setItem(
    "auth_demo",
    JSON.stringify({
      token,
      email: user.email,
      id: user.id || user._id,
      role: user.role || "user",
      name: user.name || "",
      user, // keep full object too
    })
  );
}
