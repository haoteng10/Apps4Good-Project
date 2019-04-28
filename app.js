var express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');


var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require('path');

var port = process.env.PORT || 3000;
var ip = process.env.IP || "0.0.0.0";

//var url = process.env.DATABASEURL || "mongodb://localhost/math-success";
var url = "mongodb://admin:8Hdm6fxQfLr7K42@ds053305.mlab.com:53305/math-success";

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'express app is the best',
    resave: true,
    saveUninitialized: true
}));

var indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

// Node.js Application 
app.listen(port, ip, () => {
  console.log('Server has started!');
});