import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [activeTab, setActiveTab] = useState("reports");

  const token = localStorage.getItem("token");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // Fetch pending items (reports)
    const itemRes = await fetch("http://localhost:4000/item/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const items = await itemRes.json();
    setReports(items);

    // Fetch all feedback
    const fbRes = await fetch("http://localhost:4000/feedback/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const feedbackList = await fbRes.json();
    setFeedback(feedbackList);
  };

  const approveItem = async (id) => {
    await fetch(`http://localhost:4000/item/approve/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    getData();
  };

  const rejectItem = async (id) => {
    await fetch(`http://localhost:4000/item/reject/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    getData();
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:4000/item/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    getData();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Dashboard</h2>

        <div style={styles.tabs}>
          <button
            onClick={() => setActiveTab("reports")}
            style={activeTab === "reports" ? styles.activeTab : styles.tabBtn}
          >
            Reports
          </button>

          <button
            onClick={() => setActiveTab("feedback")}
            style={activeTab === "feedback" ? styles.activeTab : styles.tabBtn}
          >
            Feedback
          </button>
        </div>

        {/* REPORTS TAB */}
        {activeTab === "reports" && (
          reports.length === 0 ? <p>No pending reports</p> :
          reports.map((item) => (
            <div key={item._id} style={styles.entry}>
              <h3>{item.title}</h3>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Category:</strong> {item.category}</p>

              {/* Show image */}
              {item.image && (
                <img
               src={`http://localhost:4000/uploads/${item.image}`}
               alt="item"
             style={styles.image}
                />

              )}

              <p><strong>Submitted By:</strong> {item?.userId?.name} ({item?.userId?.email})</p>

              <div style={styles.row}>
                <button onClick={() => approveItem(item._id)} style={styles.approve}>Approve</button>
                <button onClick={() => rejectItem(item._id)} style={styles.reject}>Reject</button>
              </div>
            </div>
          ))
        )}

        {/* FEEDBACK TAB */}
        {activeTab === "feedback" && (
          feedback.length === 0 ? <p>No feedback available</p> :
          feedback.map((fb) => (
            <div key={fb._id} style={styles.entry}>
              <h3>Feedback</h3>
              <p>{fb.message}</p>
              <p><strong>From:</strong> {fb?.userId?.name} ({fb?.userId?.email})</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// STYLES
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #dfe9ff, #f2f8ff)",
    padding: "50px 20px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "900px",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "30px",
    fontWeight: "700",
    color: "#0f172a",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "28px",
  },
  tabBtn: {
    padding: "10px 22px",
    background: "#d1d5db",
    color: "#000",
    borderRadius: "8px",
    border: "none",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.25s",
  },
  activeTab: {
    padding: "10px 22px",
    background: "#2563eb",
    color: "white",
    borderRadius: "8px",
    border: "none",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(37,99,235,0.35)",
  },
  entry: {
    background: "#f8fafc",
    padding: "18px",
    borderRadius: "14px",
    marginBottom: "18px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
    transition: "0.25s",
  },
  image: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    borderRadius: "12px",
    margin: "12px 0",
    boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
  },
  row: {
    display: "flex",
    gap: "12px",
    marginTop: "12px",
  },
  approve: {
    background: "#16a34a",
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s",
  },
  reject: {
    background: "#dc2626",
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s",
  },
};
