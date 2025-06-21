const express = require("express");
const router = express.Router();
const db = require("../db");

// Helper to convert to YYYY-MM-DD
function formatDate(dateString) {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

router.post("/leaveRequest", (req, res) => {
  let { StudentID, FromDate, ToDate, Reason } = req.body;

  console.log("LeaveRequest backend", { StudentID, FromDate, ToDate, Reason });

  if (!StudentID || !FromDate || !ToDate || !Reason) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // ✅ Convert to MySQL-friendly format
  FromDate = formatDate(FromDate);
  ToDate = formatDate(ToDate);

  const sql = `
    INSERT INTO leaverequest (StudentID, FromDate, ToDate, Reason, Status)
    VALUES (?, ?, ?, ?, 'Pending')
  `;

  db.query(sql, [StudentID, FromDate, ToDate, Reason], (err, result) => {
    if (err) {
      console.error("Error inserting leave request:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.status(200).json({ message: "Leave request submitted successfully." });
  });
});

module.exports = router;
