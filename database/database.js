// Database Connection

const mysql = require("mysql");
// Creating connection to Database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "messagedb",
  port: "3306",
});

con.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to Database");
  }
});

module.exports = con;
