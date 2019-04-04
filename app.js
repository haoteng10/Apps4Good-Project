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


// Main GET route

app.get('/', (req, res) => {
  res.render("index");
});

// Fetch the start page

app.get('/start', (req, res) => {
  res.render("start");
});

// USER DATA POST ROUTE

var userData = {
  name: null,
  grade: -1
};

app.post('/start', (req,res) => {
  userData.name = req.body.player_name;
  userData.grade = req.body.player_grade;
  console.log(userData.name + " is playing the game.");
  res.redirect("/question");
});


// Fetch the question page
app.get("/question", (req, res) => {
  res.render("question_form");
});

// Question POST route 

var userQuestionResult = {
  question_id : null,
  question_answer: -1
};

app.post("/question", (req,res) => {
  // Get the data
  userQuestionResult.question_id = req.body.id;
  userQuestionResult.question_answer = req.body.answer;
  // Compare the data
  // Redirect to the result page
  res.redirect("/result");
});


// Fetch the result page
app.get("/result", (req, res) => {
  res.render("result");
});


// Node.js Application 
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Server has started!');
});