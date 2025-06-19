const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.NAME,
  port: process.env.PORT,
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection error:", err);
  } else {
    console.log("✅ Connected to MySQL DB");
  }
});

module.exports = db;
