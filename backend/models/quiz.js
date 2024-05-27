const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: {type: String},
  image: {type: String},
  isCorrectAnswer: {type: Boolean, default: false},
})
const slideSchema = new mongoose.Schema({
  question: {type: String, required: true},
  answerType: {
    type: String, required: true, enum:['text', 'imageUrl', 'textImageUrl'],
  },
  timer: {
    type: String,
    enum: ["off", "5sec", "10sec"],
    required: function () {
      return (this.type = "Q&A");
    },
  },
  options: [optionSchema],
})

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["Q&A", "Poll"] },
  slides:[slideSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
