const Quiz = require("../models/quiz");
const {
  Types: { ObjectId },
} = require("mongoose");

//logic for handling creation of quiz
const createQuiz = async (req, res, next) => {
  try {
    const { name, type, numberOfQuestions, questions, userId } = req.body;
    if (!name || !type || !numberOfQuestions || !questions || !userId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const quizDetails = new Quiz({
      userId: userId,
      name: name,
      numberOfQuestions: numberOfQuestions,
      questions: questions,
      type: type,
    });

    await quizDetails.save();
    res.json({ message: "Quiz created" });
  } catch (error) {
    next(error);
  }
};

//logic for handling editing of quiz
const editQuizById = async (req, res, next) => {
  try {
    const { quizId } = req.params;

    if (!quizId) {
      return res.status(400).json({
        errorMessage: "Bad request. The Quiz id is required",
      });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        errorMessage: "Quiz not found",
      });
    }

    const { questions } = req.body;
    const updateQuiz = await Quiz.findById(quizId);
    updateQuiz.questions = questions;
    await updateQuiz.save();
    res.json({ message: "Quiz updated" });
  } catch (error) {
    next(error);
  }
};

//logic for getting all quiz of logged in user
const getAllQuiz = async (req, res, next) => {
  try {
    const quizes = await Quiz.find({});
    res.json(quizes);
  } catch (error) {
    next(error);
  }
};

//logic for getting quiz by id of logged in user
const getQuizById = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

//logic for deleting quiz by id
const deleteQuizById = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findByIdAndDelete(quizId);
    res.json({message: "Quiz deleted"});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuiz,
  editQuizById,
  getAllQuiz,
  deleteQuizById,
  getQuizById,
};
