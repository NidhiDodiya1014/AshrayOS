import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import '../Styles/AdminDashboard.css'; 

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ID, Name, Email } = location.state || {};

  const [selectedSection, setSelectedSection] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [wardenData, setWardenData] = useState([]);
  const [error, setError] = useState(false);

  const [showAddWardenForm, setShowAddWardenForm] = useState(false);
  const [wardenForm, setWardenForm] = useState({
    id: "", name: "", email: "", password: "", contact: ""
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [justAddedWarden, setJustAddedWarden] = useState(false);
  const [reloadWardenData, setReloadWardenData] = useState(false);

  useEffect(() => {
    if (selectedSection === "students") {
      axios.get("http://localhost:5000/studentData")
           .then(res => setStudentData(res.data.user))
           .catch(err => { console.error(err); setError(true); });
    } else if (selectedSection === "wardens") {
      axios.get("http://localhost:5000/wardenData")
           .then(res => setWardenData(res.data.wardens))
           .catch(err => { console.error(err); setError(true); });
    }
  }, [selectedSection, reloadWardenData]);

  useEffect(() => {
    if (selectedSection !== "wardens") {
      setJustAddedWarden(false);
      setShowAddWardenForm(false);
    }
  }, [selectedSection]);

  const handleWardenChange = e =>
    setWardenForm({ ...wardenForm, [e.target.name]: e.target.value });

  const handleWardenSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/addWarden", wardenForm)
      .then(() => {
        setSuccessMsg("✅ Warden added successfully!");
        setWardenForm({ id: "", name: "", email: "", password: "", contact: "" });
        setShowAddWardenForm(false);
        setJustAddedWarden(true);
        setSelectedSection("wardens");
        setReloadWardenData(prev => !prev);
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch(err => { 
        console.error(err); 
        setSuccessMsg("❌ Failed to add warden."); 
        setTimeout(() => setSuccessMsg(""), 3000);
      });
  };

  const handleRemoveWarden = id => {
    axios.delete("http://localhost:5000/removeWarden", { params: { id } })
      .then(() => {
        setSuccessMsg(`🗑️ Warden ${id} removed successfully!`);
        setReloadWardenData(prev => !prev);
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch(err => { 
        console.error(err); 
        setSuccessMsg("❌ Failed to remove warden."); 
        setTimeout(() => setSuccessMsg(""), 3000);
      });
  };

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <h2>Error Loading Dashboard</h2>
            <p>Unable to connect to the server. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        {/* Home Button */}
        <div className="home-button-container">
          <button className="home-button" onClick={() => navigate("/")}>
            <span>🏠</span>
            Go to Home Page
          </button>
        </div>

        {/* Header Section */}
        <div className="dashboard-header">
          <div className="logo-container">
            <div className="logo-icon">
              <span>👑</span>
            </div>
            <h1>Admin Portal</h1>
          </div>
          <p className="tagline">Full system control & management</p>
        </div>

        {/* Admin Info Card */}
        <div className="admin-info-card">
          <div className="admin-avatar">
            <span>{Name?.charAt(0) || 'A'}</span>
          </div>
          <div className="admin-details">
            <h2>Welcome, {Name}</h2>
            <div className="admin-meta">
              <span className="admin-id">ID: {ID}</span>
              <span className="admin-email">{Email}</span>
            </div>
          </div>
        </div>

        {/* Section Selection */}
        <div className="section-selector">
          <h3>Choose Management Section</h3>
          <div className="section-options">
            <div 
              className={`section-card ${selectedSection === 'students' ? 'active' : ''}`}
              onClick={() => setSelectedSection('students')}
            >
              <div className="section-icon student-icon">
                <span>🎓</span>
              </div>
              <h4>Student Data</h4>
              <p>Manage student records & information</p>
            </div>
            
            <div 
              className={`section-card ${selectedSection === 'wardens' ? 'active' : ''}`}
              onClick={() => setSelectedSection('wardens')}
            >
              <div className="section-icon warden-icon">
                <span>🛡️</span>
              </div>
              <h4>Warden Data</h4>
              <p>Manage warden accounts & permissions</p>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {successMsg && (
          <div className={`message-card ${successMsg.startsWith('✅') ? 'success' : 'error'}`}>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Content Sections */}
        {selectedSection === "students" && (
          <div className="content-section fade-in">
            <div className="section-header">
              <h2>
                <span className="section-icon-small">🎓</span>
                Student Records
              </h2>
              <div className="student-count">
                Total: {studentData.length} students
              </div>
            </div>
            
            <div className="data-grid">
              {studentData.map((student, index) => (
                <div key={index} className="data-card student-card">
                  <div className="card-header">
                    <div className="student-avatar">
                      <span>{student.Name?.charAt(0) || 'S'}</span>
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
        )}

        {selectedSection === "wardens" && (
          <div className="content-section fade-in">
            <div className="section-header">
              <h2>
                <span className="section-icon-small">🛡️</span>
                Warden Management
              </h2>
              <div className="section-actions">
                <div className="warden-count">
                  Total: {wardenData.length} wardens
                </div>
                <button 
                  className="add-button"
                  onClick={() => setShowAddWardenForm(!showAddWardenForm)}
                >
                  <span>+</span>
                  {showAddWardenForm ? "Cancel" : "Add Warden"}
                </button>
              </div>
            </div>

            {/* Add Warden Form */}
            {showAddWardenForm && (
              <div className="form-container slide-down">
                <div className="form-card">
                  <h3>Add New Warden</h3>
                  <form onSubmit={handleWardenSubmit} className="warden-form">
                    <div className="form-row">
                      <div className="input-group">
                        <span className="input-icon">🆔</span>
                        <input
                          name="id"
                          placeholder="Warden ID"
                          required
                          value={wardenForm.id}
                          onChange={handleWardenChange}
                        />
                      </div>
                      <div className="input-group">
                        <span className="input-icon">👤</span>
                        <input
                          name="name"
                          placeholder="Full Name"
                          required
                          value={wardenForm.name}
                          onChange={handleWardenChange}
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="input-group">
                        <span className="input-icon">📧</span>
                        <input
                          name="email"
                          type="email"
                          placeholder="Email Address"
                          required
                          value={wardenForm.email}
                          onChange={handleWardenChange}
                        />
                      </div>
                      <div className="input-group">
                        <span className="input-icon">📞</span>
                        <input
                          name="contact"
                          placeholder="Contact Number"
                          required
                          value={wardenForm.contact}
                          onChange={handleWardenChange}
                        />
                      </div>
                    </div>
                    
                    <div className="input-group full-width">
                      <span className="input-icon">🔒</span>
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={wardenForm.password}
                        onChange={handleWardenChange}
                      />
                    </div>
                    
                    <button type="submit" className="submit-button">
                      <span>✨</span>
                      Create Warden Account
                    </button>
                  </form>
                </div>
              </div>
            )}
            
            {/* Warden List */}
            <div className="data-grid">
              {wardenData.map((warden, index) => (
                <div key={index} className="data-card warden-card">
                  <div className="card-header">
                    <div className="warden-avatar">
                      <span>{warden.Name?.charAt(0) || 'W'}</span>
                    </div>
                    <div className="card-info">
                      <h4>{warden.Name}</h4>
                      <span className="id-badge">ID: {warden.WardenID}</span>
                    </div>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveWarden(warden.WardenID)}
                      title="Remove Warden"
                    >
                      <span>🗑️</span>
                    </button>
                  </div>
                  <div className="card-details">
                    <div className="detail-item">
                      <span className="detail-icon">📧</span>
                      <span>{warden.Email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="dashboard-footer">
          <p>Crafted with ❤️ for the Admins</p>
        </div>
      </div>
    </div>
  );
}
