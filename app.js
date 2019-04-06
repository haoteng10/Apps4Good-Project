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


//Require routes
var indexRoutes = require("./routes/index");

// Use routes
app.use("/", indexRoutes);


// Node.js Application 
app.listen(3000, () => {
  console.log('Server has started!');
  console.log('https://Apps4Good-Project-haoteng10210271.codeanyapp.com');
});