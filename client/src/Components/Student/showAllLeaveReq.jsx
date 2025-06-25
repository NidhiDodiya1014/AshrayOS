"use client";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/showAllLeave.css";
const url = import.meta.env.VITE_BASE_URL;

export default function ShowAllLeaveReq() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ID, Name, Email } = location.state || {};

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${url}leaveRequests`, { params: { StudentID: ID } })
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.error("Error fetching leave requests:", err);
      })
      .finally(() => setLoading(false));
  }, [ID]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    if (!status) return "status pending";
    const lower = status.toLowerCase();
    if (lower === "approved") return "status approved";
    if (lower === "rejected") return "status rejected";
    return "status pending";
  };

  return (
    <div className="room-change-page">
      <div className="room-change-container">
        {/* Header */}
        <div className="room-change-header">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <span>📋</span>
              </div>
              <div className="header-text">
                <h1>All Leave Requests</h1>
                <p>View your leave request history</p>
              </div>
            </div>
            <button className="home-button" onClick={() => navigate("/")}>
              <span>🏠</span> Home
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="user-section">
          <div className="user-card">
            <div className="user-avatar">
              <span>{Name?.charAt(0) || "U"}</span>
            </div>
            <div className="user-info">
              <h2>{Name}</h2>
              <div className="user-details">
                <span className="detail-item">
                  <span className="detail-icon">🆔</span> ID: {ID}
                </span>
                <span className="detail-item">
                  <span className="detail-icon">📧</span> {Email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="form-section">
          {loading ? (
            <p>Loading leave requests...</p>
          ) : requests.length === 0 ? (
            <div className="status-alert error">
              <span className="status-text">❌ No leave requests found.</span>
            </div>
          ) : (
            <div className="table-container">
              <table className="leave-request-table">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req, index) => (
                    <tr key={index}>
                      <td>{formatDate(req.FromDate)}</td>
                      <td>{formatDate(req.ToDate)}</td>
                      <td>{req.Reason}</td>
                      <td className={getStatusClass(req.Status)}>
                        {req.Status || "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="navigation-section">
          <div className="nav-buttons">
            <button
              onClick={() =>
                navigate("/leaveRequest", { state: { ID, Name, Email } })
              }
              className="nav-button primary"
            >
              <span>🔙</span> Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
