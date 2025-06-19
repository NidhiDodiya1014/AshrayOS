import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ShowAllStudentInfo() {
  const location = useLocation();
  const { ID } = location.state || {};

  const [studentID, setStudentID] = useState(ID || '');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [roomID, setRoomID] = useState('');

  useEffect(() => {
    if (!ID) return; // prevent call if ID is not available

    axios
      .get('http://localhost:5000/getStudentInfo', {
        params: { ID },
      })
      .then((response) => {
        const data = response.data;

        if (data.length > 0) {
          const student = data[0];
          setStudentID(student.StudentID);
          setGender(student.Gender);
          setName(student.Name);
          setEmail(student.Email);
          setContact(student.ContactNumber);
          setRoomID(student.RoomID);
        } else {
          console.warn("No student found with this ID.");
        }
      })
      .catch((error) => {
        console.error("Error fetching student info:", error);
      });
  }, [ID]);

  return (
    <div className="show-all-student-info" style={{ color: "white" }}>
      <h1>All Student Information</h1>
      {studentID ? (
        <div>
          <p><strong>Student ID:</strong> {studentID}</p>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Contact:</strong> {contact}</p>
          <p><strong>Gender:</strong> {gender}</p>
          <p><strong>Room ID:</strong> {roomID}</p>
        </div>
      ) : (
        <p>No student information available. Please return to the dashboard.</p>
      )}
    </div>
  );
}
