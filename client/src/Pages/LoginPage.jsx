import { useState } from "react";
import "./LoginPage.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const Navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({ id: "", password: "" });

  const roles = [
    {
      id: "student",
      title: "Student",
      emoji: "🎓",
      description: "Access your room & services",
      gradient: "student-gradient",
    },
    {
      id: "warden",
      title: "Warden",
      emoji: "🛡️",
      description: "Manage students & requests",
      gradient: "warden-gradient",
    },
    {
      id: "admin",
      title: "Admin",
      emoji: "👑",
      description: "Full system control",
      gradient: "admin-gradient",
    },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      alert("Please select a role first!");
      return;
    }

    console.log(`Logging in as ${selectedRole} with:`, formData);
    try {
      const response = await axios.post("http://localhost:5000/login", {
        id: formData.id,
        password: formData.password,
        role: selectedRole,
      });

      if (response.data.success) {
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
          console.log(response.data.user);
          let userID;
          if (selectedRole === "student") {
            userID = response.data.user.StudentID;
          } else if (selectedRole === "warden") {
            userID = response.data.user.WardenID;
          } else if (selectedRole === "admin") {
            userID = response.data.user.AdminID;
          }
          // console.log("User ID:", userID);
          // console.log("Selected Role:", selectedRole);
          // console.log(response.data.user.Name);
          // console.log(response.data.user.Email);
          console.log(userID);
          Navigate(`/${selectedRole}`, {
            state: {
              Name: response.data.user.Name,
              ID: userID,
              Email: response.data.user.Email,
            },
          });
        }, 2000);
      } else {
        alert("Invalid credentials. Please try again.");
        setFormData({ id: "", password: "" });
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials. Please try again.");
      setFormData({ id: "", password: "" });
      return;
    }
  };

  return (
    <div className="login-page">
      <div className="animated-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>

      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      <div className="login-container">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo">✨</div>
          </div>
          <h1 className="login-title">Hostel Portal</h1>
          <p className="login-subtitle">
            Experience the future of hostel management
          </p>
        </div>

        <div className="role-selection">
          <h2 className="role-title">Select Your Role</h2>
          <div className="role-grid">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`role-card ${
                  selectedRole === role.id ? "selected" : ""
                } ${role.gradient}`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className="role-icon">{role.emoji}</div>
                <h3 className="role-name">{role.title}</h3>
                <p className="role-desc">{role.description}</p>
                <div className="role-selector">
                  <div className="selector-dot"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id" className="form-label">
              {selectedRole
                ? roles.find((r) => r.id === selectedRole)?.title
                : "User"}{" "}
              ID
            </label>
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your ID"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`login-btn ${selectedRole ? selectedRole + "-btn" : ""}`}
            disabled={isTransitioning}
          >
            {isTransitioning ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              <>
                <span>
                  Login as{" "}
                  {selectedRole
                    ? roles.find((r) => r.id === selectedRole)?.title
                    : "User"}
                </span>
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Crafted with ❤️ for everyone</p>
        </div>
      </div>

      {isTransitioning && (
        <div className="transition-overlay">
          <div className="transition-content">
            <div className="transition-spinner"></div>
            <h2>Entering {selectedRole} portal...</h2>
            <p>Please wait while we prepare your dashboard</p>
          </div>
        </div>
      )}
    </div>
  );
}
