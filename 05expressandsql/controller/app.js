var express = require("express");
var bodyParser = require("body-parser");
var userDB = require("../model/user");
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser); //attach body-parser middleware
app.use(bodyParser.json()); //parse json data

//GET /user
app.get("/user", function (req, res) {
  userDB.getUsers(function (err, results) {
    if (err) {
      console.log(err);
      res.status(500);
      res.type("json");
      res.send(`{"Message":"Retrieval failed"}`);
    } else {
      res.status(200);
      res.type("json");
      res.send(results);
    }
  });
});

//GET /user/:userid
app.get("/user/:userid", function (req, res) {
  var userid = req.params.userid;
  userDB.get1User(userid, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500);
      res.type("json");
      res.send(`{"Message":"Retrieval failed"}`);
    } else {
      res.status(200);
      res.type("json");
      res.send(results);
    }
  });
});

//POST /user
app.post("/user", function (req, res) {
  //retrieve the body params containing user details
  var username = req.body.username;
  var email = req.body.email;
  var role = req.body.role;
  var password = req.body.password;

  userDB.insertUser(username, email, role, password, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500);
      res.type("json");
      res.send(`{"Message":"Insertion failed"}`);
    } else {
      console.log(results);
      res.status(200);
      res.type("json");
      res.send(`{"Message":"${results.affectedRows} row(s) inserted"}`);
    }
  });
});

//PUT /user/:userid
app.put("/user/:userid", function (req, res) {
  var userid = req.params.userid;
  var email = req.body.email;
  var password = req.body.password;

  userDB.updateUser(email, password, userid, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500);
      res.type("json");
      res.send(`{"Message":"Update failed"}`);
    } else {
      console.log(results);
      res.status(200);
      res.type("json");
      res.send(`{"Message":"${results.affectedRows} row(s) updated"}`);
    }
  });
});

//DELETE /user/:userid
app.delete("/user/:userid", function (req, res) {
  var userid = req.params.userid;
  userDB.deleteUser(userid, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500);
      res.type("json");
      res.send(`{"Message":"Delete failed"}`);
    } else {
      res.status(200);
      res.type("json");
      res.send(`{"Message":"${results.affectedRows} row(s) deleted"}`);
    }
  });
});

module.exports = app;
