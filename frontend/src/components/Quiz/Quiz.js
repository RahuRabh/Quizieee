// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import styles from './Quiz.module.css';
// import { getQuizById } from "../../apis/quiz";
// export default function Quiz() {
//   const { id } = useParams();
//   const [quiz, setQuiz] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [score, setScore] = useState(0);
//   const [quizCompleted, setQuizCompleted] = useState(false);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await getQuizById(id);
//         console.log("response from playing quiz",response);
//         setQuiz(response);
//       } catch (error) {
//         console.error('Error fetching quiz:', error);
//       }
//     };
//     fetchQuiz();  
//   }, [id]);

//   const handleOptionClick = (index) => {
//     setSelectedOption(index);
//     if (quiz.slides[currentSlide].options[index].isCorrectAnswer) {
//       setScore((prevScore) => prevScore + 1);
//     }
//   };

//   const handleNextClick = () => {
//     if (currentSlide < quiz.slides.length - 1) {
//       setCurrentSlide((prevSlide) => prevSlide + 1);
//       setSelectedOption(null);
//     } else {
//       setQuizCompleted(true);
//     }
//   };

//   if (!quiz) return <div>Loading...</div>;

//   if (quizCompleted) {
//     return (
//       <div className={styles.congratulations}>
//         <h1>Congratulations!</h1>
//         <p>Your score: {score}/{quiz.slides.length}</p>
//       </div>
//     );
//   }

//   const currentQuestion = quiz.slides[currentSlide];

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <span>{`${currentSlide + 1}/${quiz.slides.length}`}</span>
//         {currentQuestion.timer && <span>{currentQuestion.timer}</span>}
//       </div>
//       <p className={styles.question}>{currentQuestion.question}</p>
//       <div className={styles.options}>
//         {currentQuestion.options.map((option, index) => (
//           <div
//             key={index}
//             className={`${styles.option} ${selectedOption === index ? styles.selected : ''}`}
//             onClick={() => handleOptionClick(index)}
//           >
//             {currentQuestion.answerType === 'text' && <span>{option.text}</span>}
//             {currentQuestion.answerType === 'imageUrl' && <img src={option.image} alt={`Option ${index + 1}`} />}
//             {currentQuestion.answerType === 'textImageUrl' && (
//               <div>
//                 <span>{option.text}</span>
//                 <img src={option.image} alt={`Option ${index + 1}`} />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <button onClick={handleNextClick} className={styles.nextButton}>NEXT</button>
//     </div>
//   );

// }

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Quiz.module.css';
import { getQuizById, updateQuestionStats } from "../../apis/quiz";  // Assuming you have an API to update question stats

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

  useEffect(() => {
    if (quiz && quiz.type === 'Q&A' && quiz.slides[currentSlide].timer && quiz.slides[currentSlide].timer !== 'off') {
      const timerDuration = parseInt(quiz.slides[currentSlide].timer.replace('sec', ''));
      setTimeLeft(timerDuration);
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            handleNextClick();  // Automatically move to next slide when timer runs out
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setTimeLeft(null);
    }

    return () => clearInterval(timerRef.current);
  }, [quiz, currentSlide]);

  const handleOptionClick = async (index) => {
    setSelectedOption(index);
    const isCorrect = quiz.slides[currentSlide].options[index].isCorrectAnswer;

    try {
      await updateQuestionStats(quiz.quizId, quiz.slides[currentSlide]._id, {  
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

  if (!quiz) return <div>Loading...</div>;

  if (quizCompleted) {
    return (
      <div className={styles.congratulations}>
        <h1>Congratulations!</h1>
        <p>Your score: {score}/{quiz.slides.length}</p>
      </div>
    );
  }

  const currentQuestion = quiz.slides[currentSlide];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{`${currentSlide + 1}/${quiz.slides.length}`}</span>
        {quiz.type === 'Q&A' && currentQuestion.timer && currentQuestion.timer !== 'off' && <span>{timeLeft}s</span>}
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
              <div>
                <span>{option.text}</span>
                <img src={option.image} alt={`Option ${index + 1}`} />
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleNextClick} className={styles.nextButton}>NEXT</button>
    </div>
  );
}
