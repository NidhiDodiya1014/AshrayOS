const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/laundrySlots", (req, res) => {
  db.query(`select * from laundryslot`, (err, result) => {
    if (err) {
      console.error("Fetching error:", err);
      return res.status(500).json({ success: false, error: "Database Error" });
    }

    // console.log(result);
    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(401).json({ success: false, message: "Database error" });
    }
  });
});

module.exports = router;
