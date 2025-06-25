"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../Styles/RoomChange.css";
const url = import.meta.env.VITE_BASE_URL;


export default function RoomChange() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ID, Name, Email } = location.state || {};

  const [currentRoom, setCurrentRoom] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [reason, setReason] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentRoom.trim() || !newRoom.trim() || !reason.trim()) {
      setStatusMessage("❌ Please fill out all fields.");
      return;
    }

    setSubmitting(true);
    setStatusMessage("");

    axios
      .post(`${url}roomChangeRequest`, {
        StudentID: ID,
        CurrentRoom: currentRoom,
        DesiredRoom: newRoom,
        Reason: reason,
      })
      .then((response) => {
        setStatusMessage("✅ Room change request submitted successfully!");
        setCurrentRoom("");
        setNewRoom("");
        setReason("");
      })
      .catch((error) => {
        console.error("Error submitting request:", error);
        setStatusMessage("❌ Error submitting request. Please try again.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="room-change-page">
      <div className="room-change-container">
        {/* Header Section */}
        <div className="room-change-header">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <span>🏠</span>
              </div>
              <div className="header-text">
                <h1>Room Change Request</h1>
                <p>
                  Submit your request for a room change with detailed
                  information
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Section */}
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

        {/* Navigation Section */}
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
                navigate("/showAllRoomReq", { state: { ID, Name, Email } })
              }
              className="nav-button primary"
            >
              <span>📂</span>
              <span>See Room Change Requests</span>
            </button>
            <button className="home-button" onClick={() => navigate("/")}>
              <span>🏠</span>
              Home
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <form onSubmit={handleSubmit} className="room-change-form">
            {/* Room Information */}
            <div className="form-group-section">
              <h3 className="section-title">
                Room Information
              </h3>
              
              <div className="form-grid">
                <div className="form-field">
                  <label className="field-label">Current Room Number</label>
                  <input
                    className="field-input"
                    type="text"
                    value={currentRoom}
                    onChange={(e) => setCurrentRoom(e.target.value)}
                    placeholder="Enter your current room number"
                    required
                  />
                </div>
                
                <div className="form-field">
                  <label className="field-label">Preferred New Room</label>
                  <input
                    className="field-input"
                    type="text"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    placeholder="Enter preferred room number"
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
            {/* Reason Details */}
            <div className="form-group-section">
              <h3 className="section-title">
                Request Details
              </h3>
              <div className="textarea-container">
                <label className="field-label">Reason for Room Change</label>
                <textarea
                  className="reason-textarea"
                  rows="6"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please provide a detailed explanation for your room change request. Include any specific requirements or circumstances that support your request."
                  maxLength="500"
                  required
                />
                <div className="textarea-footer">
                  <span className="character-count">
                    {reason.length}/500 characters
                  </span>
                  <span className="helper-text">
                    Be specific about your reasons
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={submitting || !reason.trim()}
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

        

        {/* Footer */}
        <div className="room-change-footer">
          <p>Your request will be reviewed by the hostel administration</p>
        </div>
      </div>
    </div>
  );
}
