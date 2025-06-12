import { useState } from "react"
import "./LoginPage.css"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [formData, setFormData] = useState({ username: "", password: "" })

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
  ]

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedRole) {
      alert("Please select a role first!")
      return
    }

    setIsTransitioning(true)

    // Simulate login process
    setTimeout(() => {
      console.log(`Logging in as ${selectedRole} with:`, formData)
      // Here you would handle the actual login logic
      setIsTransitioning(false)
    }, 2000)
  }

  return (
    <div className="login-page">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="login-container">
        {/* Header */}
        <div className="login-header">
          <div className="logo-container">
            <div className="logo">✨</div>
          </div>
          <h1 className="login-title">Hostel Portal</h1>
          <p className="login-subtitle">Experience the future of hostel management</p>
        </div>

        {/* Role Selection */}
        <div className="role-selection">
          <h2 className="role-title">Select Your Role</h2>
          <div className="role-grid">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`role-card ${selectedRole === role.id ? "selected" : ""} ${role.gradient}`}
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

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your username"
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
                <span>Login as {selectedRole ? roles.find((r) => r.id === selectedRole)?.title : "User"}</span>
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>Crafted with ❤️ for the next generation</p>
        </div>
      </div>

      {/* Transition Overlay */}
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
  )
}
