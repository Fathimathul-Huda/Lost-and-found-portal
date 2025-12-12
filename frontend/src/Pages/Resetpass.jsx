import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setMsg("Password must be at least 6 characters.");
      return;
    }

    const res = await fetch("http://localhost:4000/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>

        {msg && <p style={styles.alert}>{msg}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>New Password</label>
          <input
            type="password"
            placeholder="Min 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button style={styles.button}>Reset Password</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "420px",
    background: "#fff",
    padding: "35px",
    borderRadius: "15px",
    boxShadow: "0px 6px 25px rgba(0,0,0,0.1)",
  },
  title: { textAlign: "center", marginBottom: "20px" },
  alert: {
    background: "#e8ffe8",
    padding: "10px",
    borderRadius: "8px",
    color: "#0a8a0a",
    marginBottom: "10px",
    textAlign: "center",
    fontWeight: "bold",
  },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  label: { fontWeight: 600 },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  button: {
    background: "#1A73E8",
    padding: "12px",
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    marginTop: "10px",
    cursor: "pointer",
  },
};
