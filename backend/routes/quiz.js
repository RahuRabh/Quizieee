const express = require("express");
const router = express.Router();
const quizController = require("../controller/quiz");
const verifyToken = require('../middleware/authMiddleware')

//Routes for handling all Quiz api
router.post("/createQuiz",  quizController.createQuiz);

router.put("/editQuizById/:quizId", verifyToken, quizController.editQuizById);

router.get("/getAllQuiz", verifyToken, quizController.getAllQuiz);

router.get("/getQuizById/:quizId", quizController.getQuizById);

router.put("/deleteQuizById/:quizId", verifyToken, quizController.deleteQuizById);

module.exports = router;
