export default function AdminDashboard() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Admin Dashboard 👑</h1>
      <p>Welcome Admin — manage reports & feedback here.</p>

      <div style={{ marginTop: "30px" }}>
        <a href="/admin/items" style={btn}>Manage Items</a>
        <a href="/admin/feedback" style={btn}>View Feedback</a>
      </div>
    </div>
  );
}

const btn = {
  display: "inline-block",
  margin: "10px",
  padding: "12px 20px",
  background: "#1A73E8",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "8px",
};
