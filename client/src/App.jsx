import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import StudentDashboard from "./Components/Student/StudentDashboard";
import WardenDashboard from "./Components/Warden/WardenDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AddWarden from "./Components/Admin/AddWarden.jsx";
import RoomChange from "./Components/Student/RoomChange.jsx";
import ShowAllStudentInfo from "./Components/Admin/showAllStudentInfo.jsx"
import LaundrySlots from "./Components/Student/laundrySlots.jsx"; 
import LaundryBooking from "./Components/Student/laundryBooking.jsx";
import UnbookLaundry from "./Components/Student/unbookLaundry.jsx";   

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
        </Routes>
    </Router>
  );
}

export default App;
