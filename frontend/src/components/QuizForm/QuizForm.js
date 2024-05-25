import React, { useState } from "react";
import QuizForm1 from "./QuizForm1";
import QuizForm2 from "./QuizForm2";
import { createQuiz } from  '../../apis/quiz'
import styles from "./QuizForm.module.css";
export default function QuizForm({onCancel}) {
  const [step, setStep] = useState(1);
  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState("");
  const [questions, setQuestions] = useState([])
  
  const userId = localStorage.getItem("userId")
  console.log("user_id hai ya nahi-",userId);
  // const handleNext = (name, type) => {
  //   setQuizName(name)
  //   setQuizType(type)
  //   setStep(2);
  // };
  // const handleBack = () => {
  //   setStep(1);
  // };
  const handleQuizForm1Submit = (name, type) => {
    setQuizName(name)
    setQuizType(type)
    setStep(2)
  }

  const handleQuizForm2Submit = (newQuestions) => {
    setQuestions(newQuestions);
    createQuiz({
      name: quizName,
      type: quizType,
      numberOfQuestions: newQuestions.length,
      questions: questions,
      // userId: user_id, // Replace with actual user ID
    }).then((data) => {
      console.log(data);
      // Handle success or error response from the backend
    }).catch((error) => {
      console.error(error);
      // Handle error
    });
  };

  // const createQuiz = async() => {
  //   const quizData = {
  //     name: quizName,
  //     type: quizType,
  //     numberOfQuestions: questions.length,
  //     questions: questions,
  //   }
  //   try{
  //     const response = await createQuiz(quizData)
  //   }catch(error){
  //     console.log(error);
  //   }
  // }onNext={handleNext}
 
  return (
    <div className={styles.container}>
      {step === 1 ? (
        <QuizForm1 
          onSubmit={handleQuizForm1Submit}
          onCancel={onCancel}
        />
      ) : (
        <QuizForm2 
        quizType={quizType}
        onCancel={onCancel} 
        onSubmit={handleQuizForm2Submit} />
      )}
    </div>
  );
}
