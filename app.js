// import Express Module, bodyParser and database connection
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/database.js");

//storing express on a variable
const app = express();

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

//Route GET request of root directory to home.html file
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/home.html");
});

// Send Message API
app.post("/form.html", function (req, res) {
  var senderNumber = req.body.sno;
  var receiverNumber = req.body.rno;
  var message = req.body.message;

  var sql = `INSERT INTO messageinfo(source_no,dest_no,message) values(${senderNumber},${receiverNumber},'${message}')`;
  db.query(sql, function (err, rows, fields) {
    if (err) {
      res.sendFile(__dirname + "/public/failure.html");
    } else {
      res.sendFile(__dirname + "/public/success.html");
    }
  });
});

// View Message API
app.post("/view", function (req, res) {
  const receiverNumber = req.body.yourphone;
  const senderNumber = req.body.senderphone;

  var query = `SELECT message,source_no,dt FROM messageinfo WHERE source_no=${senderNumber} AND dest_no=${receiverNumber} ORDER BY dt DESC`;
  db.query(query, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.sendFile(__dirname + "/public/failure.html");
    } else {
      var i = 0;
      res.setHeader("Content-Type", "text/html");
      const messageArray = [];
      const timeDateArray = [];
      const sourceNumber = result[0].source_no;
      res.write("<h4>From: " + sourceNumber + "</h4>");
      while (i < result.length) {
        messageArray.push(result[i].message);
        timeDateArray.push(result[i].dt);

        res.write("<p>Message: " + messageArray[i] + "<p>");
        res.write("<p>" + timeDateArray[i] + "<p>");
        res.write("<hr>");
        i++;
      }
      res.send();
    }
  });
});

//listening on port
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
