"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../Styles/RoomChange.css";
const url = import.meta.env.VITE_BASE_URL;


export default function LeaveRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ID, Name, Email } = location.state || {};
  console.log("LeaveRequest frontend", { ID, Name, Email });

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fromDate || !toDate || !reason.trim()) {
      setStatusMessage("❌ Please fill out all fields.");
      return;
    }

    if (toDate < fromDate) {
      setStatusMessage("❌ 'To Date' must be after 'From Date'.");
      return;
    }

    setSubmitting(true);
    setStatusMessage("");

    axios
      .post(`${url}/leaveRequest`, {
        StudentID: ID,
        FromDate: fromDate,
        ToDate: toDate,
        Reason: reason,
      })
      .then((res) => {
        setStatusMessage("✅ Leave request submitted successfully!");
        setFromDate("");
        setToDate("");
        setReason("");
      })
      .catch((err) => {
        console.error(err);
        setStatusMessage("❌ Error submitting leave request.");
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
                <span>📝</span>
              </div>
              <div className="header-text">
                <h1>Leave Request Form</h1>
                <p>Fill in your leave details for approval</p>
              </div>
            </div>

            <button className="home-button" onClick={() => navigate("/")}>
              <span>🏠</span>
              Home
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

        {/* Form */}
        <div className="form-section">
          <form onSubmit={handleSubmit} className="room-change-form">
            <div className="form-group-section">
              <h3 className="section-title">
                Leave Duration
              </h3>
              <div className="form-grid">
                <div className="form-field">
                  <label className="field-label">From Date</label>
                  <DatePicker
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select start date"
                    className="field-input"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">To Date</label>
                  <DatePicker
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select end date"
                    className="field-input"
                    required
                  />
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

            <div className="form-group-section">
              <h3 className="section-title">
                Leave Reason
              </h3>
              <div className="textarea-container">
                <label className="field-label">Reason for Leave</label>
                <textarea
                  className="reason-textarea"
                  rows="6"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please specify the reason for your leave"
                  maxLength="500"
                  required
                />
                <div className="textarea-footer">
                  <span className="character-count">
                    {reason.length}/500 characters
                  </span>
                  <span className="helper-text">Be clear and specific</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
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
                    <span>📤</span>
                    <span>Submit Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="navigation-section">
          <div className="nav-buttons">
            <button
              onClick={() =>
                navigate("/student", { state: { ID, Name, Email } })
              }
              className="nav-button primary"
            >
              <span>📊</span>
              <span>Dashboard</span>
            </button>

            <button
              onClick={() =>
                navigate("/showAllLeaveReq", { state: { ID, Name, Email } })
              }
              className="nav-button secondary"
            >
              <span>📂</span>
              <span>See All Leave Requests</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="room-change-footer">
          <p>Your leave request will be reviewed by the administration</p>
        </div>
      </div>
    </div>
  );
}
