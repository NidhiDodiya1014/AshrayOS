"use client";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/ComplaintForm.css";

export default function ComplaintForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ID, Name, Email } = location.state || {};

  const [Complaint, setComplaint] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!String(ID).trim()) {
      setSubmitStatus("ID is required.");
      return;
    }
    if (!String(Name).trim()) {
      setSubmitStatus("Name is required.");
      return;
    }
    if (!String(Complaint).trim()) {
      setSubmitStatus("Please enter your complaint.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");

    const complaintData = { ID, Name, Email, Complaint };

    axios
      .post("http://localhost:5000/complaint", complaintData)
      .then((response) => {
        console.log("Complaint submitted successfully:", response.data);
        setSubmitStatus("✅ Complaint submitted successfully!");
        setComplaint("");
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(""), 3000);
      })
      .catch((error) => {
        console.error("Error submitting complaint:", error);
        setSubmitStatus(
          "❌ Error submitting complaint. Please try again later."
        );
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(""), 3000);
      });
  }

  return (
    <div className="complaint-form-page">
      <div className="form-container">
        {/* Home Button */}
        <div className="home-button-container">
          <button className="home-button" onClick={() => navigate("/")}>
            <span>🏠</span>
            Go to Home Page
          </button>
        </div>

        {/* Header Section */}
        <div className="form-header">
          <div className="logo-container">
            <div className="logo-icon">
              <span>📝</span>
            </div>
            <h1>Submit Complaint</h1>
          </div>
          <p className="tagline">Let us know about your concerns</p>
        </div>

        {/* User Info Card */}
        <div className="user-info-card">
          <div className="user-avatar">
            <span>{Name?.charAt(0) || "U"}</span>
          </div>
          <div className="user-details">
            <h2>{Name}</h2>
            <div className="user-meta">
              <span className="user-id">ID: {ID}</span>
              <span className="user-email">{Email}</span>
            </div>
          </div>
        </div>

        {/* Complaint Form */}
        <div className="complaint-form-card">
          <form onSubmit={handleSubmit} className="complaint-form">
            <div className="form-section">
              <h3 className="section-title">💬 Complaint Details</h3>

              <div className="complaint-field-wrapper">
                <label
                  htmlFor="complaintTextArea"
                  className="complaint-field-label"
                >
                  Describe your complaint in detail
                </label>
                <textarea
                  className="complaint-textarea-input"
                  id="complaintTextArea"
                  rows="8"
                  value={Complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  placeholder="Please provide detailed information about your complaint. Include any relevant dates, locations, and circumstances that will help us understand and address your concern effectively."
                  maxLength={1000}
                />
                <div className="complaint-field-footer">
                  <span className="character-count">
                    {Complaint.length}/1000 characters
                  </span>
                  <span className="helper-text">
                    Be specific and include all relevant details
                  </span>
                </div>
              </div>
            </div>

            {/* Status Message */}
            {submitStatus && (
              <div
                className={`status-message ${
                  submitStatus.startsWith("✅") ? "success" : "error"
                }`}
              >
                <span>{submitStatus}</span>
              </div>
            )}
            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting || !Complaint.trim()}
              >
                <span className="button-icon">
                  {isSubmitting ? "⏳" : "📤"}
                </span>
                {isSubmitting ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>
          </form>
        </div>

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          <button
            onClick={() => navigate("/student", { state: { ID, Name, Email } })}
            className="nav-button primary"
          >
            <span>📊</span>
            Student Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/showAllComplaints", { state: { ID, Name, Email } })
            }
            className="nav-button secondary"
          >
            <span>📋</span>
            View All Complaints
          </button>
        </div>

        {/* Footer */}
        <div className="form-footer">
          <p>Crafted with ❤️ for the students</p>
        </div>
      </div>
    </div>
  );
}
