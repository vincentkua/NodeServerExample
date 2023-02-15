var dbConfig = require("./databaseConfig");
var db = {
  getUsers: function (callback) {
    var dbConn = dbConfig.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        return callback(err, null);
      } else {
        var sql = "select * from user";

        dbConn.query(sql, [], function (err, results) {
          dbConn.end();
          return callback(err, results);
        });
      }
    });
  },
  get1User: function (userid, callback) {
    var dbConn = dbConfig.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        return callback(err, null);
      } else {
        var sql = "select * from user where userid=?";
        dbConn.query(sql, [userid], function (err, results) {
          dbConn.end();
          return callback(err, results);
        });
      }
    });
  },
  insertUser: function (username, email, role, password, callback) {
    var dbConn = dbConfig.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        return callback(err, null);
      } else {
        var sql =
          "insert into user(username,email,role,password) values(?,?,?,?)";
        dbConn.query(
          sql,
          [username, email, role, password],
          function (err, results) {
            dbConn.end();
            return callback(err, results);
          }
        );
      }
    });
  },
  updateUser: function (email, password, userid, callback) {
    var dbConn = dbConfig.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        return callback(err, null);
      } else {
        var sql = "update user set email=?,password=? where userid=?";
        dbConn.query(sql, [email, password, userid], function (err, results) {
          dbConn.end();
          return callback(err, results);
        });
      }
    });
  },
  deleteUser: function (userid, callback) {
    var dbConn = dbConfig.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        return callback(err, null);
      } else {
        var sql = "delete from user where userid=?";
        dbConn.query(sql, [userid], function (err, results) {
          dbConn.end();
          return callback(err, results);
        });
      }
    });
  },
};

module.exports = db;
