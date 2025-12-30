import React, { useEffect, useMemo, useState } from "react";
import { fetchAdminMessages, adminReplyToMessage } from "../../lib/messageApi";

export default function AdminMessages() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    setLoading(true);
    try {
      const data = await fetchAdminMessages();
      setItems(data?.messages || []);
      if (!selectedId && data?.messages?.[0]?._id)
        setSelectedId(data.messages[0]._id);
    } catch (e) {
      setErr(e.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected = useMemo(
    () => items.find((x) => x._id === selectedId),
    [items, selectedId]
  );

  const onReply = async () => {
    const text = reply.trim();
    if (!text || !selected?._id) return;

    setSaving(true);
    setErr("");
    try {
      await adminReplyToMessage(selected._id, text);
      setReply("");
      await load();
    } catch (e) {
      setErr(e.message || "Reply failed");
    } finally {
      setSaving(false);
    }
  };

  const styles = {
    wrap: { padding: 24, maxWidth: 1200, margin: "0 auto" },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    title: { fontSize: 28, fontWeight: 800, color: "#0f172a" },
    sub: { color: "#64748b", marginTop: 4 },
    grid: { display: "grid", gridTemplateColumns: "360px 1fr", gap: 16 },
    card: {
      background: "white",
      borderRadius: 18,
      border: "1px solid #e5e7eb",
      boxShadow: "0 6px 20px rgba(15,23,42,0.06)",
    },
    left: { padding: 12, overflow: "hidden" },
    right: {
      padding: 16,
      display: "flex",
      flexDirection: "column",
      minHeight: 520,
    },
    listItem: (active) => ({
      padding: 12,
      borderRadius: 14,
      border: active ? "1px solid #10b981" : "1px solid #eef2f7",
      background: active ? "rgba(16,185,129,0.08)" : "#fff",
      cursor: "pointer",
      marginBottom: 10,
    }),
    badge: (status) => ({
      fontSize: 12,
      fontWeight: 700,
      padding: "4px 10px",
      borderRadius: 999,
      background:
        status === "replied"
          ? "rgba(16,185,129,0.12)"
          : "rgba(99,102,241,0.12)",
      color: status === "replied" ? "#047857" : "#4338ca",
      width: "fit-content",
    }),
    chat: {
      flex: 1,
      overflow: "auto",
      padding: 10,
      borderRadius: 14,
      border: "1px solid #eef2f7",
      background: "#fbfdff",
    },
    bubble: (who) => ({
      maxWidth: "80%",
      padding: "10px 12px",
      borderRadius: 14,
      margin: "8px 0",
      background: who === "admin" ? "rgba(16,185,129,0.14)" : "white",
      border: "1px solid #e5e7eb",
      marginLeft: who === "admin" ? "auto" : 0,
    }),
    row: { display: "flex", gap: 10, marginTop: 12 },
    input: {
      flex: 1,
      padding: "12px 12px",
      borderRadius: 14,
      border: "1px solid #e5e7eb",
      outline: "none",
    },
    btn: {
      padding: "12px 16px",
      borderRadius: 14,
      border: "none",
      background: "#10b981",
      color: "white",
      fontWeight: 800,
      cursor: "pointer",
      minWidth: 120,
    },
    err: {
      background: "rgba(239,68,68,0.1)",
      color: "#b91c1c",
      padding: 10,
      borderRadius: 14,
      marginBottom: 12,
      border: "1px solid rgba(239,68,68,0.25)",
    },
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Messages</div>
          <div style={styles.sub}>View inquiries and reply to users.</div>
        </div>
        <button onClick={load} style={{ ...styles.btn, background: "#0ea5e9" }}>
          Refresh
        </button>
      </div>

      {err && <div style={styles.err}>⚠️ {err}</div>}

      <div style={styles.grid}>
        <div style={{ ...styles.card, ...styles.left }}>
          {loading ? (
            <div style={{ padding: 14, color: "#64748b" }}>Loading…</div>
          ) : items.length === 0 ? (
            <div style={{ padding: 14, color: "#64748b" }}>
              No messages yet.
            </div>
          ) : (
            <div style={{ padding: 10 }}>
              {items.map((m) => (
                <div
                  key={m._id}
                  style={styles.listItem(m._id === selectedId)}
                  onClick={() => setSelectedId(m._id)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <div style={{ fontWeight: 800, color: "#0f172a" }}>
                      {m.name || "User"}{" "}
                      <span
                        style={{
                          color: "#64748b",
                          fontWeight: 600,
                          fontSize: 13,
                        }}
                      >
                        • {m.email || ""}
                      </span>
                    </div>
                    <div style={styles.badge(m.status)}>
                      {m.status === "replied" ? "REPLIED" : "OPEN"}
                    </div>
                  </div>
                  <div style={{ color: "#475569", marginTop: 6, fontSize: 14 }}>
                    {(m.message || "").slice(0, 70)}
                    {(m.message || "").length > 70 ? "…" : ""}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ ...styles.card, ...styles.right }}>
          {!selected ? (
            <div style={{ color: "#64748b" }}>Select a message to view.</div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <div>
                  <div style={{ fontWeight: 900, fontSize: 18 }}>
                    {selected.name || "User"}
                  </div>
                  <div style={{ color: "#64748b", fontSize: 13 }}>
                    {selected.email || ""}
                  </div>
                </div>
                <div style={styles.badge(selected.status)}>
                  {selected.status === "replied" ? "REPLIED" : "OPEN"}
                </div>
              </div>

              <div style={styles.chat}>
                {(selected.thread?.length
                  ? selected.thread
                  : [{ sender: "user", text: selected.message }]
                ).map((t, idx) => (
                  <div key={idx} style={styles.bubble(t.sender)}>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 12,
                        color: "#64748b",
                      }}
                    >
                      {t.sender === "admin" ? "Admin" : "User"}
                    </div>
                    <div
                      style={{
                        color: "#0f172a",
                        marginTop: 4,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {t.text}
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.row}>
                <input
                  style={styles.input}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write a reply…"
                />
                <button style={styles.btn} disabled={saving} onClick={onReply}>
                  {saving ? "Sending…" : "Reply"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
