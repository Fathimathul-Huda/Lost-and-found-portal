import React, { useEffect, useState } from "react";

function MissingItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/item/public/missing")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🔍 Public Missing Items
      </h2>

      {items.length === 0 ? (
        <p style={{ textAlign: "center" }}>No missing items found.</p>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {items.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                background: "#fafafa",
              }}
            >
              {item.image && (
                <img
                  src={`http://localhost:4000/uploads/${item.image}`}
                  alt="item"
                  style={{
                    width: "200px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
              )}

              <h3>{item.title}</h3>
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
