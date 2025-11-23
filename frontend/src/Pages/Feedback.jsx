import { useState } from "react";

export default function Feedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setResponseMsg("❌ Please login first.");
      return;
    }

    const res = await fetch("http://localhost:4000/feedback/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResponseMsg(data.message);

    if (res.ok) {
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h2 style={styles.heading}>We Value Your Feedback 💬</h2>

        {responseMsg && <p style={styles.alert}>{responseMsg}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>

          <label style={styles.label}>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Your Message</label>
          <textarea
            name="message"
            placeholder="Write your message here..."
            value={form.message}
            onChange={handleChange}
            style={styles.textarea}
            required
          ></textarea>

          <button type="submit" style={styles.button}>Send Message</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/camp.jpg')", // Change if needed
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },
  box: {
    width: "480px",
    background: "rgba(255,255,255,0.95)",
    padding: "35px",
    borderRadius: "15px",
    boxShadow: "0px 6px 25px rgba(0,0,0,0.2)",
    backdropFilter: "blur(6px)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontSize: "15px",
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
    height: "110px",
    resize: "none",
    fontSize: "15px",
  },
  button: {
    background: "#1A73E8",
    color: "white",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  alert: {
    background: "#dff7d8",
    color: "#1b6a1f",
    padding: "10px",
    textAlign: "center",
    borderRadius: "6px",
    fontWeight: "bold",
    marginBottom: "12px",
  },
};
