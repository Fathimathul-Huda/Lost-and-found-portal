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
      formData.append("image", image); // 👈 MUST match upload.single("image")

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
        <input style={styles.input} placeholder="Item Name" value={title} onChange={(e) => setTitle(e.target.value)} required />
        
        <textarea style={styles.textarea} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        
        <input style={styles.input} placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

        <select style={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Lost</option>
          <option>Found</option>
        </select>

        <input style={styles.input} placeholder="Secret Hint" value={secretHint} onChange={(e) => setSecretHint(e.target.value)} />

        <label style={styles.label}>Upload Photo</label>
        <input type="file" name="image" accept="image/*" onChange={handleFile} style={styles.fileInput} />

        <button style={styles.submitBtn} type="submit">Submit Report</button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: { maxWidth: "700px", margin: "20px auto", padding: "20px", background: "#fff", borderRadius: "10px" },
  heading: { textAlign: "center", marginBottom: "20px", fontSize: "26px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  textarea: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "80px" },
  select: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  fileInput: { padding: "6px" },
  submitBtn: { padding: "12px", background: "#007bff", color: "white", fontSize: "16px", border: "none", borderRadius: "5px" },
  message: { marginTop: "15px", textAlign: "center", fontWeight: "bold" },
};
