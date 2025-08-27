// Load environment variables
require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const path = require("path");
const session = require("express-session");

const app = express();

// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Middleware
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.json()); // parse JSON payloads
app.use(session({secret: "djsdsd", resave: false, saveUninitialized: true}));//session manager

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ------------------------
   Routes
------------------------ */

// Home - show posts
app.get("/", (req, res) => {
  connection.query("SELECT * FROM posts LIMIT 10", (err, results) => {
    if (err) return res.status(500).send("Error retrieving posts: " + err);
    res.render("index.ejs", { posts: results });
  });
});

// Create new post
app.post("/newpost", (req, res) => {
  const sql = "INSERT INTO posts(content, postowner) VALUES (?, ?)";
  const values = [req.body.content, 2]; // static postowner for now

  connection.query(sql, values, (err) => {
    if (err) return res.status(500).send("Error storing post: " + err);
    res.redirect("/");
  });
});

// New user form
app.get("/newuser", (req, res) => {
  res.render("newuser.ejs");
});

// Handle new user
app.post("/newuser", (req, res) => {
  const { fullname, email, password } = req.body;
  const sql = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";

  connection.query(sql, [fullname, email, password], (err) => {
    if (err) return res.status(500).send("Error storing user: " + err);
    res.redirect("/users");
  });
});

// View all users
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).send("Error retrieving users: " + err);
    res.render("users.ejs", { users: results });
  });
});

// View posts with user info
app.get("/posts", (req, res) => {
  const sql = `
    SELECT p.postid, p.content, p.createdat, u.fullname
    FROM posts p
    JOIN users u ON p.postowner = u.userid
    ORDER BY p.createdat DESC
    LIMIT 10
  `;

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).send("Error retrieving posts: " + err);
    res.render("post.ejs", { posts: results });
  });
});

// Registration form (clients)
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Handle client registration
app.post("/register", (req, res) => {
  const { firstname, lastname, email, phone, password, yob, gender, country, city } = req.body;

  if (!firstname || !lastname || !email || !phone || !password || !yob || !gender) {
    return res.status(400).send("All required fields must be filled!");
  }

  const sql = `
    INSERT INTO client (firstname, lastname, email, phone, password, yob, gender, country, city)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [firstname, lastname, email, phone, password, yob, gender, country, city];

  connection.query(sql, values, (err) => {
    if (err) return res.status(500).send("Error registering client: " + err);
    res.redirect("/clients");
  });
});

// View all clients
app.get("/clients", (req, res) => {
  connection.query("SELECT * FROM client", (err, results) => {
    if (err) return res.status(500).send("Error retrieving clients: " + err);
    res.render("clients.ejs", { clients: results });
  });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  connection.query(
    `SELECT fullname,email,password FROM users WHERE email="${email}" AND password="${password}"`,
    (dberr, results) => {
      if (dberr) {
        return res.status(500).send("Error logging in: " + dberr);
      }
      console.log(results);

      if (results.length === 0) {
        return res.status(401).send("Invalid email or password");
      }

      // login successful
      req.session.user = results[0];//store user info in session cookie
      res.send("Login successful. Welcome " + results[0].fullname);
      // res.redirect("/users")
    }
  );
});

/* ------------------------
   404 Handler
------------------------ */
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

/* ------------------------
   Start Server
------------------------ */
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`✅ App running on http://127.0.0.1:${PORT}`));
