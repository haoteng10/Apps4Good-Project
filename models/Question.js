var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    question: String,
    selections: Array,
    correctChoice: String
});

module.exports = mongoose.model("Question", questionSchema);