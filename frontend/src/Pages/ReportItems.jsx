import React, { useState } from "react";

export default function ReportItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Lost");
  const [secretHint, setSecretHint] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("category", category);
      formData.append("secretHint", secretHint);
      formData.append("image", image);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:4000/item/", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Item reported successfully!");
        setTitle("");
        setDescription("");
        setLocation("");
        setCategory("Lost");
        setSecretHint("");
        setImage(null);
      } else {
        setMessage(data.error || "Error submitting");
      }
    } catch (err) {
      setMessage("Server Error");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Report lost or found item</h2>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          placeholder="Item Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          style={styles.textarea}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          style={styles.input}
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          style={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Lost</option>
          <option>Found</option>
        </select>

        <input
          style={styles.input}
          placeholder="Secret Hint"
          value={secretHint}
          onChange={(e) => setSecretHint(e.target.value)}
        />

        <label style={styles.label}>Upload Photo</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFile}
          style={styles.fileInput}
        />

        {/* 🔥 Image Preview */}
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            style={styles.previewImg}
          />
        )}

        <button style={styles.submitBtn} type="submit">
          Submit Report
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "750px",
    margin: "30px auto",
    padding: "25px 30px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 0 25px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #cfd4dc",
    fontSize: "16px",
  },
  textarea: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #cfd4dc",
    minHeight: "95px",
    fontSize: "16px",
  },
  select: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #cfd4dc",
    fontSize: "16px",
    background: "#fff",
  },
  label: {
    fontWeight: "600",
    fontSize: "16px",
    marginTop: "5px",
    color: "#2b2b2b",
  },
  fileInput: {
    padding: "8px",
    border: "1px solid #cfd4dc",
    borderRadius: "8px",
    background: "#f9fafb",
  },
  previewImg: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
  },
  submitBtn: {
    padding: "14px",
    background: "#007bff",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "0.3s",
  },
  message: {
    marginTop: "18px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "16px",
    color: "#007bff",
  },
};
