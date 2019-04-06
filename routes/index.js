var express = require("express");
var router  = express.Router();

// Main GET route

router.get("/", (req, res) => {
  res.render("index.ejs");
});

// Fetch the start page

router.get('/start', (req, res) => {
  res.render("start");
});

// USER DATA POST ROUTE

var userData = {
  name: null,
  grade: -1
};

router.post('/start', (req,res) => {
  console.log("The player's name is " + req.body.player_name);
  console.log("The player's grade level is " + req.body.player_grade);
  if (req.body.player_name !== "" && req.body.player_grade != undefined){
    userData.name = req.body.player_name;
    userData.grade = req.body.player_grade;
    console.log(userData.name + " is playing the game.");
    res.redirect("/question");
  } else {
    res.redirect("/start");
  }

});


// Default DATA

var question_datas = [
        {
            id: 0,
            question: "Use four 6’s and any math signs to make 7. How many ‘+’ signs did you use?",
            selections: ["0", "1", "2", "3"],
            image: "https://www.google.com/logos/doodles/2019/hedwig-kohns-132nd-birthday-6626820043571200.4-l.png",
            correctChoice: "1"
        },
        {
            id: 1,
            question: "Find the sum of the digits of 10^11 - 1?",
            selections: ["11", "9", "10", "12"],
            correctChoice: "11"
        }
    ];

var chosenQuestion = question_datas[0];


// Question randomizer
function randomizer(passedArray){
    return Math.floor(Math.random() * passedArray.length);
}


// Question GET route (SHOW the USER a question)
router.get("/question", (req, res) => {
    chosenQuestion = question_datas[randomizer(question_datas)];
    res.render("question_form", {chosenQuestion: chosenQuestion});
});

// Question POST route (DATA created by USER)

var userQuestionResult = {
  question_id : null,
  question_answer: -1
};

router.post("/question", (req,res) => {
  // Get the data
  userQuestionResult.question_id = chosenQuestion.id;
  userQuestionResult.question_answer = req.body.answer;
  // Compare the data
  // Redirect to the result page
  console.log("The player chose the answer: " + userQuestionResult.question_answer);
  res.redirect("/result");
});


// Answer Comparison
function compareAnswers(id, userAnswer){
    var correctQuestionData = question_datas[id];
    if (correctQuestionData.correctChoice == userAnswer) {
        console.log("The player chose the correct answer.");
        return true;
    } else {
        console.log("The player chose the wrong answer. The correct answer is " + correctQuestionData.correctChoice);
    }
    return false;
}


// Fetch the result page
router.get("/result", (req, res) => {
    var checks = compareAnswers(userQuestionResult.question_id, userQuestionResult.question_answer);
    
    var correctOrNot = "Incorrect";
    
    if (checks) {
        correctOrNot = "Correct";
    } 
    
    res.render("result", {correctOrNot: correctOrNot});
});

module.exports = router;