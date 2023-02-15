var app = require("./controller/app");
var host = "localhost";
var port = 8081;
app.listen(port, host, function () {
  console.log(`Server started and accessible via http://${host}:${port}/`);
});
