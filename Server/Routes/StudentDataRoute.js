const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/studentData", (req, res) => {
  const query = "SELECT * FROM Student";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Student data fetch error:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }

    console.log("Fetched students:", result);
    res.json({ success: true, user: result });
  });
});

module.exports = router;
