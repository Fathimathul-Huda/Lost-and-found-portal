import { useState } from "react";

export default function Feedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });

  const [responseMsg, setResponseMsg] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setForm({ ...form, rating: value });
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
      setForm({ name: "", email: "", message: "", rating: 0 });
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

          {/* ⭐ Rating Stars */}
          <label style={styles.label}>Rate Your Experience</label>
          <div style={styles.ratingBox}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                style={{
                  ...styles.star,
                  color: form.rating >= star ? "#FFD700" : "#C4C4C4",
                }}
              >
                ★
              </span>
            ))}
          </div>

          <button type="submit" style={styles.button}>Send Feedback</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/camp.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },
  box: {
    width: "480px",
    background: "rgba(255, 255, 255, 0.92)",
    padding: "40px 35px",
    borderRadius: "18px",
    boxShadow: "0px 8px 30px rgba(0,0,0,0.25)",
    backdropFilter: "blur(7px)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "26px",
    fontWeight: "700",
    color: "#1f2937",
  },
  alert: {
    background: "#e6ffe6",
    color: "#1b6a1f",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: "14px",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  label: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    padding: "13px",
    borderRadius: "8px",
    border: "1px solid #cfd4dc",
    fontSize: "15px",
    background: "#fafafa",
  },
  textarea: {
    padding: "13px",
    borderRadius: "8px",
    border: "1px solid #cfd4dc",
    minHeight: "120px",
    resize: "none",
    fontSize: "15px",
    background: "#fafafa",
  },
  ratingBox: {
    display: "flex",
    gap: "8px",
    fontSize: "30px",
    cursor: "pointer",
  },
  star: {
    transition: "0.2s",
    cursor: "pointer",
  },
  button: {
    marginTop: "8px",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(135deg, #1A73E8, #0057d9)",
  },
};
