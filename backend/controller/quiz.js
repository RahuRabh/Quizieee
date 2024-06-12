const Quiz = require("../models/quiz");
const {
  Types: { ObjectId },
} = require("mongoose");

//logic for handling creation of quiz
const createQuiz = async (req, res, next) => {
  try {
    const { name, type, slides, userId } = req.body;
    if (!name || !type || !slides || !userId) {
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

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        errorMessage: "Quiz not found",
      });
    }

    const { slides } = req.body;
    const updateQuiz = await Quiz.findById(quizId);
    updateQuiz.slides = slides;
    const response = await updateQuiz.save();
    res.json({
      message: "Quiz updated",
      id: response._id,
    });
  } catch (error) {
    next(error);
  }
};

//logic for getting quizData of logged in user
const getQuizByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const quizes = await Quiz.find({ userId });

    //For Dashboard component
    const totalQuizzes = quizes.length;
    const totalQuestions = quizes.reduce(
      (acc, quiz) => acc + quiz.slides.length,
      0
    );
    const totalImpression = quizes.reduce(
      (acc, quiz) => acc + quiz.impressions,
      0
    );
    //For Analytics component
    const quizAnalytics = quizes.map((quiz) => ({
      quizId: quiz._id,
      name: quiz.name,
      createdAt: quiz.createdAt,
      impression: quiz.impressions,
    }));

    const quizData = {
      dashboardData: {
        totalQuizzes,
        totalQuestions,
        totalImpression,
      },
      quizAnalytics,
    };

    res.json(quizData);
  } catch (error) {
    res.json({ error: error.message });
    next(error);
  }
};

//For Question Wise Analysis
const questionWiseAnalysis = async (req, res, next) => {
  const { quizId } = req.params;
  const quizes = await Quiz.findById(quizId);

  const quizName = quizes.name;
  const quizType = quizes.type;
  const createdAt = quizes.createdAt;
  const impression = quizes.impressions;

  const questionAnalysis = quizes.slides.map((slide) => ({
    questionName: slide.question,
    attempts: slide.attempts,
    correct: slide.correct,
    incorrect: slide.incorrect,
    options: slide.options.map((option) => ({
      text: option.text,
      clicks: option.clicks,
    })),
  }));
  res.json({
    quizName,
    quizType,
    createdAt,
    impression,
    questionAnalysis,
  });
};

//logic for getting quiz by its id previous
const getQuizById = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    quiz.impressions += 1;
    await quiz.save();

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json({
      quizId: quiz._id,
      quizName: quiz.name,
      quizType: quiz.type,
      slides: quiz.slides,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};
// const getQuizById = async (req, res, next) => {
//   try {
//     const { quizId } = req.params;

//     // Find and increment impressions atomically
//     const quiz = await Quiz.findOneAndUpdate(
//       { _id: quizId },
//       { $inc: { impressions: 1 } },
//       { new: true }
//     );

//     // Check if quiz exists
//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }

//     // Log the updated impressions for debugging
//     console.log(`Quiz ${quizId} impressions updated to: ${quiz.impressions}`);

//     // Respond with quiz details
//     res.json({
//       quizId: quiz._id,
//       quizName: quiz.name,
//       quizType: quiz.type,
//       slides: quiz.slides,
//     });
//   } catch (error) {
//     console.error('Error in getQuizById:', error);
//     res.status(500).json({ error: error.message });
//     next(error);
//   }
// };


//logic for deleting quiz by id
const deleteQuizById = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findByIdAndDelete(quizId);
    res.json({ message: "Quiz deleted" });
  } catch (error) {
    next(error);
  }
};

const updateQuestionStats = async (req, res, next) => {
  try {
    const { quizId, slideId } = req.params;
    const { optionIndex, attempted, correct, incorrect } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const slide = quiz.slides.id(slideId);
    if (!slide) return res.status(404).json({ message: "Slide not found" });

    if (optionIndex !== undefined) {
      slide.options[optionIndex].clicks += 1;
    } else {
      if (attempted) slide.attempts += 1;
      if (correct) slide.correct += 1;
      if (incorrect) slide.incorrect += 1;
    }

    await quiz.save();
    res.json({ message: "Stats updated successfully" });
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
  updateQuestionStats,
};
