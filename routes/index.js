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
  console.log(req.body.player_name);
  console.log(req.body.player_grade);
  if (req.body.player_name !== "" && req.body.player_grade != undefined){
    userData.name = req.body.player_name;
    userData.grade = req.body.player_grade;
    console.log(userData.name + " is playing the game.");
    res.redirect("/question");
  } else {
    res.redirect("/start");
  }

});


var question_datas = [
        {
            id: 0,
            question: "Use four 6’s and any math signs to make 7. How many ‘+’ signs did you use?",
            selections: ["0", "1", "2", "3"],
            correctChoice: "1"
        }
    ];

var chosenQuestion = question_datas[0];

// Question GET route (SHOW the USER a question)
router.get("/question", (req, res) => {
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
  console.log("Here is the result: " + userQuestionResult.question_answer);
  res.redirect("/result");
});


// Answer Comparison
function compareAnswers(id, userAnswer){
    var correctQuestionData = question_datas[id];
    if (correctQuestionData.correctChoice == userAnswer) {
        return true;
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