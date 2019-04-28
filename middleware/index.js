var middlewareObj = {};

middlewareObj.localSession = function(req, res, next) {
  if (req.session.userData == undefined){
    res.locals.scoreboard = {
      started: false
    };
  } else {
    res.locals.scoreboard = req.session.userData.scoreboard;
  }
  
  next();
};

// Question randomizer
middlewareObj.randomizer = function randomizer(passedArray){
    return Math.floor(Math.random() * passedArray.length);
};

middlewareObj.compareAnswers = function compareAnswers(question_datas, id, userAnswer, req){
    var correctQuestionData = question_datas[id];
    if (correctQuestionData.correctChoice == userAnswer) {
        console.log("The player chose the correct answer.");
        req.session.userData.scoreboard.score++;
        return true;
    } else {
        console.log("The player chose the wrong answer. The correct answer is " + correctQuestionData.correctChoice);
    }
    return false;
};

middlewareObj.isIncludes = function isIncludes(req, inputQuestion){
  req.session.userData.questions.forEach(function(question){
    if (question._id == inputQuestion._id){
      return true;
      }
    return false;
  });
};

module.exports = middlewareObj;