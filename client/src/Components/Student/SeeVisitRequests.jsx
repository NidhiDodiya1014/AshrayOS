import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/seeVisitRequests.css";

export default function SeeVisitRequests() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ID, Name, Email } = location.state || {};

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/SeeGuestRequests", {
        params: { StudentID: ID },
      })
      .then((res) => setRequests(res.data))
      .catch((err) => {
        console.error("Error fetching guest requests:", err);
      })
      .finally(() => setLoading(false));
  }, [ID]);

  return (
    <div className="room-change-page">
      <div className="room-change-container">
        {/* Header */}
        <div className="room-change-header">
          <div className="header-content" style={{ justifyContent: "center" }}>
            <div className="logo-section">
              <div className="logo-icon">
                <span>👥</span>
              </div>
              <div className="header-text" style={{ textAlign: "center" }}>
                <h1>Guest Entry Requests</h1>
                <p>Track all your guest entry submissions</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="user-section centered-user-section">
          <div className="user-card horizontal-user-card">
            <div className="avatar-name-row">
              <div className="user-avatar">
                <span>{Name?.charAt(0) || "U"}</span>
              </div>
              <div className="user-name">
                <h2>{Name}</h2>
              </div>
            </div>
            <div className="user-info">
              <div className="user-details">
                <span className="detail-item">
                  <span className="detail-icon">🆔</span>
                  ID: {ID}
                </span>
                <span className="detail-item">
                  <span className="detail-icon">📧</span>
                  {Email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="nav-buttons">
          <button
            onClick={() => navigate(-1)}
            className="nav-button primary"
          >
            <span>🔙</span> Back to Dashboard
          </button>
        </div>
        {/* Table */}
        <div className="form-section">
          {loading ? (
            <p>Loading guest requests...</p>
          ) : requests.length === 0 ? (
            <p>No guest requests found.</p>
          ) : (
            <table className="leave-request-table">
              <thead>
                <tr>
                  <th>Guest Name</th>
                  <th>Guest Contact</th>
                  <th>Visit Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, idx) => (
                  <tr key={req.RequestID || idx}>
                    <td>{req.GuestName}</td>
                    <td>{req.GuestContact}</td>
                    <td>{req.VisitDate?.split("T")[0]}</td>
                    <td
                      style={{
                        color:
                          req.Status === "Approved"
                            ? "green"
                            : req.Status === "Rejected"
                            ? "red"
                            : "orange",
                        fontWeight: "bold",
                      }}
                    >
                      {req.Status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
