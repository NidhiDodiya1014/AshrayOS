const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/wardenData", (req, res) => {
  db.query("SELECT * FROM warden", (err, results) => {
    if (err) return res.status(500).send("Error fetching wardens");
    console.log(results)
    res.send({ wardens: results });
  });
});
module.exports = router;
