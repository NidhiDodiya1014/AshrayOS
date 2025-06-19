import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import StudentDashboard from "./Components/StudentDashboard";
import WardenDashboard from "./Components/WardenDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import AddWarden from "./Components/AddWarden.jsx";
import RoomChange from "./Components/RoomChange.jsx"
import ShowAllStudentInfo from "./Components/showAllStudentInfo.jsx"

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
        </Routes>
    </Router>
  );
}

export default App;
