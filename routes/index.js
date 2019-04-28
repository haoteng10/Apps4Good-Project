var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
const ejsLint = require('ejs-lint');

var Question = require('../models/Question');

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
        started: true,
        checks: null
      },
      questions: []
    };
    
    req.session.userData = userData;
    
    console.log("Session questions: " + req.session.userData.questions);
    
    console.log(req.session.userData.name + " is playing the game.");
    res.redirect("question");
  } else {
    res.redirect("start");
  }

});

function isIncludes(req, inputQuestion){
  var value = false;
  req.session.userData.questions.forEach(function(question){
    if (question._id == inputQuestion._id){
      console.log("Question ID is " + question._id);
      console.log("Input Question ID is " + inputQuestion._id);
      value = true;
      }
    
  });
  
  return value;
}

// Question GET route (SHOW the USER a question)
router.get("/question", middleware.localSession, (req, res) => {
  
    
    if(req.session.userData.scoreboard.started == true){
      
        // Retrieve Data from MongoDB
        
        Question.find().then(function(data){
          
          var chosenQuestion = data[middleware.randomizer(data)];
        
          if(req.session.userData.questions.length >= data.length) { 
            res.render("congratulations");
            
          } else {
          
            while(isIncludes(req,chosenQuestion)){
                  console.log("While loop has started");
                  chosenQuestion = data[middleware.randomizer(data)];
                } 
    
            console.log(req.session.userData.questions.includes(chosenQuestion));
                
            console.log("The original array is " + req.session.userData.questions);
                
            req.session.userData.questions.push(chosenQuestion);
            console.log("User data now has: " + req.session.userData.questions);
            console.log("Chosen question is " + chosenQuestion._id);
        
            res.render("question_form", {chosenQuestion: chosenQuestion}); 
            
          }
        });
    
        
    } else {
        res.redirect("/");
    }

  
});

// Question EDIT route
router.put("/question", (req, res) => {

  var updatedQuestion = {
    question: req.body.question.problemStatement,
    selections: [],
    correctChoice: req.body.question.correctChoice,
    image: undefined
  };

  for(var i=0; i <5; i++){
    var combinedString = "req.body.question.choice" + (i+1);

    if((eval(combinedString)) !== ""){
      updatedQuestion.selections.push(eval(combinedString));
    }
  }
  
  if (req.body.imageUrl !== ""){
    updatedQuestion.image = req.body.imageUrl; 
  }

  Question.findByIdAndUpdate(req.body.id, updatedQuestion, function(err, foundQuestion){
      if (err){
        console.log("error");
      } else {
        console.log("Question with ID: " + req.body.id + " is been updated");
        res.redirect("admin")
      }
  });
});

// Question Remove route
router.delete("/question", (req, res)=> {
  var id = req.body.id;
  Question.findByIdAndRemove(id).exec();
  res.redirect("admin");
});

// Question POST route
router.post('/question', (req, res)=> {

  var createdQuestion = {
    question: req.body.question.problemStatement,
    selections: [],
    correctChoice: req.body.question.correctChoice,
    image: undefined
  };

  for(var i=0; i <5; i++){
    var combinedString = "req.body.question.choice" + (i+1);

    if((eval(combinedString)) !== ""){
      createdQuestion.selections.push(eval(combinedString));
    }
  }
  
  if (req.body.imageUrl !== ""){
    createdQuestion.image = req.body.imageUrl; 
  }
  
  Question.create(createdQuestion, (err, newlyCreated)=>{
    if (err){
      console.log(err);
    } else {
      res.redirect("admin");
    }
  });

});


// New Questions GET route
router.get("/new-question", middleware.localSession, (req, res) =>{
  res.render("administration/create_form");
});

// Update Question GET route

router.get("/update-question", middleware.localSession, (req, res) => {
  Question.findById(req.query.id, function(err, foundQuestion){
    res.render("administration/update_form", {inputID: req.query.id, question: foundQuestion});
  });
});


// Administration route

router.get("/admin", middleware.localSession, (req, res) => {
  Question.find().then(function(results){
    res.render("administration/admin", {questions: results});
  });
});

var userQuestionResult = {
  question_id : null,
  question_answer: -1
};

// Question-User-Submit POST route (DATA created by USER)
router.post("/question-user-submit", (req,res) => {
  
  console.log("The user entered the question-user-submit POST route");
  
  // Get the data
  userQuestionResult.question_id = req.session.userData.questions[req.session.userData.questions.length-1]._id;
  userQuestionResult.question_answer = req.body.answer;
    
    //Compare the data
    
    Question.findById(userQuestionResult.question_id, function(err, correctQuestion){
      if (err){
        console.log(err);
      }
      
      if (userQuestionResult.question_answer == correctQuestion.correctChoice){
        req.session.userData.checks = true;
        req.session.userData.scoreboard.score++;
        console.log("Current userData status is :" + req.session.userData.checks);
      } else {
        req.session.userData.checks = false;
         console.log("Current userData status is :" + req.session.userData.checks);
      }
      
      // Redirect to the result page
      console.log("The player chose the answer: " + userQuestionResult.question_answer);
      res.redirect("result");
      
    });
    
  
  
  // req.session.userData.checks = middleware.compareAnswers(question_datas, userQuestionResult.question_id, userQuestionResult.question_answer, req);

});

// Result GET route (Fetch the result page)
router.get("/result", middleware.localSession, (req, res) => {
    var correctOrNot = "INCORRECT";
    
    if (req.session.userData == undefined || req.session.userData.checks == null) {
      console.log("Current userData status is :" + req.session.userData.checks);
      res.redirect("/");  
    } else if (req.session.userData.checks == true){
      correctOrNot = "CORRECT";
      res.render("result", {correctOrNot: correctOrNot});
    } else if (req.session.userData.checks == false){
      res.render("result", {correctOrNot: correctOrNot});
    }
    
});

module.exports = router;