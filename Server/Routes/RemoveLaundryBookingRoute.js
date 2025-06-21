const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/unbookLaundry", (req, res) => {
  const { SlotID } = req.body;

  if (!SlotID) {
    return res.status(400).json({ message: "Missing SlotID" });
  }

  const sql = `
    UPDATE laundryslot
    SET StudentID = NULL, Available = 1, BookedAt = NULL
    WHERE SlotID = ?
  `;

  db.query(sql, [SlotID], (err, result) => {
    if (err) {
      console.error("Error unbooking:", err);
      return res.status(500).json({ message: "DB error during unbooking" });
    }

    res.json({ success: true, message: "Slot unbooked" });
  });
});


module.exports = router;
