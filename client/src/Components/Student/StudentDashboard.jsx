import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/StudentDashboard.css";


export default function StudentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { Name, ID, Email } = location.state || {};
  console.log("StudentDashboard", { Name, ID, Email });

  // 🛡️ Redirect to login if no state (user came directly to this page)
  // useEffect(() => {
  //   if (!location.state) {
  //     navigate("/");
  //   }
  // }, [location.state, navigate]);

  const services = [
    {
      title: "View Details",
      description: "See all your personal information",
      icon: "👤",
      action: () => navigate("/showAllStudentInfo", { state: { ID, Name, Email } }),
      color: "student",
    },
    {
      title: "Room Change",
      description: "Request for room change",
      icon: "🏠",
      action: () => navigate("/roomChange", { state: { ID, Name, Email } }),
      color: "warden",
    },
    {
      title: "Leave Request",
      description: "Apply for leave from hostel",
      icon: "📅",
      action: () => navigate("/leaveRequest", { state: { ID, Name, Email } }),
      color: "student",
    },
    {
      title: "Complaints",
      description: "Submit complaints or issues",
      icon: "📝",
      action: () => navigate("/complaint", { state: { ID, Name, Email} }),
      color: "warden",
    },
    {
      title: "Laundry Booking",
      description: "Book your laundry time slot",
      icon: "👕",
      action: () => navigate("/laundrySlots", { state: { ID, Name, Email } }),
      color: "student",
    },
    {
      title: "Guest Entry",
      description: "Request guest entry permission",
      icon: "🚪",
      action: () => navigate("/guestEntry", { state: { ID, Name, Email } }),
      color: "warden",
    },
  ];

  return (
    <div className="student-dashboard">
      <div className="dashboard-container">
        <div className="home-button-container">
          <button className="home-button" onClick={() => navigate("/")}>
            <span>🏠</span>
            Go to Home Page
          </button>
        </div>

        <div className="dashboard-header">
          <div className="logo-container">
            <div className="logo-icon">
              <span>🎓</span>
            </div>
            <h1>Student Portal</h1>
          </div>
          <p className="tagline">Access your room & services</p>
        </div>

        <div className="student-info-card">
          <div className="student-avatar">
            <span>{Name?.charAt(0) || "S"}</span>
          </div>
          <div className="student-details">
            <h2>Welcome, {Name}</h2>
            <div className="student-meta">
              <span className="student-id">ID: {ID}</span>
              <span className="student-email">{Email}</span>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h3>Available Services</h3>
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-card ${service.color}-card`}
                onClick={service.action}
              >
                <div className="service-icon">
                  <span>{service.icon}</span>
                </div>
                <div className="service-content">
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                </div>
                <div className="service-arrow">
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-footer">
          <p>Crafted with ❤️ for the students</p>
        </div>
      </div>
    </div>
  );
}
