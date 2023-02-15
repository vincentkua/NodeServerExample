var express = require("express");
var serveStatic = require("serve-static");
var app = express();
var port = 3000;
var hostname = "localhost";
// app.use(serveStatic(__dirname + "/public")); //apply middleware with app.use

app.use(function (req, res, next) {
  //create our custom middleware
  console.log(req.method);
  console.log(req.url);
  console.log(req.path);
  console.log(req.query.id);

  res.status(200);
  res.type(".html");
  res.end("<html><body>Using response object!!</body></html>");
  //res.redirect("https://www.sp.edu.sg");
  
  //next();
});

app.listen(port, () => {
  console.log(`Server started and accessible via http://${hostname}:${port}/`);
});
