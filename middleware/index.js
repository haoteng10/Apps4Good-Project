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
        req.session.userData.checks == true;
        req.session.userData.scoreboard.score++;
        return true;
    } else {
        req.session.userData.checks == false;
        console.log("The player chose the wrong answer. The correct answer is " + correctQuestionData.correctChoice);
    }
    return false;
};

module.exports = middlewareObj;