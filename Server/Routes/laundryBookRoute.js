// routes/laundry.js  (or wherever this lives)
const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * POST /laundryBook
 * Body: { SlotID, ID }   // ID = StudentID
 */
router.post("/laundryBook", (req, res) => {
  const { SlotID, ID } = req.body;

  if (!SlotID || !ID) {
    return res
      .status(400)
      .json({ success: false, message: "SlotID and ID are required" });
  }

  /** 1️⃣  Book the slot and stamp BookedAt = NOW() */
  const sql = `
    UPDATE laundryslot
    SET StudentID = ?, Available = 0, BookedAt = NOW()
    WHERE SlotID = ? AND Available = 1
  `;

  db.query(sql, [ID, SlotID], (err, result) => {
    if (err) {
      console.error("DB error while booking:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }

    if (result.affectedRows === 0) {
      // Slot was already booked or doesn’t exist
      return res.status(400).json({
        success: false,
        message: "Slot already booked or invalid SlotID",
      });
    }

    /** 2️⃣  Return the fresh row so the frontend has BookedAt */
    db.query(
      "SELECT SlotID, BookedAt FROM laundryslot WHERE SlotID = ?",
      [SlotID],
      (err2, rows) => {
        if (err2) {
          console.error("DB error while fetching after booking:", err2);
          return res
            .status(500)
            .json({ success: false, error: "Database error" });
        }

        res.json({
          success: true,
          message: "Slot booked successfully",
          data: rows[0], // contains SlotID & BookedAt
        });
      }
    );
  });
});

module.exports = router;
