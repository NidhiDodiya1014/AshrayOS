const express = require("express");
const router = express.Router();
const db = require("../db");

router.delete("/removeWarden", (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).send("Warden ID is required");
  }

  const sql = "DELETE FROM warden WHERE WardenID = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting warden:", err);
      res.status(500).send("Database error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Warden not found");
    } else {
      res.send("Warden removed successfully");
    }
  });
});



module.exports=router