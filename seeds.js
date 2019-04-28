var mongoose = require("mongoose");
var Questions = require("./models/Question");

var question_datas = [
        {
            question: "Use four 6’s and any math signs to make 7. How many ‘+’ signs did you use?",
            selections: ["0", "1", "2", "3"],
            correctChoice: "1"
        },
        {
            question: "Find the sum of the digits of 10^11 - 1?",
            selections: ["11", "9", "10", "12"],
            correctChoice: "11"
        }, 
        {
          	question: "Find n. 27^8 = 81^N",
          	selections: ["N = 7", "N = 5", "N = 4", "N = 6"],
          	correctChoice: "N = 6"
        },
        {
            question: "21y + 67 < 80",
            selections: ["Y = 2", "Y = 10", "Both of the above", "None of the above"],
            correctChoice: "None of the above"
        }, 
        
        {
        	question: "Which gives the largest answer?", 
        	selections: ["5^3 + 2^8", "7^3 + 1^6", "8^2 + 4^4", "2^7 + 6^3"],
            correctChoice: "5^3 + 2^8"
        },
        
        {
        	question: "Find the equation that is TRUE.", 
        	selections: ["-163 + 145 = 3^0", "(x^2) - 4x + 4 = 0 when x is 2", "99 + 56 - 87 = 66", "(x)(2)(x)(2)(x)(2) = x+8 when x is 1"],
            correctChoice: "(x^2) - 4x + 4 = 0 when x is 2"
        }

    ];

function SeedDB(){
    Questions.remove({}, (err) => {
        if (err){
            console.log("Removing Questions Resulted in an error: " + err);
        } else {
            console.log("All Question Had Been Removed!");
            question_datas.forEach(question => {
                Questions.create(question, function(err, createdQuestion){
                    if (err){
                        console.log("The creation of questions are not successful. Error: " + err);
                    } else {
                        console.log("The database had been seeded!");
                    }
                })
            });
        }
        
    });
}

module.exports = SeedDB; 