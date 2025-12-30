import api from "./api";

// user
export const sendUserMessage = (payload) => api.post("/api/messages", payload);
export const fetchMyMessages = () => api.get("/api/messages/mine");

// admin
export const fetchAdminMessages = () => api.get("/api/messages/admin");
export const adminReplyToMessage = (id, text) =>
  api.post(`/api/messages/${id}/reply`, { text });
