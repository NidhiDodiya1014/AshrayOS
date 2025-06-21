const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /roomChangeRequest
router.post("/roomChangeRequest", (req, res) => {
  const { StudentID, CurrentRoom, DesiredRoom, Reason } = req.body;
  console.log(req.body)
  if (!StudentID || !CurrentRoom || !DesiredRoom) {
    return res.status(400).json({ message: "All fields are required" });
  }
  console.log({
    StudentID,
    CurrentRoom,
    DesiredRoom,
    Reason
  });

  /** 1) Verify the student really occupies CurrentRoom */
  const roomCheckSql = "SELECT RoomNumber FROM room WHERE StudentID = ?";
  db.query(roomCheckSql, [StudentID], (err, rows) => {
    if (err) {
      console.error("DB error while checking room:", err);
      console.log('the room is not 1 theree')
      return res.status(500).json({ message: "Internal server error" });
    }

    // No room found or mismatch
    if (rows.length === 0 || rows[0].RoomNumber !== CurrentRoom) {
      console.log(rows, CurrentRoom)
      return res.status(400).json({
        message: `Student ${StudentID} is not allocated room ${CurrentRoom}`,
      });
    }
    console.log('the room is theree')
    /** 2) Insert the change request */
    const insertSql = `
      INSERT INTO roomchangerequest
        (StudentID, CurrentRoom, DesiredRoom, Status, Reason, RequestDate)
      VALUES (?, ?, ?, 'Pending', ?, CURDATE())
    `;

    db.query(
      insertSql,
      [StudentID, CurrentRoom, DesiredRoom, Reason],
      (err2) => {
        if (err2) {
          console.error("Error inserting room change request:", err2);
          return res.status(500).json({ message: "Internal server error" });
        }
        return res
          .status(200)
          .json({ message: "Room change request submitted successfully" });
      }
    );
  });
});

module.exports = router;
