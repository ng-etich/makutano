// Load environment variables
require("dotenv").config();
const mysql = require("mysql");

// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "xy", // change if needed
  port: process.env.DB_PORT || 3306,
});

// SQL for creating client table
const createClientTable = `
CREATE TABLE IF NOT EXISTS client (
  client_id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  yob YEAR NOT NULL,
  gender ENUM('Male', 'Female', 'Other') NOT NULL,
  country VARCHAR(100),
  city VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// Run query
connection.query(createClientTable, (err, results) => {
  if (err) {
    console.error("❌ Error creating table:", err);
    process.exit(1);
  }
  console.log("✅ Client table created or already exists!");
  connection.end();
});
