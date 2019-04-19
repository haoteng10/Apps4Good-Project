var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");

// Main GET route

router.get("/", middleware.localSession, (req, res) => {
  res.render("index.ejs");
});

// Info GET route
router.get("/info", middleware.localSession, (req, res) => {
  res.render("information.ejs");
});

// Fetch the start page

router.get('/start', middleware.localSession, (req, res) => {
  res.render("start");
});

// USER DATA POST ROUTE


router.post('/start', (req,res) => {
  console.log("The player's name is " + req.body.player_name);
  console.log("The player's grade level is " + req.body.player_grade);
  if (req.body.player_name !== "" && req.body.player_grade != undefined){
    
    var userData = {
      name: req.body.player_name,
      grade: req.body.player_grade,
      scoreboard: {
        name: req.body.player_name, 
        score: 0,
        started: true
      },
      questions: [-1]
    };
    
    req.session.userData = userData;
    
    console.log("Session questions: " + req.session.userData.questions);
    
    console.log(req.session.userData.name + " is playing the game.");
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
            correctChoice: "1"
        },
        {
            id: 1,
            question: "Find the sum of the digits of 10^11 - 1?",
            selections: ["11", "9", "10", "12"],
            correctChoice: "11"
        }, 
        {
          	id: 2, 
          	question: "Find n. 27^8 = 81^N",
          	selections: ["N = 7", "N = 5", "N = 4", "N = 6"],
          	correctChoice: "N = 6"
        },
        {
            id: 3,
            question: "21y + 67 < 80",
            selections: ["Y = 2", "Y = 10", "Both of the above", "None of the above"],
            correctChoice: "None of the above"
        }, 
        
        {
        	id: 4, 
        	question: "Which gives the largest answer?", 
        	selections: ["5^3 + 2^8", "7^3 + 1^6", "8^2 + 4^4", "2^7 + 6^3"],
          correctChoice: "5^3 + 2^8"
        },
        
        {
        	id: 5, 
        	question: "Find the equation that is TRUE.", 
        	selections: ["-163 + 145 = 3^0", "(x^2) - 4x + 4 = 0 when x is 2", "99 + 56 - 87 = 66", "(x)(2)(x)(2)(x)(2) = x+8 when x is 1"],
          correctChoice: "(x^2) - 4x + 4 = 0 when x is 2"
        }

    ];


// Default Chosen Question
var chosenQuestion = question_datas[0];


// Question randomizer
function randomizer(passedArray){
    return Math.floor(Math.random() * passedArray.length);
}


// Question GET route (SHOW the USER a question)
router.get("/question", middleware.localSession, (req, res) => {
    
    if(req.session.userData.scoreboard.started == true){
        chosenQuestion = question_datas[randomizer(question_datas)];
        
        if(req.session.userData.questions.length > question_datas.length) { 
          res.render("congratulations");
          
        } else {
        
          while(req.session.userData.questions.includes(chosenQuestion.id)){
                  chosenQuestion = question_datas[randomizer(question_datas)];
              }  
          
  
          console.log(req.session.userData.questions.includes(chosenQuestion.id));
              
          console.log("The original array is " + req.session.userData.questions);
              
          req.session.userData.questions.push(chosenQuestion.id);
          console.log("User data now has: " + req.session.userData.questions);
          console.log("Chosen question id is " + chosenQuestion.id);
      
          res.render("question_form", {chosenQuestion: chosenQuestion});  
        }
        
    } else {
        res.redirect("/");
    }

  
});


var userQuestionResult = {
  question_id : null,
  question_answer: -1
};

// Question POST route (DATA created by USER)
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


// Result GET route (Fetch the result page)
router.get("/result", middleware.localSession, (req, res) => {
    var checks = compareAnswers(userQuestionResult.question_id, userQuestionResult.question_answer);
    
    var correctOrNot = "INCORRECT";
    
    if (checks) {
        correctOrNot = "CORRECT";
        req.session.userData.scoreboard.score++;
    } 
    
    res.render("result", {correctOrNot: correctOrNot});
});

module.exports = router;