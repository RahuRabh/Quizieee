const Quiz = require("../models/quiz");
const {
  Types: { ObjectId },
} = require("mongoose");

//logic for handling creation of quiz
const createQuiz = async (req, res, next) => {
  try {
    const { name, type, slides, userId } = req.body;
    if (!name || !type  || !slides || !userId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const quizDetails = new Quiz({
      userId: userId,
      name: name,
      slides: slides,
      type: type,
    });

    const response = await quizDetails.save();
    res.json({ 
      message: "Quiz created", 
      id: response._id,
    });
  } catch (error) {
    console.error(`[ERROR]::${error}`);
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

//logic for getting quizData of logged in user
const getQuizByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const quizes = await Quiz.find({userId})
    
    //For Dashboard component
    const totalQuizzes = quizes.length
    const totalQuestions = quizes.reduce((acc, quiz) => acc + quiz.slides.length, 0)

    //For Analytics component
    const quizAnalytics = quizes.map(quiz => ({
      quizId: quiz._id,
      name: quiz.name,
      createdAt: quiz.createdAt,
    }))
    
    res.json({
      dashboardData: {
        totalQuizzes,
        totalQuestions,
      },
      quizAnalytics: quizAnalytics,
    })

  } catch (error) {
    res.json({error: error.message})
    next(error);
  }
};

//For Question Wise Analysis
const questionWiseAnalysis = async (req, res, next) => {
  const { quizId } = req.params;
  const quizes = await Quiz.findById(quizId)

  const quizName = quizes.name
  const createdAt = quizes.createdAt
  const questionAnalysis = quizes.slides.map(slide => ({
      questionName: slide.question
    }))
  res.json({
    quizName,
    createdAt,
    questionAnalysis
  })
}

//logic for getting quiz by its id
const getQuizById = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    res.json({
      quizName: quiz.name,
      quizType: quiz.type,
      slides: quiz.slides
    });
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
  getQuizByUser,
  deleteQuizById,
  getQuizById,
  questionWiseAnalysis,
};