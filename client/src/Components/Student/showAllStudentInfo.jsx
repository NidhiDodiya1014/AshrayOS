"use client"

import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import "../Styles/ShowAllStudentInfo.css"
const url = import.meta.env.VITE_BASE_URL;


export default function ShowAllStudentInfo() {
  const location = useLocation()
  const navigate = useNavigate()
  const { ID } = location.state || {}

  const [studentID, setStudentID] = useState(ID || "")
  const [gender, setGender] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [roomID, setRoomID] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!ID) {
      setError("No student ID provided")
      setLoading(false)
      return
    }

    axios
      .get(`${url}getStudentInfo`, {
        params: { ID },
      })
      .then((response) => {
        const data = response.data

        if (data.length > 0) {
          const student = data[0]
          setStudentID(student.StudentID)
          setGender(student.Gender)
          setName(student.Name)
          setEmail(student.Email)
          setContact(student.ContactNumber)
          setRoomID(student.RoomID)
        } else {
          setError("No student found with this ID.")
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching student info:", error)
        setError("Failed to fetch student information.")
        setLoading(false)
      })
  }, [ID])

  const studentInfo = [
    { label: "Student ID", value: studentID, icon: "🆔" },
    { label: "Name", value: name, icon: "👤" },
    { label: "Email", value: email, icon: "📧" },
    { label: "Contact", value: contact, icon: "📞" },
    { label: "Gender", value: gender, icon: "⚧" },
    { label: "Room Number", value: roomID, icon: "🏠" },
  ]

  if (loading) {
    return (
      <div className="student-info-page">
        <div className="info-container">
          <div className="loading-card">
            <div className="loading-spinner"></div>
            <h2>Loading Student Information...</h2>
            <p>Please wait while we fetch your details</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="student-info-page">
        <div className="info-container">
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <h2>Error Loading Information</h2>
            <p>{error}</p>
            <button className="back-button" onClick={() => navigate(-1)}>
              <span>←</span>
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="student-info-page">
      <div className="info-container">
        {/* Header Section */}
        <div className="info-header">
          <div className="logo-container">
            <div className="logo-icon">
              <span>📋</span>
            </div>
            <h1>Student Information</h1>
          </div>
          <p className="tagline">Complete profile details</p>
        </div>

        {/* Student Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar">
            <span>{name?.charAt(0) || "S"}</span>
          </div>
          <div className="profile-details">
            <h2>{name || "Student Name"}</h2>
            <span className="profile-id">ID: {studentID}</span>
          </div>
        </div>

        {/* Information Grid */}
        <div className="info-section">
          <h3>Personal Details</h3>
          <div className="info-grid">
            {studentInfo.map((info, index) => (
              <div key={index} className="info-card">
                <div className="info-icon">
                  <span>{info.icon}</span>
                </div>
                <div className="info-content">
                  <h4>{info.label}</h4>
                  <p>{info.value || "Not provided"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-section">
          <button className="back-button" onClick={() => navigate(-1)}>
            <span>←</span>
            Back to Dashboard
          </button>
        </div>

        {/* Footer */}
        <div className="info-footer">
          <p>Crafted with ❤️ for the students</p>
        </div>
      </div>
    </div>
  )
}
