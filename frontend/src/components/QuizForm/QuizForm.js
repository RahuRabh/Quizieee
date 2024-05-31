import React, { useEffect, useState } from "react";
import QuizForm1 from "./QuizForm1";
import QuizForm2 from "./QuizForm2";
import { createQuiz, editQuizById } from "../../apis/quiz";

import styles from "./QuizForm.module.css";
export default function QuizForm({ onCancel, onSuccess, quizData }) {
  const [step, setStep] = useState(1);
  const [quizDetails, setQuizDetails] = useState({
    id:"",
    name: "",
    type: "",
    questions: [],
    userId: localStorage.getItem("userId"),
  });

  //Logic for editing 
  useEffect(() => {
    if(quizData){
      setQuizDetails({
        id: quizData.quizId,
        name: quizData.quizName,
        type: quizData.quizType,
        questions: quizData.slides,
        userId: localStorage.getItem("userId"),
      })
      setStep(2)
    }
  }, [quizData])

  

  //Logic for handling quizForm2
  const handleQuizForm2Submit = async (newSlides) => {
    const quizData = {
      id: quizDetails.id,
      name: quizDetails.name,
      type: quizDetails.type,
      slides: newSlides,
      userId: localStorage.getItem("userId"),
    }

    try {
      if(quizDetails.id){
        console.log("yaha kyu");
        const response = await editQuizById(quizData.id, quizData)
        localStorage.setItem("QuizId", response.id)
      } else{
        console.log("yaha kyu nahi");
        const response = await createQuiz(quizData);
        localStorage.setItem("QuizId", response.id)
      }
      onSuccess()
    } catch (error) {
      console.log(error);
    }
  };

  //Logic for handling quizForm1
  const handleQuizForm1Submit = (name, type) => {
    setQuizDetails((prevState) => ({
      ...prevState,
      name: name,
      type: type,
    }));
    setStep(2);
  };

  return (
    <div className={styles.container}>
      {step === 1 ? (
        <QuizForm1 onSubmit={handleQuizForm1Submit} onCancel={onCancel} />
      ) : (
        <QuizForm2
          quizType={quizDetails.type}
          initialSlides={quizDetails.questions}
          onCancel={onCancel}
          onSubmit={handleQuizForm2Submit}
        />
      )}
    </div>
  );
}
