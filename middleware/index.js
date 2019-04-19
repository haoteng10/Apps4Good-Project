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

module.exports = middlewareObj;