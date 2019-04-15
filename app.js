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
    secret: 'express app is the best',
    resave: true,
    saveUninitialized: true
}));

var indexRoutes = require("./routes/index");
app.use("/", indexRoutes);


var scoreboard = {
    name: "Guest", 
    score: 0
    };
    
app.locals = {
    scoreboard: scoreboard
};

// Node.js Application 
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Server has started!');
});

module.exports.scoreboard = app.locals.scoreboard;