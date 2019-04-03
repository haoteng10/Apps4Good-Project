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


app.get('/', (req, res) => {
  res.render("index");
  //  res.send("This is sent");
});


app.get('/start', (req, res) => {
  res.render("start");
  //  res.send("This is sent");
});

app.get("/question", (req, res) => {
  res.render("question_form");
});

app.get("/result", (req, res) => {
  res.render("result");
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Server has started!');
});