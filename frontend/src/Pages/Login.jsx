import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMsg(data.message);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      console.log(data);
      

      // Redirect based on role
      if (data.role == "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        {msg && <p style={styles.alert}>{msg}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

// ---------- SAME DESIGN THEME ----------
const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/camp.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },
  card: {
    width: "420px",
    background: "rgba(255,255,255,0.95)",
    padding: "35px",
    borderRadius: "15px",
    boxShadow: "0px 6px 25px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "600",
  },
  alert: {
    background: "#daf0ff",
    padding: "10px",
    textAlign: "center",
    borderRadius: "6px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#0366d6",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: { fontWeight: "500" },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  button: {
    background: "#1A73E8",
    padding: "14px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    marginTop: "10px",
  },
};
