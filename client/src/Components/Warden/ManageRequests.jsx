import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Styles/WardenDashboard.css";

export default function ManageRequests() {
  const navigate = useNavigate();
  const { Name } = useLocation().state || {};

  /* ─── State ─────────────────────────────────────────────── */
  const [roomReq, setRoomReq] = useState([]);
  const [leaveReq, setLeaveReq] = useState([]);
  const [complnts, setComplnts] = useState([]);
  const [guestReq, setGuestReq] = useState([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState(false);

  /* ─── Fetch all four tables in parallel on mount / reload ─ */
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/roomChangeRequests"),
      axios.get("http://localhost:5000/leaveRequests1"),
      axios.get("http://localhost:5000/complaints"),
      axios.get("http://localhost:5000/guestEntryRequests"),
    ])
      .then(([r1, r2, r3, r4]) => {
        console.log("Leave Requests r1:", r1.data?.requests);
        console.log("Leave Requests r2:", r2.data?.requests);
        console.log("Leave Requests r3:", r3.data?.requests);
        console.log("Leave Requests r4:", r4.data?.requests);
        setRoomReq(r1.data?.requests ?? []);
        setLeaveReq(r2.data?.requests ?? []);
        setComplnts(r3.data?.complaints ?? []);
        setGuestReq(r4.data?.requests ?? []);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [reload]);

  /* ─── Status update helper ──────────────────────────────── */
  const updateStatus = async (type, id, status) => {
    const urlMap = {
      room: "http://localhost:5000/updateRoomChangeStatus",
      leave: "http://localhost:5000/updateLeaveStatus",
      comp: "http://localhost:5000/updateComplaintStatus",
      guest: "http://localhost:5000/updateGuestEntryStatus",
    };
    try {
      await axios.put(urlMap[type], { id, status });
      setReload((prev) => !prev); // refresh all lists
    } catch (err) {
      console.error(err);
      alert("Update failed. Try again.");
    }
  };

  /* ─── Error screen ──────────────────────────────────────── */
  if (error) {
    return (
      <div className="student-dashboard">
        <div className="error-container">
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <h2>Unable to load requests</h2>
            <p>Please check your connection and refresh.</p>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Section renderer (generic) ────────────────────────── */
  const Section = ({ title, icon, data = [], cols, type }) => (
    <div className="content-section fade-in">
      <div className="section-header">
        <h2>
          <span className="section-icon-small">{icon}</span>
          {title}
        </h2>
        <div className="student-count">Total: {data.length}</div>
      </div>

      <div className="data-grid">
        {data.map((row) => {
          const requestId = row.RequestID ?? row.ComplaintID;
          const statusVal = row.Status ?? "Pending";
          return (
            <div key={requestId} className="data-card student-card">
              <div className="card-header">
                <div className="student-avatar">
                  <span>{(row.Name || row.GuestName || "R").charAt(0)}</span>
                </div>
                <div className="card-info">
                  <h4>
                    {row.Name || row.GuestName || `Request #${requestId}`}
                  </h4>
                  <span className="id-badge">ID: {row.StudentID}</span>
                </div>
              </div>

              <div className="card-details">
                {cols(row).map(({ label, value }) => (
                  <div className="detail-item" key={label}>
                    <span className="detail-icon">•</span>
                    <span>
                      <strong>{label}:</strong> {value}
                    </span>
                  </div>
                ))}

                <div className="detail-item">
                  {statusVal !== "Approved" && statusVal !== "Reviewed" && (
                    <button
                      className="submit-button"
                      onClick={() =>
                        updateStatus(
                          type,
                          requestId,
                          type === "comp" ? "Reviewed" : "Approved"
                        )
                      }
                    >
                      ✅ {type === "comp" ? "Mark Reviewed" : "Approve"}
                    </button>
                  )}
                  {statusVal !== "Rejected" && type !== "comp" && (
                    <button
                      className="remove-button"
                      onClick={() => updateStatus(type, requestId, "Rejected")}
                    >
                      🗑️ Reject
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ─── Render all four sections ──────────────────────────── */
  return (
    <div className="student-dashboard">
      <div className="dashboard-container">
        {/* Back button */}
        <div className="home-button-container">
          <button className="home-button" onClick={() => navigate(-1)}>
            <span>⬅️</span>Back to Warden Dashboard
          </button>
        </div>

        {/* Header */}
        <div className="dashboard-header">
          <div className="logo-container">
            <div className="logo-icon">
              <span>📝</span>
            </div>
            <h1>Manage Requests</h1>
          </div>
          <p className="tagline">
            Approve / Reject student submissions, {Name ?? "Warden"}
          </p>
        </div>

        {/* Sections */}
        <Section
          title="Room-Change Requests"
          icon="🛏️"
          data={roomReq}
          type="room"
          cols={(r) => [
            { label: "Current Room", value: r.CurrentRoom },
            { label: "Desired Room", value: r.DesiredRoom },
            { label: "Reason", value: r.Reason },
            { label: "Date", value: r.RequestDate },
            { label: "Status", value: r.Status },
          ]}
        />

        <Section
          title="Leave Requests"
          icon="📆"
          data={leaveReq}
          type="leave"
          cols={(r) => [
            { label: "From", value: r.FromDate },
            { label: "To", value: r.ToDate },
            { label: "Reason", value: r.Reason },
            { label: "Status", value: r.Status },
          ]}
        />

        <Section
          title="Complaints"
          icon="🛠️"
          data={complnts}
          type="comp"
          cols={(r) => [
            { label: "Email", value: r.Email },
            { label: "Complaint", value: r.Complaint },
            { label: "Date", value: r.ComplaintDate },
            { label: "Status", value: r.Status },
          ]}
        />

        <Section
          title="Guest-Entry Requests"
          icon="👥"
          data={guestReq}
          type="guest"
          cols={(r) => [
            { label: "Guest Name", value: r.GuestName },
            { label: "Contact", value: r.GuestContact },
            { label: "Visit Date", value: r.VisitDate },
            { label: "Status", value: r.Status },
          ]}
        />

        {/* Footer */}
        <div className="dashboard-footer">
          <p>All requests up-to-date ✔️</p>
        </div>
      </div>
    </div>
  );
}
