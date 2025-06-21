const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/guestVisitRequest", (req, res) => {
  const { StudentID, GuestName, GuestIDProof, VisitDate } = req.body;
    console.log({StudentID, GuestName, GuestIDProof, VisitDate})
  if (!StudentID || !GuestName || !GuestIDProof || !VisitDate) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = `INSERT INTO guestentryrequest (StudentID, GuestName, GuestContact, VisitDate)VALUES (?, ?, ?, ?)`;

  db.query(sql, [StudentID, GuestName, GuestIDProof, VisitDate], (err) => {
    if (err) {
      console.error("Error inserting guest visit request:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "Guest visit request submitted." });
  });
});

module.exports = router;
