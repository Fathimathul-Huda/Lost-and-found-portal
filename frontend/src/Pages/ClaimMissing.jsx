import React, { useEffect, useState } from "react";

export default function ClaimMissing() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setMessage("❌ Please login first.");
      return;
    }
    fetchMyItems();
  }, [token]);

  const fetchMyItems = async () => {
    const res = await fetch("http://localhost:4000/item/my", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    // 🔥 Prevent items.map crash when backend returns error
    if (!Array.isArray(data)) {
      setItems([]);
      setMessage(data.message || "Failed to load items");
      return;
    }

    setItems(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure want to delete?")) return;

    const res = await fetch(`http://localhost:4000/item/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setMessage(data.message);

    fetchMyItems(); // 🔥 refresh after delete
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Your Reported Items</h2>

        {message && <p style={styles.message}>{message}</p>}

        {items.length === 0 ? (
          <p style={{ textAlign: "center" }}>No items reported yet.</p>
        ) : (
          <div style={styles.list}>
            {items.map((item) => (
              <div key={item._id} style={styles.card}>
                <h3 style={styles.itemTitle}>{item.title}</h3>

                {item.image && (
                  <img
  src={`http://localhost:4000/uploads/${item.image}`}
  alt="item"
  style={{
    image: {
  width: "100%",
  height: "300px",     // bigger and uniform image
  objectFit: "cover",
  borderRadius: "12px",
  marginBottom: "15px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
},

  }}
/>

                )}

                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Location:</strong> {item.location}</p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={
                      item.status === "Pending" ? styles.pending : styles.approved
                    }
                  >
                    {item.status}
                  </span>
                </p>

                <div style={styles.buttonRow}>
                  <button style={styles.editBtn} disabled>Edit</button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    background: "#eef2f5",
    padding: "30px 20px",
  },

  container: {
    maxWidth: "800px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "15px",
    width: "100%",
    boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.12)",
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a",
  },

  message: {
    textAlign: "center",
    marginBottom: "18px",
    color: "green",
    fontWeight: "600",
    fontSize: "16px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  card: {
    padding: "18px",
    borderRadius: "12px",
    background: "#f8fafc",
    border: "1px solid #d9d9d9",
    display: "flex",
    flexDirection: "column",
  },

  itemTitle: {
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e293b",
  },

  image: {
    width: "100%",
    height: "260px",
    borderRadius: "12px",
    objectFit: "cover",
    marginBottom: "12px",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
  },

  pending: {
    color: "#d97706",
    fontWeight: "bold",
    background: "#fff7e6",
    padding: "3px 10px",
    borderRadius: "6px",
  },

  approved: {
    color: "#059669",
    fontWeight: "bold",
    background: "#e7f9f0",
    padding: "3px 10px",
    borderRadius: "6px",
  },

  buttonRow: {
    marginTop: "18px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },

  editBtn: {
    padding: "9px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "not-allowed",
    background: "#9ca3af",
    color: "#fff",
    fontWeight: "600",
  },

  deleteBtn: {
    padding: "9px 18px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#dc2626",
    color: "#fff",
    fontWeight: "600",
    transition: "0.3s",
  },
};
