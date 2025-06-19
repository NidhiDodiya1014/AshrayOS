import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function StudentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { Name, ID, Email } = location.state || {};

  // 🛡️ Redirect to login if no state (user came directly to this page)
  // useEffect(() => {
  //   if (!location.state) {
  //     navigate("/");
  //   }
  // }, [location.state, navigate]);

  return (
    <div className="student-dashboard">
      <h1 style={{ color: "white" }}>
        Welcome to the Student Dashboard {Name}
      </h1>
      <p style={{ color: "white" }}>
        Here you can manage your room and services.
      </p>
      <div className="student-info">
        <h2 style={{ color: "white" }}>Your Information</h2>
        <p style={{ color: "white" }}>
          <strong>Name:</strong> {Name}
        </p>
        <p style={{ color: "white" }}>
          <strong>ID:</strong> {ID}
        </p>
        <p style={{ color: "white" }}>
          <strong>Email:</strong> {Email}
        </p>
      </div>
      <br />

      <button
        type="button"
        onClick={() => navigate("/showAllStudentInfo", { state: { ID } })}
      >
        See all details
      </button>

      <br />
      <br />
      <button
        onClick={() => {
          // console.log("hi");
          navigate("/roomChange");
        }}
      >
      Request for room change
      </button>
      <br />
      {/* <form onClick={() => navigate("/showAllStudentInfo", (state = { ID }))}>
        <button type="submit">Request for leave</button>
      </form> */}
      <br />
      <br />
      <button>Complaint</button>
      <br />
      <br />
      <button>Laundry slot booking</button>
      <br />
      <br />
      <button>Guest entry request</button>
      <br />
      <br />
    </div>
  );
}
