import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../Styles/AdminDashboard.css";
const url = import.meta.env.VITE_BASE_URL;


/**
 * SHOW-ALL-STUDENTS PAGE
 * ──────────────────────
 * Mirrors the original student-records UI, but lives on its own route
 * (e.g. /students). All class-names are identical to the old markup
 * to keep the existing CSS untouched.
 */
export default function ShowAllStudents() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const { ID, Name, Email } = location.state || {};

  const [studentData, setStudentData] = useState([]);
  const [error, setError]             = useState(false);

  /* Fetch the full student list once on mount */
  useEffect(() => {
    axios
      .get(`${url}studentData`)
      .then(res => setStudentData(res.data.user))
      .catch(err => { console.error(err); setError(true); });
  }, []);

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <h2>Error Loading Students</h2>
            <p>Unable to connect to the server. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">

        {/* Back → Admin Dashboard */}
        <div className="home-button-container">
          <button className="home-button" onClick={() => navigate(-1)}>
            <span>⬅️</span>
            Back to Admin Dashboard
          </button>
        </div>

        {/* Header */}
        <div className="dashboard-header">
          <div className="logo-container">
            <div className="logo-icon"><span>🎓</span></div>
            <h1>Student Records</h1>
          </div>
          <p className="tagline">All registered students</p>
        </div>

        {/* Admin Meta (optional - keeps old look) */}
        <div className="admin-info-card">
          <div className="admin-avatar"><span>{Name?.charAt(0) || "A"}</span></div>
          <div className="admin-details">
            <h2>Welcome, {Name}</h2>
            <div className="admin-meta">
              <span className="admin-id">ID: {ID}</span>
              <span className="admin-email">{Email}</span>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="content-section fade-in">
          <div className="section-header">
            <h2><span className="section-icon-small">🎓</span>Student Records</h2>
            <div className="student-count">Total: {studentData.length} students</div>
          </div>

          <div className="data-grid">
            {studentData.map((student, index) => (
              <div key={index} className="data-card student-card">
                <div className="card-header">
                  <div className="student-avatar">
                    <span>{student.Name?.charAt(0) || "S"}</span>
                  </div>
                  <div className="card-info">
                    <h4>{student.Name}</h4>
                    <span className="id-badge">ID: {student.StudentID}</span>
                  </div>
                </div>
                <div className="card-details">
                  <div className="detail-item">
                    <span className="detail-icon">📧</span>
                    <span>{student.Email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="dashboard-footer">
          <p>Crafted with ❤️ for the Admins</p>
        </div>
      </div>
    </div>
  );
}
