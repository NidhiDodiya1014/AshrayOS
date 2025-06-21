const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/showAllComplaints", (req, res) => {
  const { ID } = req.query;

  if (!ID) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  const query = `SELECT * FROM complaint WHERE StudentID = ?`;

  db.query(query, [ID], (err, result) => {
    if (err) {
      console.error("Error extracting complaints:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(200).json({ message: "No complaints found for this student" });
    }
  });
});

module.exports = router;
