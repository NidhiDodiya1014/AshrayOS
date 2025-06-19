const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login", (req, res) => {
  const { id, password, role } = req.body;
  // console.log(id, password, role)
  let table = "";
  if (role === "student") table = "Student";
  else if (role === "warden") table = "Warden";
  else table = "Admin";

  const query = `SELECT * FROM ${table} WHERE ${table}ID = ? AND password = ? LIMIT 1`;

  db.query(query, [id, password], (err, result) => {
    if (err) {
      console.error("Login error:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }

    // console.log(result);
    if (result.length > 0) {
      res.json({ success: true, user: result[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    
  });
});

module.exports=router