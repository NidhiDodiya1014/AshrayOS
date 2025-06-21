const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/complaint", (req, res) => {
  const { ID, Name, Email, Complaint } = req.body;

  if (!ID || !Name || !Email || !Complaint) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const quer = `INSERT INTO complaint (StudentID, Name, Email, Complaint) VALUES (?, ?, ?, ?)`;

  db.query(quer, [ID, Name, Email, Complaint], (err, result) => {
    if (err) {
      console.error("Error inserting complaint:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaintID: result.insertId,
    });
  });
});

module.exports = router;
