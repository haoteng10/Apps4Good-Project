var express = require('express');
var app = express();

var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require('path');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, 'public')));


var indexRoutes = require("./routes/index");
app.use("/", indexRoutes);


// Node.js Application 
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Server has started!');
});