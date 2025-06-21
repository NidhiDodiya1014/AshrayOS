"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import "../Styles/ShowAllComplaints.css"

export default function ShowAllComplaints() {
  const location = useLocation()
  const { ID, Name, Email } = location.state || {}
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (!ID) {
      setError("No user ID provided")
      setLoading(false)
      return
    }

    axios
      .get("http://localhost:5000/showAllComplaints", { params: { ID } })
      .then((response) => {
        setComplaints(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error)
        setError("Error fetching complaints. Please try again later.")
        setLoading(false)
      })
  }, [ID])

  if (loading) {
    return (
      <div className="complaints-page">
        <div className="complaints-container">
          <div className="loading-card">
            <div className="loading-spinner"></div>
            <h2>Loading Complaints...</h2>
            <p>Please wait while we fetch your complaint history</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="complaints-page">
        <div className="complaints-container">
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <h2>Error Loading Complaints</h2>
            <p>{error}</p>
            <button className="retry-button" onClick={() => window.location.reload()}>
              <span>🔄</span>
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="complaints-page">
      <div className="complaints-container">
        {/* Home Button */}
        <div className="home-button-container">
          <button className="home-button" onClick={() => navigate("/")}>
            <span>🏠</span>
            Go to Home Page
          </button>
        </div>

        {/* Header Section */}
        <div className="complaints-header">
          <div className="logo-container">
            <div className="logo-icon">
              <span>📋</span>
            </div>
            <h1>All Complaints</h1>
          </div>
          <p className="tagline">Your complaint history and status</p>
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

        {/* Navigation Buttons - Move this above complaints section */}
        <div className="navigation-buttons">
          <button onClick={() => navigate("/complaint", { state: { ID, Name, Email } })} className="nav-button primary">
            <span>📝</span>
            Submit New Complaint
          </button>

          <button onClick={() => navigate("/student", { state: { ID, Name, Email } })} className="nav-button secondary">
            <span>📊</span>
            Student Dashboard
          </button>
        </div>

        {/* Complaints Section */}
        <div className="complaints-section">
          <div className="section-header">
            <h3>Complaint History</h3>
            <div className="complaints-count">
              Total: {complaints.length} complaint{complaints.length !== 1 ? "s" : ""}
            </div>
          </div>

          {complaints.length === 0 ? (
            <div className="no-complaints-card">
              <div className="no-complaints-icon">📭</div>
              <h3>No Complaints Found</h3>
              <p>You haven't submitted any complaints yet.</p>
              <button
                onClick={() => navigate("/complaint", { state: { ID, Name, Email } })}
                className="submit-complaint-button"
              >
                <span>📝</span>
                Submit Your First Complaint
              </button>
            </div>
          ) : (
            <div className="complaints-list">
              {complaints.map((complaint, index) => (
                <div key={complaint.ComplaintID} className="complaint-row">
                  <div className="complaint-info">
                    <div className="complaint-id-section">
                      <span className="id-badge">#{complaint.ComplaintID}</span>
                      <span className="status-badge pending">Pending</span>
                    </div>
                    <div className="complaint-text">{complaint.Complaint}</div>
                    <div className="complaint-meta">
                      <span className="meta-item">
                        <span className="meta-icon">👤</span>
                        {complaint.Name}
                      </span>
                      <span className="meta-item">
                        <span className="meta-icon">🆔</span>
                        {complaint.StudentID}
                      </span>
                      <span className="meta-item">
                        <span className="meta-icon">📧</span>
                        {complaint.Email}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="complaints-footer">
          <p>Crafted with ❤️ for the students</p>
        </div>
      </div>
    </div>
  )
}
