import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import StudentDashboard from "./Components/Student/StudentDashboard";
import WardenDashboard from "./Components/Warden/WardenDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AddWarden from "./Components/Admin/AddWarden.jsx";
import RoomChange from "./Components/Student/RoomChange.jsx";
import ShowAllStudentInfo from "./Components/Student/showAllStudentInfo.jsx";
import LaundrySlots from "./Components/Student/laundrySlots.jsx";
import LaundryBooking from "./Components/Student/laundryBooking.jsx";
import UnbookLaundry from "./Components/Student/unbookLaundry.jsx";
import ComplaintForm from "./Components/Student/complaintForm.jsx";
import ShowAllComplaints from "./Components/Student/showAllComplaints.jsx";
import LeaveRequest from "./Components/Student/leaveRequest.jsx";
import ShowAllLeaveReq from "./Components/Student/showAllLeaveReq.jsx";
import ShowAllRoomReq from "./Components/Student/showAllRoomReq.jsx";
import GuestVisitRequest from "./Components/Student/GuestVisitRequest.jsx";
import SeeVisitRequests from "./Components/Student/SeeVisitRequests.jsx";
import ShowAllStudents from "./Components/Admin/studentsDataAll.jsx";
import ManageRequests from "./Components/Warden/ManageRequests.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/warden" element={<WardenDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/addWarden" element={<AddWarden />} />
        <Route path="/roomChange" element={<RoomChange />} />
        <Route path="/showAllStudentInfo" element={<ShowAllStudentInfo />} />
        <Route path="/laundrySlots" element={<LaundrySlots />} />
        <Route path="/laundryBook" element={<LaundryBooking />} />
        <Route path="/unbookLaundry" element={<UnbookLaundry />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/showAllComplaints" element={<ShowAllComplaints />} />
        <Route path="/leaveRequest" element={<LeaveRequest />} />
        <Route path="/showAllLeaveReq" element={<ShowAllLeaveReq />} />
        <Route path="/showAllRoomReq" element={<ShowAllRoomReq />} />
        <Route path="/guestEntry" element={<GuestVisitRequest />} />
        <Route path="/seeVisitRequests" element={<SeeVisitRequests />} />
        <Route path="/studentsDataAll" element={<ShowAllStudents />} />
        <Route path="/manageRequests" element={<ManageRequests />} />
      </Routes>
    </Router>
  );
}

export default App;
