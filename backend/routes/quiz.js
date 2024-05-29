const express = require("express");
const router = express.Router();
const quizController = require("../controller/quiz");
const verifyToken = require('../middleware/authMiddleware')

//Routes for handling all Quiz api
router.post("/createQuiz",  quizController.createQuiz);
router.post('/quiz/update-stats', quizController.updateQuestionStats);
// verifyToken - for createQuiz
router.get("/getQuizByUser/:userId",  quizController.getQuizByUser);
// verifyToken - for getQuizByUser
router.get("/questionWiseAnalysis/:quizId", quizController.questionWiseAnalysis )
// verifyToken - for QuestionWiseAnalysis
router.get("/playQuiz/:quizId", quizController.getQuizById);
router.put("/deleteQuizById/:quizId",  quizController.deleteQuizById);
// verifyToken - for deleteQuiz
router.put("/editQuizById/:quizId", verifyToken, quizController.editQuizById);
// verifyToken - for editQuizById
module.exports = router;
