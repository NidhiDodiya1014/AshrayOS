"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import "../Styles/laundryBooking.css"

export default function LaundryBooking() {
  const location = useLocation()
  const navigate = useNavigate()
  const { SlotID, ID, Name, Email } = location.state || {}

  const [bookingStatus, setBookingStatus] = useState("")
  const [hasBooked, setHasBooked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!SlotID || !ID) {
      setBookingStatus("Missing slot or user information.")
      setIsLoading(false)
      return
    }

    axios
      .post("http://localhost:5000/laundryBook", { SlotID, ID })
      .then((res) => {
        setBookingStatus(res.data.message)
        setHasBooked(true)
        setIsSuccess(true)
        setIsLoading(false)
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Failed to book the slot."
        setBookingStatus(msg)
        setIsSuccess(false)
        setIsLoading(false)
      })
  }, [SlotID, ID])

  const goToSlots = () => navigate("/laundrySlots", { state: { ID, Name, Email } })
  const goToHome = () => navigate("/")

  if (isLoading) {
    return (
      <div className="laundry-booking-page">
        <div className="booking-container">
          <div className="loading-card">
            <div className="loading-spinner"></div>
            <h2>Processing Your Booking...</h2>
            <p>Please wait while we reserve your laundry slot</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="laundry-booking-page">
      <div className="booking-container">
        {/* Home Button */}
        <div className="home-button-container">
          <button className="home-button" onClick={goToHome}>
            <span>🏠</span>
            Go to Home Page
          </button>
        </div>

        {/* Header Section */}
        <div className="booking-header">
          <div className="logo-container">
            <div className={`logo-icon ${isSuccess ? "success" : "error"}`}>
              <span>{isSuccess ? "✅" : "❌"}</span>
            </div>
            <h1>Laundry Booking</h1>
          </div>
          <p className="tagline">{isSuccess ? "Booking confirmation" : "Booking failed"}</p>
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

        {/* Booking Status Card */}
        <div className={`status-card ${isSuccess ? "success-card" : "error-card"}`}>
          <div className="status-icon">
            <span>{isSuccess ? "🎉" : "⚠️"}</span>
          </div>
          <div className="status-content">
            <h3>{isSuccess ? "Booking Successful!" : "Booking Failed"}</h3>
            <p className="status-message">{bookingStatus}</p>
            {isSuccess && SlotID && (
              <div className="booking-details">
                <div className="detail-item">
                  <span className="detail-icon">🏷️</span>
                  <span className="detail-label">Slot ID:</span>
                  <span className="detail-value">#{SlotID}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">⏰</span>
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">30 minutes</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={goToSlots} className="primary-button">
            <span>👕</span>
            View All Slots
          </button>
          <button onClick={() => navigate("/student", { state: { ID, Name, Email } })} className="secondary-button">
            <span>📊</span>
            Student Dashboard
          </button>
        </div>

        {/* Footer */}
        <div className="booking-footer">
          <p>Crafted with ❤️ for the students</p>
        </div>
      </div>
    </div>
  )
}
