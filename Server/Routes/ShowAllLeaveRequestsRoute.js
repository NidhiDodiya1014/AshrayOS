const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/leaveRequests", (req, res) => {
  const  {StudentID}  = req.query;
  // console.log(StudentID)

  const sql = `SELECT FromDate, ToDate, Reason, Status FROM leaverequest WHERE StudentID = ? ORDER BY FromDate DESC`;

  db.query(sql, [StudentID], (err, results) => {
    if (err) {
      console.error("Error fetching leave requests:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    // console.log(results)
    res.status(200).json(results);
  });
});

module.exports=router
