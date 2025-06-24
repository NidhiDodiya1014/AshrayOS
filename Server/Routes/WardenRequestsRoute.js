// 📁 routes/wardenRequests.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// ─────────────── GET ROUTES ─────────────── //
router.get("/roomChangeRequests", (req, res) => {
  console.log('got the router well2')
  db.query("SELECT * FROM roomchangerequest", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ requests: result });
  });
});

router.get("/leaveRequests1", (req, res) => {
  console.log('param-batak');
  db.query("SELECT * FROM leaverequest", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ requests: result });
  });
});

router.get("/complaints", (req, res) => {
  console.log('got the router well3')
  db.query("SELECT * FROM complaint", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ complaints: result });
  });
});

router.get("/guestEntryRequests", (req, res) => {
  db.query("SELECT * FROM guestentryrequest", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ requests: result });
  });
});

// ─────────────── PUT ROUTES ─────────────── //

router.put("/updateRoomChangeStatus", (req, res) => {
  const { id, status } = req.body;
  if (!id || !status) return res.status(400).json({ message: "Missing ID or status" });
  db.query(
    "UPDATE roomchangerequest SET Status = ? WHERE RequestID = ?",
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Room change status updated" });
    }
  );
});

router.put("/updateLeaveStatus", (req, res) => {
  const { id, status } = req.body;
  if (!id || !status) return res.status(400).json({ message: "Missing ID or status" });
  db.query(
    "UPDATE leaverequest SET Status = ? WHERE RequestID = ?",
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Leave request status updated" });
    }
  );
});

router.put("/updateComplaintStatus", (req, res) => {
  const { id, status } = req.body;
  if (!id || !status) return res.status(400).json({ message: "Missing ID or status" });
  db.query(
    "UPDATE complaint SET Status = ? WHERE ComplaintID = ?",
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Complaint status updated" });
    }
  );
});

router.put("/updateGuestEntryStatus", (req, res) => {
  const { id, status } = req.body;
  if (!id || !status) return res.status(400).json({ message: "Missing ID or status" });
  db.query(
    "UPDATE guestentryrequest SET Status = ? WHERE RequestID = ?",
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Guest entry status updated" });
    }
  );
});

module.exports = router;