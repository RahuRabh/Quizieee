import React, { useState } from "react";
import QuizForm1 from "./QuizForm1";
import QuizForm2 from "./QuizForm2";
import { createQuiz } from "../../apis/quiz";
import styles from "./QuizForm.module.css";
export default function QuizForm({ onCancel, onSuccess }) {
  const [step, setStep] = useState(1);
  const [quizDetails, setQuizDetails] = useState({
    name: "",
    type: "",
    questions: [],
    userId: localStorage.getItem("userId"),
  });

  const handleQuizForm1Submit = (name, type) => {
    setQuizDetails((prevState) => ({
      ...prevState,
      name: name,
      type: type,
    }));
    setStep(2);
  };

  const handleQuizForm2Submit = async (newSlides) => {
    const quizData = {
      name: quizDetails.name,
      type: quizDetails.type,
      slides: newSlides,
      userId: localStorage.getItem("userId"),
    }

    try {
      const response = await createQuiz(quizData);
      onSuccess()
      localStorage.setItem("QuizId", response.id)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      {step === 1 ? (
        <QuizForm1 onSubmit={handleQuizForm1Submit} onCancel={onCancel} />
      ) : (
        <QuizForm2
          quizType={quizDetails.type}
          onCancel={onCancel}
          onSubmit={handleQuizForm2Submit}
        />
      )}
    </div>
  );
}
