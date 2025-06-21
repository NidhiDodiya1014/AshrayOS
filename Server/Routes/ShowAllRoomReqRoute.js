const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/showAllRoomReq", (req, res) => {
  const { ID } = req.query;
  console.log(ID);
  db.query(
    `select * from roomchangerequest where StudentID=?`,[ID],
    (err, result) => {
      if (err) {
        console.log("error in finding the room for this ID");
        res.status(500).json({ message: "Database error" });
      }
      else if (result.length > 0) {
        res.send(result);
      } else {
          res.status(500).json({ message: "Empty response found from database" });
      }
    }
  );
});

module.exports = router;
