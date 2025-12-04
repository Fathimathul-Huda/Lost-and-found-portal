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

    if(!token){
      setResponseMsg("please login first")
      return;
    }

    setResponseMsg("📩 Thank you! We will get back to you shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Contact Us </h2>

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
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.45),whiter gba(0, 0, 0, 0.45)), url('/camp.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },
  card: {
    width: "500px",
    background: "rgba(255, 255, 255, 0.98)",
    padding: "45px 40px",
    borderRadius: "20px",
    boxShadow: "0px 12px 35px rgba(0,0,0,0.3)",
    animation: "fadeIn 0.4s ease-in-out",
  },
  title: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "800",
    marginBottom: "25px",
    color: "#0f172a",
    letterSpacing: "0.7px",
  },
  alert: {
    background: "#defce2",
    color: "#0d6b25",
    padding: "12px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: "18px",
    fontSize: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  label: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#1e293b",
  },
  input: {
    padding: "14px 15px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    background: "#f8fafc",
    transition: "0.3s",
  },
  textarea: {
    padding: "14px 15px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    minHeight: "130px",
    resize: "none",
    fontSize: "16px",
    background: "#f8fafc",
    transition: "0.3s",
  },
  button: {
    marginTop: "10px",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(135deg, #006aff, #004de6)",
    transition: "0.3s",
    letterSpacing: "0.5px",
  },
};
