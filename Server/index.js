// server/server.js
const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");
const fs = require("fs");

const loginRoute = require("./Routes/LoginRoute");
const StudentDataRoute = require("./Routes/StudentDataRoute");
const AddWardenRoute = require("./Routes/AddWardenRoute");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
const routesPath = path.join(__dirname, "Routes");

fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith("Route.js")) {
    const route = require(path.join(routesPath, file));
    app.use("/", route); 
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
