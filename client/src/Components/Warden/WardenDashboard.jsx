import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Styles/WardenDashboard.css";

/**
 * WARDEN DASHBOARD
 * ─────────────────
 * “Manage Requests” now rolls room-change, leave, complaint,
 * and guest-entry approvals into ONE screen: /manageRequests.
 */
export default function WardenDashboard() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { Name, ID, Email } = location.state || {};

  const services = [
    {
      title: "View All Students",
      description: "Access student details and records",
      icon: "📋",
      action: () => navigate("/studentsDataAll", { state: { ID, Name, Email } }),
      color: "warden",
    },
    {
      title: "Manage Requests",
      description: "Room, leave, complaints & guest entries",
      icon: "📝",
      action: () => navigate("/manageRequests", { state: { ID, Name, Email } }),
      color: "student",
    },
    {
      title: "Laundry Management",
      description: "Monitor laundry bookings",
      icon: "🧺",
      action: () => navigate("/laundryManagement", { state: { ID, Name, Email } }),
      color: "warden",
    },
  ];

  return (
    <div className="student-dashboard">
      <div className="dashboard-container">
        {/* Home */}
        <div className="home-button-container">
          <button className="home-button" onClick={() => navigate("/")}>
            <span>🏠</span>Go to Home Page
          </button>
        </div>

        {/* Header */}
        <div className="dashboard-header">
          <div className="logo-container">
            <div className="logo-icon"><span>🛡️</span></div>
            <h1>Warden Portal</h1>
          </div>
          <p className="tagline">Manage hostel and student services</p>
        </div>

        {/* Warden Info */}
        <div className="student-info-card">
          <div className="student-avatar"><span>{Name?.charAt(0) || "W"}</span></div>
          <div className="student-details">
            <h2>Welcome, {Name}</h2>
            <div className="student-meta">
              <span className="student-id">ID: {ID}</span>
              <span className="student-email">{Email}</span>
            </div>
          </div>
        </div>

        {/* Service Grid */}
        <div className="services-section">
          <h3>Warden Services</h3>
          <div className="services-grid">
            {services.map((srv, i) => (
              <div key={i} className={`service-card ${srv.color}-card`} onClick={srv.action}>
                <div className="service-icon"><span>{srv.icon}</span></div>
                <div className="service-content">
                  <h4>{srv.title}</h4>
                  <p>{srv.description}</p>
                </div>
                <div className="service-arrow"><span>→</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="dashboard-footer">
          <p>Serving with integrity and efficiency 💼</p>
        </div>
      </div>
    </div>
  );
}
