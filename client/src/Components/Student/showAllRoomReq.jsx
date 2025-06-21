import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function ShowAllRoomReq() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { ID, Name, Email } = location.state || {};

  useEffect(() => {
    axios
      .get("http://localhost:5000/showAllRoomReq", { params: { ID } })
      .then((response) => {
        setRequests(response.data);
        // console.log("Fetched requests:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, []);

  return (
    <div className="room-requests-container" style={{ color: "white" }}>
      <h1>All Room Change Requests</h1>
      <table className="requests-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Current Room</th>
            <th>Desired Room</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr
              key={
                request.RequestID ||
                `${request.StudentID}-${request.CurrentRoom}-${request.DesiredRoom}`
              }
            >
              <td>{request.StudentID}</td>
              <td>{request.CurrentRoom}</td>
              <td>{request.DesiredRoom}</td>
              <td>{request.Reason}</td>
              <td>{request.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => navigate("/roomChange", { state: { ID, Name, Email } })}
        className="nav-button primary"
      >
        <span>📊</span>
        <span>Go to Room Change dashboard</span>
      </button>
    </div>
  );
}
