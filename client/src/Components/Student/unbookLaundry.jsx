"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import "../Styles/unbookLaundry.css"
const url = import.meta.env.VITE_BASE_URL;


export default function LaundrySlots() {
  
  const location = useLocation()
  const { ID, Name, Email } = location.state || {}
  const [slots, setSlots] = useState([])
  const navigate = useNavigate()

  /* 1 ⟶ live clock (1 s so the countdown looks smooth) */
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  /* 2 ⟶ fetch helper */
  const fetchSlots = () =>
    axios
      .get(`${url}laundrySlots`, { params: { ID } })
      .then((r) => setSlots(r.data))
      .catch((e) => console.error("Error fetching laundry slots:", e))

  useEffect(() => {
    if (ID) fetchSlots()
  }, [ID])

  /* 3 ⟶ auto‑unbook any of *your* slots whose 30 min expired */
  useEffect(() => {
    if (!ID || slots.length === 0) return

    const finished = slots.filter((s) => {
      if (s.StudentID !== ID || !s.BookedAt) return false
      const start = new Date(s.BookedAt).getTime()
      return now - start >= 30 * 60 * 1000 // ≥ 30 min elapsed
    })

    if (finished.length === 0) return

    Promise.all(
      finished.map((s) =>
        axios.post("http://localhost:5000/unbookLaundry", {
          SlotID: s.SlotID,
          ID,
          Name,
          Email,
        }),
      ),
    )
      .then(fetchSlots)
      .catch((e) => console.error("Auto‑unbook error:", e))
  }, [slots, now, ID])

  /* 4 ⟶ what to show in the Action column */
  const renderAction = (slot) => {
    if (slot.Available === 1) {
      return (
        <button
          className="action-button book-button"
          onClick={() =>
            navigate("/laundryBook", {
              state: { SlotID: slot.SlotID, ID, Name, Email },
            })
          }
        >
          <span className="button-icon">📅</span>
          Book
        </button>
      )
    }

    if (slot.StudentID !== ID) {
      return (
        <span className="status-badge booked-badge">
          <span className="status-icon">🔒</span>
          Booked
        </span>
      )
    }

    // Slot is yours
    const start = slot.BookedAt ? new Date(slot.BookedAt).getTime() : null
    if (!start) {
      return (
        <span className="status-badge running-badge">
          <span className="status-icon">⚡</span>
          Machine running…
        </span>
      )
    }

    const diff = 30 * 60 * 1000 - (now - start)

    if (diff <= 0) {
      return (
        <span className="status-badge completed-badge">
          <span className="status-icon">✅</span>
          Completed
        </span>
      )
    }

    const m = Math.floor(diff / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    const formatted = `${m}:${s < 10 ? "0" : ""}${s}`

    return (
      <div className="running-slot">
        <span className="status-badge running-badge">
          <span className="status-icon">⚡</span>
          Running: <span className="countdown">{formatted}</span>
        </span>
        <button
          onClick={() =>
            axios
              .post(`${url}unbookLaundry`, {
                SlotID: slot.SlotID,
                ID,
              })
              .then(fetchSlots)
              .catch((e) => console.error("Unbook failed", e))
          }
          className="action-button unbook-button"
        >
          <span className="button-icon">🗑️</span>
          Unbook
        </button>
      </div>
    )
  }

  const getSlotStatus = (slot) => {
    if (slot.StudentID === ID) return "your-slot"
    if (slot.Available === 0) return "booked-slot"
    return "available-slot"
  }

  return (
    <div className="laundry-slots-page">
      <div className="slots-container">
        {/* Home Button */}
        <div className="home-button-container">
          <button className="home-button" onClick={() => navigate("/")}>
            <span>🏠</span>
            Go to Home Page
          </button>
        </div>

        {/* Header Section */}
        <div className="slots-header">
          <div className="logo-container">
            <div className="logo-icon">
              <span>👕</span>
            </div>
            <h1>Laundry Slots</h1>
          </div>
          <p className="tagline">Book your laundry time slots</p>
        </div>

        {/* User Info Card */}
        <div className="user-info-card">
          <div className="user-avatar">
            <span>{Name?.charAt(0) || "U"}</span>
          </div>
          <div className="user-details">
            <h2>Welcome, {Name}</h2>
            <div className="user-meta">
              <span className="user-id">ID: {ID}</span>
              <span className="user-email">{Email}</span>
            </div>
          </div>
        </div>

        {/* Slots Section */}
        <div className="slots-section">
          <div className="section-header">
            <h3>Available Time Slots</h3>
            <div className="slots-count">Total: {slots.length} slots</div>
          </div>

          {slots.length === 0 ? (
            <div className="no-slots-card">
              <div className="no-slots-icon">📭</div>
              <h3>No Slots Available</h3>
              <p>Please check back later for available laundry slots.</p>
            </div>
          ) : (
            <div className="slots-grid">
              {slots.map((slot) => (
                <div key={slot.SlotID} className={`slot-card ${getSlotStatus(slot)}`}>
                  <div className="slot-header">
                    <div className="slot-id">
                      <span className="slot-icon">🏷️</span>
                      Slot #{slot.SlotID}
                    </div>
                    <div className="slot-availability">
                      {slot.Available === 1 ? (
                        <span className="available-indicator">
                          <span className="indicator-dot available"></span>
                          Available
                        </span>
                      ) : (
                        <span className="available-indicator">
                          <span className="indicator-dot booked"></span>
                          Booked
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="slot-details">
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span className="detail-label">Date:</span>
                      <span className="detail-value">{slot.Date?.slice(0, 10)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🕐</span>
                      <span className="detail-label">Time:</span>
                      <span className="detail-value">
                        {slot.StartTime} - {slot.EndTime}
                      </span>
                    </div>
                  </div>

                  <div className="slot-action">{renderAction(slot)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="back-button-container">
          <button
            onClick={() =>
              navigate("/student", {
                state: { ID, Name, Email },
              })
            }
            className="back-button"
          >
            <span>←</span>
            Back to Student Dashboard
          </button>
        </div>

        {/* Footer */}
        <div className="slots-footer">
          <p>Crafted with ❤️ for the students</p>
        </div>
      </div>
    </div>
  )
}
