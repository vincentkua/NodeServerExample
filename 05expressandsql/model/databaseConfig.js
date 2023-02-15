var mysql = require("mysql");

var dbconnect = {
  getConnection: function () {
    var conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "yourpassword",
      database: "furniture",
    });
    return conn;
  },
};
module.exports = dbconnect;
