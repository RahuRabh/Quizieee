const express = require("express");
const router = express.Router();
const quizController = require("../controller/quiz");
const verifyToken = require('../middleware/authMiddleware')

//Routes for handling all Quiz api
router.post("/createQuiz", quizController.createQuiz);

//Routes for pushing quiz Engagment detials
router.post("/:quizId/slide/:slideId", quizController.updateQuestionStats);

//Routes to get Quiz By User
router.get("/getQuizByUser/:userId",  quizController.getQuizByUser);

//Routes to get question for analysi
router.get("/questionWiseAnalysis/:quizId", quizController.questionWiseAnalysis )

//Routes for playig the quiz
router.get("/playQuiz/:quizId", quizController.getQuizById);

//Routes for deleting the quiz
router.put("/deleteQuizById/:quizId",  quizController.deleteQuizById);

//Routes for editing the quiz
router.put("/editQuizById/:quizId", quizController.editQuizById);

module.exports = router;
