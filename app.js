const express = require("express");
const app = express();
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kali",
  database: "chealsea",
  port: 3306,
});

// routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/users", (req, res) => {
  console.log(req.query.id);
  console.log(req.query.person);
  connection.query("SELECT * FROM users", (dberr, results) => {
    if (dberr) {
      return res.status(500).send("Error retrieving users" + dberr);
    }
    res.render("users.ejs", { users: results });
  });
});
app.get("/posts", (req, res) => {});
// 404
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
// Start the app
app.listen(3003, () => console.log("App running on http://127.0.0.1:3003"));
//design a databsase for eldohub lms that will have the following tablses students instructors courses and learning resources on dbeaver create a db ,create tables and insert sample data