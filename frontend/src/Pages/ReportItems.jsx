import { useState } from "react";

export default function ReportItems() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "Lost",
  });

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("❌ Please login first.");
      return;
    }

    const res = await fetch("http://localhost:4000/item/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);

    if (res.ok) {
      setForm({ title: "", description: "", location: "", category: "Lost" });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Report Lost or Found Item 📝</h2>

        {message && <p style={styles.alert}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          
          <label style={styles.label}>Item Name</label>
          <input
            type="text"
            name="title"
            placeholder="Enter item name"
            value={form.title}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            placeholder="Describe the item..."
            value={form.description}
            onChange={handleChange}
            style={styles.textarea}
            required
          ></textarea>

          <label style={styles.label}>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Where did you lose/find it?"
            value={form.location}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>

          <button type="submit" style={styles.button}>
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

// ----------- STYLES -----------

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/camp.jpg')", // Change image if needed
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },
  card: {
    width: "480px",
    background: "rgba(255,255,255,0.95)",
    padding: "35px",
    borderRadius: "15px",
    boxShadow: "0px 6px 25px rgba(0,0,0,0.2)",
    backdropFilter: "blur(6px)",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  alert: {
    background: "#dff7d8",
    color: "#1b6a1f",
    padding: "10px",
    borderRadius: "6px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontWeight: "500",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    height: "110px",
    resize: "none",
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  button: {
    background: "#1A73E8",
    color: "#fff",
    padding: "14px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    marginTop: "10px",
    fontSize: "16px",
  },
};
