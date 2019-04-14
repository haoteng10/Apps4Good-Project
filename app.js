var express = require('express');
var app = express();
var session = require('express-session');


var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require('path');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  'secret': 'express app is the best'
}));

var indexRoutes = require("./routes/index");
app.use("/", indexRoutes);


// Node.js Application 
app.listen(3000, () => {
  console.log('Server has started!');
});