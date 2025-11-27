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
                      width: "100%",
                      height: "230px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "10px",
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
    alignItems: "center",
    minHeight: "100vh",
    background: "#f3f4f6",
    padding: "20px",
  },

  container: {
    maxWidth: "600px",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "100%",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.10)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "600",
  },

  message: {
    textAlign: "center",
    marginBottom: "15px",
    color: "green",
    fontWeight: "bold",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  card: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    background: "#fafafa",
  },

  itemTitle: {
    marginBottom: "8px",
    fontSize: "18px",
    fontWeight: "bold",
  },

  pending: {
    color: "orange",
    fontWeight: "bold",
  },

  approved: {
    color: "green",
    fontWeight: "bold",
  },

  buttonRow: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
  },

  editBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "not-allowed",
    background: "#888",
    color: "#fff",
  },

  deleteBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#ff4d4d",
    color: "#fff",
  },
};
