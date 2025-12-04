import React, { useEffect, useState } from "react";

function MissingItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/item/public/missing")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🔍 Public Missing Items</h2>

      {items.length === 0 ? (
        <p style={styles.noItems}>No missing items found.</p>
      ) : (
        <div style={styles.grid}>
          {items.map((item) => (
            <div key={item._id} style={styles.card}>
              {item.image && (
                <img
                  src={`http://localhost:4000/uploads/${item.image}`}
                  alt="item"
                  style={styles.image}
                />
              )}

              <h3 style={styles.itemTitle}>{item.title}</h3>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Category:</strong> {item.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MissingItems;

const styles = {
  page: {
    padding: "30px 20px",
    background: "#eef2f5",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "30px",
    fontWeight: "700",
    color: "#0f172a",
  },
  noItems: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "500",
    color: "#6b7280",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#ffffff",
    padding: "18px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.10)",
    transition: "0.3s",
  },
  image: {
    width: "100%",
    height: "230px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "12px",
    boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
  },
  itemTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#1e293b",
  },
};
