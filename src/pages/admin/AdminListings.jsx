import React, { useCallback, useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import api  from "../../lib/api";
import { getAuth } from "../../lib/auth";

export default function AdminListings() {
  const [items, setItems] = useState([]);
  const { token } = getAuth();

  const load = useCallback(async () => {
    const { items } = await api("/api/listings", { token });
    setItems(items || []);
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const onDelete = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    await api(`/api/listings/${id}`, { method: "DELETE", token }).catch(
      () => {}
    );
    await load();
  };

  const onEdit = async (l) => {
    const title = window.prompt("Title", l.title);
    if (!title) return;
    const priceLKR = Number(window.prompt("Price (LKR)", l.priceLKR));
    await api(`/api/listings/${l._id}`, {
      method: "PATCH",
      token,
      body: { title, priceLKR },
    }).catch(() => {});
    await load();
  };

  return (
    <AdminLayout>
      <h3 style={{ marginTop: 0 }}>Listings</h3>
      <div className="grid">
        {items.map((l) => (
          <article key={l._id} className="card">
            <div className="thumb">
              <img src={l.imageUrl} alt={l.title} />
            </div>
            <div className="body">
              <h3>{l.title}</h3>
              <p className="muted">{l.location}</p>
              <div className="row">
                <span className="price">
                  LKR {l.priceLKR?.toLocaleString?.() || l.priceLKR}
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn" onClick={() => onEdit(l)}>
                    Edit
                  </button>
                  <button className="btn ghost" onClick={() => onDelete(l._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AdminLayout>
  );
}
