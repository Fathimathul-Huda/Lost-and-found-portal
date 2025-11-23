import { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  const token = localStorage.getItem("token"); // optional if you want auth later

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend not required now — just UI.
    // Later you can connect email or database.
    setResponseMsg("📩 Thank you! We will get back to you shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Contact Us 📞</h2>

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

          <label style={styles.label}>Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Why are you contacting us?"
            value={form.subject}
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

          <button type="submit" style={styles.button}>
            Send Message
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
    background: "#daf0ff",
    color: "#0366d6",
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
