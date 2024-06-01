import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import styles from "./Quiz.module.css";
import congrats from "../../assets/congrats.png";

import Loader from "../../components/Loader/Loader";

import { getQuizById, updateQuestionStats } from "../../apis/quiz";

export default function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizById(id);
        setQuiz(response);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleOptionClick = async (index) => {
    setSelectedOption(index);
    const isCorrect = quiz.slides[currentSlide].options[index].isCorrectAnswer;

    try {
      if (quiz.quizType === "Poll") {
        await updateQuestionStats(quiz.quizId, quiz.slides[currentSlide]._id, {
          optionIndex: index,
        });
      } else {
        await updateQuestionStats(quiz.quizId, quiz.slides[currentSlide]._id, {
          attempted: true,
          correct: isCorrect,
          incorrect: !isCorrect,
        });
        if (isCorrect) {
          setScore((prevScore) => prevScore + 1);
        }
      }
    } catch (error) {
      console.error("Error updating question stats:", error);
    }
  };

  const handleNextClick = () => {
    if (currentSlide < quiz.slides.length - 1) {
      setCurrentSlide((prevSlide) => prevSlide + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  useEffect(() => {
    if (quiz && quiz.slides[currentSlide].timer !== "off") {
      const time = parseInt(quiz.slides[currentSlide].timer);
      setTimeLeft(time);
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timerRef.current);
            handleNextClick();
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [quiz, currentSlide]);

  if (!quiz)
    return (
      <div>
        <Loader />
      </div>
    );

  if (quizCompleted) {
    if (quiz.quizType === "Poll") {
      return (
        <div className={styles.congratsOverlay}>
          <div className={styles.congratulations}>
            <h1 className={styles.hcongrats}>
              Thank you <br /> for participating in <br /> the poll!
            </h1>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.congratsOverlay}>
          <div className={styles.congratulations}>
            <h1 className={styles.hcongrats}>Congratulations!</h1>
            <img src={congrats} alt="congrats" />
            <p className={styles.hcongrats}>
              Your score is{" "}
              <span>
                0{score}/0{quiz.slides.length}
              </span>
            </p>
          </div>
        </div>
      );
    }
  }

  const currentQuestion = quiz.slides[currentSlide];

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.quizNumber}>
            0{`${currentSlide + 1}/0${quiz.slides.length}`}
          </span>
          {quiz.slides[currentSlide].timer !== "off" && (
            <span className={styles.timer}>00:{timeLeft}s</span>
          )}
        </div>
        <p className={styles.question}>{currentQuestion.question}</p>
        <div className={styles.options}>
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`${styles.option} ${
                selectedOption === index ? styles.selected : ""
              }`}
              onClick={() => handleOptionClick(index)}
            >
              {currentQuestion.answerType === "text" && (
                <span className={styles.forText}>{option.text}</span>
              )}
              {currentQuestion.answerType === "imageUrl" && (
                <img
                  className={styles.forImage}
                  src={option.image}
                  alt={`Option ${index + 1}`}
                />
              )}
              {currentQuestion.answerType === "textImageUrl" && (
                <div className={styles.forTextImage}>
                  <span>{option.text}</span>
                  <img src={option.image} alt={`Option ${index + 1}`} />
                </div>
              )}
            </div>
          ))}
        </div>
        <button onClick={handleNextClick} className={styles.nextButton}>
          {currentSlide === quiz.slides.length - 1 ? "SUBMIT" : "NEXT"}
        </button>
      </div>
    </div>
  );
}
