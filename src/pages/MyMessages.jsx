import React, { useEffect, useMemo, useState } from "react";
import { fetchMyMessages } from "../lib/messageApi";

export default function MyMessages() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    setLoading(true);
    try {
      const data = await fetchMyMessages();
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

  const styles = {
    wrap: { padding: 24, maxWidth: 1100, margin: "0 auto" },
    head: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    title: { fontSize: 28, fontWeight: 900, color: "#0f172a" },
    sub: { color: "#64748b", marginTop: 4 },
    grid: { display: "grid", gridTemplateColumns: "340px 1fr", gap: 16 },
    card: {
      background: "white",
      borderRadius: 18,
      border: "1px solid #e5e7eb",
      boxShadow: "0 6px 20px rgba(15,23,42,0.06)",
    },
    list: { padding: 12 },
    item: (active) => ({
      padding: 12,
      borderRadius: 14,
      border: active ? "1px solid #10b981" : "1px solid #eef2f7",
      background: active ? "rgba(16,185,129,0.08)" : "#fff",
      cursor: "pointer",
      marginBottom: 10,
    }),
    badge: (status) => ({
      fontSize: 12,
      fontWeight: 800,
      padding: "4px 10px",
      borderRadius: 999,
      background:
        status === "replied"
          ? "rgba(16,185,129,0.12)"
          : "rgba(99,102,241,0.12)",
      color: status === "replied" ? "#047857" : "#4338ca",
      width: "fit-content",
    }),
    right: {
      padding: 16,
      minHeight: 520,
      display: "flex",
      flexDirection: "column",
    },
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
    err: {
      background: "rgba(239,68,68,0.1)",
      color: "#b91c1c",
      padding: 10,
      borderRadius: 14,
      marginBottom: 12,
      border: "1px solid rgba(239,68,68,0.25)",
    },
    btn: {
      padding: "10px 14px",
      borderRadius: 14,
      border: "none",
      background: "#0ea5e9",
      color: "white",
      fontWeight: 900,
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.head}>
        <div>
          <div style={styles.title}>My Messages</div>
          <div style={styles.sub}>Your inquiries and admin replies.</div>
        </div>
        <button onClick={load} style={styles.btn}>
          Refresh
        </button>
      </div>

      {err && <div style={styles.err}>⚠️ {err}</div>}

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.list}>
            {loading ? (
              <div style={{ padding: 10, color: "#64748b" }}>Loading…</div>
            ) : items.length === 0 ? (
              <div style={{ padding: 10, color: "#64748b" }}>
                No messages yet. Go to Contact and send one.
              </div>
            ) : (
              items.map((m) => (
                <div
                  key={m._id}
                  style={styles.item(m._id === selectedId)}
                  onClick={() => setSelectedId(m._id)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <div style={{ fontWeight: 900, color: "#0f172a" }}>
                      {(m.message || "").slice(0, 26)}
                      {(m.message || "").length > 26 ? "…" : ""}
                    </div>
                    <div style={styles.badge(m.status)}>
                      {m.status === "replied" ? "REPLIED" : "OPEN"}
                    </div>
                  </div>
                  <div style={{ color: "#64748b", marginTop: 6, fontSize: 13 }}>
                    Updated: {new Date(m.updatedAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
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
                <div
                  style={{ fontWeight: 900, fontSize: 18, color: "#0f172a" }}
                >
                  Conversation
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
                      {t.sender === "admin" ? "Admin" : "You"}
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

              <div style={{ marginTop: 12, color: "#64748b", fontSize: 13 }}>
                Admin replies will appear here automatically after you refresh.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
