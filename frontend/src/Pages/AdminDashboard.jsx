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
    const itemRes = await fetch("http://localhost:4000/item/pending", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setReports(await itemRes.json());

    const fbRes = await fetch("http://localhost:4000/feedback/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFeedback(await fbRes.json());
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
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    getData();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Dashboard 👑</h2>

        <div style={styles.tabs}>
          <button onClick={() => setActiveTab("reports")} style={styles.tabBtn}>Reports</button>
          <button onClick={() => setActiveTab("feedback")} style={styles.tabBtn}>Feedback</button>
        </div>

        {activeTab === "reports" && (
          reports.length === 0 ? <p>No pending reports</p> : 
          reports.map(item => (
            <div key={item._id} style={styles.entry}>
              <h3>{item.title}</h3>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Submitted By:</strong> {item?.userId?.name} ({item?.userId?.email})</p>

              <div style={styles.row}>
                <button onClick={() => approveItem(item._id)} style={styles.approve}>Approve</button>
                <button onClick={() => rejectItem(item._id)} style={styles.reject}>Reject</button>
              </div>
            </div>
          ))
        )}

        {activeTab === "feedback" && (
          feedback.length === 0 ? <p>No feedback available</p> :
          feedback.map(fb => (
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

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "90%",
    maxWidth: "800px",
    background: "white",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
  },
  title: { textAlign: "center", marginBottom: "20px" },
  tabs: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" },
  tabBtn: {
    padding: "8px 18px",
    cursor: "pointer",
    background: "#1A73E8",
    color: "white",
    border: "none",
    borderRadius: "6px"
  },
  entry: {
    borderBottom: "1px solid #ddd",
    padding: "15px 0",
  },
  row: { display: "flex", gap: "10px", marginTop: "10px" },
  approve: {
    background: "green", color: "white", border: "none",
    padding: "8px 16px", borderRadius: "6px"
  },
  reject: {
    background: "red", color: "white", border: "none",
    padding: "8px 16px", borderRadius: "6px"
  }
};
