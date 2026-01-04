

// src/lib/api.js

export const API_BASE =
  process.env.REACT_APP_API_URL ||
  process.env.REACT_APP_API_BASE ||
  "https://realagro-backend.onrender.com";



// token helper (supports both "auth_demo" and "token")
function getToken() {
  try {
    const raw = localStorage.getItem("auth_demo");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.token) return parsed.token;
    }
  } catch (_) {}
  const t = localStorage.getItem("token");
  return t || "";
}

export async function apiFetch(path, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    auth = true, // attach Authorization header by default
    ...rest
  } = options;

  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (auth) {
    const token = getToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
    ...rest,
  });

  // try parse json (even for errors)
  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch (_) {
    data = text || null;
  }

  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && (data.error || data.message)) ||
      (typeof data === "string" ? data : "") ||
      `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

// default export that is BOTH callable AND has .get/.post/... methods
function api(path, options) {
  return apiFetch(path, options);
}

api.get = (path, options = {}) => apiFetch(path, { ...options, method: "GET" });
api.post = (path, body, options = {}) =>
  apiFetch(path, { ...options, method: "POST", body });
api.put = (path, body, options = {}) =>
  apiFetch(path, { ...options, method: "PUT", body });
api.patch = (path, body, options = {}) =>
  apiFetch(path, { ...options, method: "PATCH", body });
api.del = (path, options = {}) =>
  apiFetch(path, { ...options, method: "DELETE" });

export default api;

// ✅ IMPORTANT: this line fixes your compile error:
// "Attempted import error: 'api' is not exported"
export { api };
