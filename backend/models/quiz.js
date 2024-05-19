const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answerType: {
    type: String,
    required: true,
    enum: ["Text", "Image Url", "Text & Image Url"],
  },
  options: [
    {
      text: { type: String },
      image: { type: String },
      isCorrectAnswer: { type: Boolean, default: false },
    },
  ],
  correctAnswer: { type: mongoose.Schema.Types.ObjectId, ref: "options" },
  timer: {
    type: String,
    enum: ["Off", "5", "10"],
    required: function () {
      return (this.type = "Q&A");
    },
  },
});

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ["Q&A", "Poll Type"] },
  numberOfQuestions: { type: Number, requied: true },
  questions: [questionSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
