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
        },
        {
            question: "A box contains a collection of triangular and square tiles. There are 25 tiles in the box, containing 84 edges total. How many square tiles are there in the box?", 
            selections: ["3", "5", "7", "9"],
            correctChoice: "9"
        
        },
        
        {
            question: "Which theorem proves the following triangles to be congruent?", 
            selections: ["SAS Congruence Theorem", "SSA Congruence Theorem", "HL Congruence Theorem", "None of the above"],
            correctChoice: "HL Congruence Theorem",
            image: "https://lh4.googleusercontent.com/vOgNlbtrnr8Lh6TG6qdMCmRxIK_XHwDQNDPUUzmY29o-61KaD5oGB4zjhRNBvP8fiXewBcJg_mSdJ38Yhglk0DxAGBCN3R8xYg_eeoY1_rXC8H3tEzEXvsQdoBWt4ZCFuUkBrTiK"
        },
        
        
        
        {
            question: "On a coordinate plane, Z represents a point that is a 90-degree clockwise rotation of (5, 3). Which point does Z represent?",
            selections: ["(-3, 5)", "(3, 5)", "(-5, -3)", "(5, -3)"],
            correctChoice: "(-3, 5)"
        },
        
        {
            question: "I am 10 years younger than my sister. In two years, she will be twice as old as me. What will be the difference between our ages in two years?",
            selections: ["12", "16", "8", "4"], 
            correctChoice: "8"
        },
        
        {
            question: "Which value makes x = 11?",
            selections: ["28+28+28+28+28+28+28+28= 2x", "82(8) = 2x-50", "46+46+46+46 = 2x+2x+2x+2x"], 
            correctChoice: "28+28+28+28+28+28+28+28= 2x"
        },
        
        {
            question: "Which proves the following triangles to be similar?",
            selections: ["AAA Similarity Theorem", "SAS Similarity Theorem", "AA Similarity Postulate", "All of the above"], 
            image: "https://lh3.googleusercontent.com/9qaHybxTYyvLYrAeEHVSnCIksoo6LzxduwrWlFX59aTtynjJkptqaqvNJw9AwNJ3bqMvqGauCRLE19LbzcrfGPlqOvWWDiHsQ3Q479w1DCOd-4rYboQubDckujTFo7Lvapln5Gyg",
            correctChoice: "AAA Similarity Theorem"
        },
           
        {
            question: "What is needed to prove that the triangles below are congruent?",
            selections: ["∠A = ∠D and ∠C = ∠F", "∠A = ∠D and AC = DF", "Both of the above", "None of the above"], 
            image: "https://lh5.googleusercontent.com/I_fWg6U4yRxsXJKiRF6XIskv9SV7soVr3XsijtHv3ugsu-Qvb_2nqJYPlQ7ZE4oUmAv2WNoEIF32G8D07fpnY59ETufPbwILmDcaDhWfH3xZG2ZGQN2CVC07h_V0yLnax_OwyfFM",
            correctChoice: "∠A = ∠D and AC = DF"
        },
        
        { 
            question: "The following triangles are similar. AB = 24, AC =  28, BC = 32 and QR = 6. If AB is mapped to QR, what is the perimeter of triangle QRS?",
            selections: ["18", "19", "20", "21"], 
            image: "https://lh6.googleusercontent.com/vglHOMdW7rjk4ISQRqeIHyCSa2gh8QcIn57FSowCUlzbwANuBcvxQ-3ui7HZxZskTTqkuh5htz6p38qg_Bo_maDes9AnziO6P6huC6DJWCrfwRq2o0_fSXQ0oiLbs18K-_FyM9Em",
            correctChoice: "21"
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