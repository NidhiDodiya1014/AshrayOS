const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/SeeGuestRequests", (req, res) => {
  const { StudentID } = req.query;

  if (!StudentID) {
    return res.status(400).json({ message: "StudentID is required" });
  }

  const sql = `SELECT RequestID, GuestName, GuestContact, VisitDate, Status FROM guestentryrequest WHERE StudentID = ? ORDER BY VisitDate DESC`;
  db.query(sql, [StudentID], (err, results) => {
    if (err) {
      console.error("Error fetching guest entry requests:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
