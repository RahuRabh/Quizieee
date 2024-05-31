import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Quiz.module.css';
import congrats from '../../utils/congrats.png'
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
        console.log("response from playing quiz", response);
        setQuiz(response);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [id]);


  // useEffect(() => {
  //   // if (quiz && quiz.type === 'Q&A' && quiz.slides[currentSlide].timer && quiz.slides[currentSlide].timer !== 'off') {
  //     const timerDuration = parseInt(quiz.slides[0].timer.replace('sec', ''));
  //     setTimeLeft(timerDuration);
  //     timerRef.current = setInterval(() => {
  //       setTimeLeft(prevTime => {
  //         if (prevTime <= 1) {
  //           clearInterval(timerRef.current);
  //           handleNextClick(); 
  //           return 0;
  //         }
  //         return prevTime - 1;
  //       });
  //     }, 1000);
  //   // } else {
  //     clearInterval(timerRef.current);
  //     setTimeLeft(null);
  //   // }
  //   return () => clearInterval(timerRef.current);
  // }, [quiz]);
  

  const handleOptionClick = async (index) => {
    setSelectedOption(index);
    const isCorrect = quiz.slides[currentSlide].options[index].isCorrectAnswer;

    try {
      await updateQuestionStats(quiz._id, quiz.slides[currentSlide]._id, {  
        attempted: true,
        correct: isCorrect,
        incorrect: !isCorrect,
      });
    } catch (error) {
      console.error('Error updating question stats:', error);
    }

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
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

  if (!quiz) return <div className={styles.loading}>Loading...</div>;

  if (quizCompleted) {
    if(quiz.quizType === "Poll"){
      return (
        <div className={styles.congratulations}>
            <h1 className={styles.hcongrats}>Thank you <br /> for participating in <br /> the poll!</h1>
        </div>
      )
    }else{
      return (
        <div className={styles.congratulations}>
      <h1 className={styles.hcongrats}>Congratulations!</h1>
            <img src={congrats} alt='congrats' />
            <p className={styles.hcongrats}>Your score is <span>0{score}/0{quiz.slides.length}</span></p>
      </div>
      )
    }
  }

  const currentQuestion = quiz.slides[currentSlide];

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.quizNumber}>0{`${currentSlide + 1}/0${quiz.slides.length}`}</span>
          {quiz.type === 'Q&A' && currentQuestion.timer && currentQuestion.timer !== 'off' && (
            <span className={styles.timer}>{timeLeft}s</span>
          )}
        </div>
        <p className={styles.question}>{currentQuestion.question}</p>
        <div className={styles.options}>
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`${styles.option} ${selectedOption === index ? styles.selected : ''}`}
              onClick={() => handleOptionClick(index)}
            >
              {currentQuestion.answerType === 'text' && <span>{option.text}</span>}
              {currentQuestion.answerType === 'imageUrl' && <img src={option.image} alt={`Option ${index + 1}`} />}
              {currentQuestion.answerType === 'textImageUrl' && (
                <>
                {/* <div className={styles.answerType}> */}
                  <span>{option.text}</span>
                  <img src={option.image} alt={`Option ${index + 1}`} />
                {/* </div> */}
                </>
              )}
            </div>
          ))}
        </div>
        <button onClick={handleNextClick} className={styles.nextButton}>NEXT</button>
      </div>
    </div>
  );
}
