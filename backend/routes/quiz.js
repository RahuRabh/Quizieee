const express = require("express");
const router = express.Router();
const quizController = require("../controller/quiz");

//Routes for handling all Quiz api
router.post("/createQuiz", quizController.createQuiz);

router.put("/editQuizById/:quizId", quizController.editQuizById);

router.get("/getAllQuiz", quizController.getAllQuiz);

router.get("/getQuizById/:quizId", quizController.getQuizById);

router.put("/deleteQuizById/:quizId", quizController.deleteQuizById);

module.exports = router;
