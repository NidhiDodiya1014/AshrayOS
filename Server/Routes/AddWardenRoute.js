const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/addWarden", (req, res) => {
  const WardenID = req.body.id;
  const Name = req.body.name;
  const Email = req.body.email;
  const Password = req.body.password;
  const ContactNumber = req.body.contact;

  const query = `
    INSERT INTO warden (WardenID, Name, Email, Password, ContactNumber)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [WardenID, Name, Email, Password, ContactNumber],
    (err, result) => {
      if (err) {
        console.error("Error inserting warden:", err);
        res.status(500).send("Database error");
      } else {
        res.send("Warden added successfully");
      }
    }
  );
});

module.exports = router;
