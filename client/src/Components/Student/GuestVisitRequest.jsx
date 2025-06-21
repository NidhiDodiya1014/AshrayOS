"use client";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GuestVisitRequest() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ID, Name, Email } = location.state || {};

  const [guestName, setGuestName] = useState("");
  const [guestIDProof, setGuestIDProof] = useState("");
  const [visitDate, setVisitDate] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guestName || !guestIDProof || !visitDate) {
      setStatusMessage("❌ Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    setStatusMessage("");
    console.log({ ID, Name, Email });
    axios
      .post("http://localhost:5000/guestVisitRequest", {
        StudentID: ID,
        GuestName: guestName,
        GuestIDProof: guestIDProof,
        VisitDate: visitDate.toISOString().split("T")[0],
      })
      .then(() => {
        setStatusMessage("✅ Guest visit request submitted!");
        setGuestName("");
        setGuestIDProof("");
        setVisitDate(null);
      })
      .catch((err) => {
        console.error(err);
        setStatusMessage("❌ Error submitting request.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="room-change-page">
      <div className="room-change-container">
        {/* Header */}
        <div className="room-change-header">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <span>👤</span>
              </div>
              <div className="header-text">
                <h1>Guest Visit Request</h1>
                <p>Submit your guest's details for approval</p>
              </div>
            </div>
            {/* Navigation */}
            <div className="nav-buttons">
              <button
                onClick={() =>
                  navigate("/student", { state: { ID, Name, Email } })
                }
                className="nav-button primary"
              >
                <span>📊</span> Dashboard
              </button>
              <button
                className="nav-button primary"
                onClick={() => navigate("/seeVisitRequests", { state: { ID, Name, Email } })}
              >
                <span>✅</span> See all visit requests
              </button>
              <button className="home-button" onClick={() => navigate("/")}>
                <span>🏠</span> Home
              </button>
            </div>
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

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`status-alert ${
              statusMessage.startsWith("✅") ? "success" : "error"
            }`}
          >
            <span className="status-text">{statusMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="room-change-form">
          <div className="form-group-section">
            <h3 className="section-title">Guest Details</h3>
            <div className="form-grid">
              <div className="form-field">
                <label className="field-label">Guest Name</label>
                <input
                  type="text"
                  className="field-input"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label className="field-label">Guest Contact Number</label>
                <input
                  type="tel"
                  className="field-input"
                  value={guestIDProof}
                  onChange={(e) => setGuestIDProof(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  inputMode="numeric"
                  placeholder="Enter 10-digit mobile number"
                  title="Enter a valid 10-digit contact number"
                />
              </div>

              <div className="form-field">
                <label className="field-label">Visit Date</label>
                <DatePicker
                  selected={visitDate}
                  onChange={(date) => setVisitDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select visit date"
                  className="field-input"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div className="loading-spinner"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>📤</span> <span>Submit Request</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="room-change-footer">
          <p>Your guest visit request will be reviewed by administration</p>
        </div>
      </div>
    </div>
  );
}
