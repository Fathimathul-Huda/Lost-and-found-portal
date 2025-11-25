import React, { useState } from "react";

export default function ReportItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Lost");
  const [secretHint, setSecretHint] = useState("");
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [message, setMessage] = useState("");

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    const urls = selected.map((f) => URL.createObjectURL(f));
    setPreviewUrls(urls);
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
      files.forEach((file) => formData.append("images", file));

      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/item", {
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
        setFiles([]);
        setPreviewUrls([]);
      } else {
        setMessage(data.message || "Error submitting");
      }
    } catch (err) {
      setMessage("Server Error");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Report Lost or Found Item 📝</h2>

      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Item Name</label>
        <input
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label style={styles.label}>Description</label>
        <textarea
          style={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label style={styles.label}>Location</label>
        <input
          style={styles.input}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label style={styles.label}>Category</label>
        <select
          style={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Lost</option>
          <option>Found</option>
        </select>

        <label style={styles.label}>Secret Hint (for verification)</label>
        <input
          style={styles.input}
          value={secretHint}
          onChange={(e) => setSecretHint(e.target.value)}
          placeholder="Example: last 4 digits, unique mark"
        />

        <label style={styles.label}>Upload Photos</label>
        <input
          style={styles.fileInput}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
        />

        {previewUrls.length > 0 && (
          <div style={styles.previewBox}>
            {previewUrls.map((url, index) => (
              <img key={index} src={url} alt="preview" style={styles.previewImg} />
            ))}
          </div>
        )}

        <button style={styles.submitBtn}>Submit Report</button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "20px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  select: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  fileInput: {
    padding: "8px",
  },
  previewBox: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  previewImg: {
    width: "100px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  submitBtn: {
    padding: "12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },
};
