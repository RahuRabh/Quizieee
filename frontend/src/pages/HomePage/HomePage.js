import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Dashboard from "../../components/Dashboard/Dashboard";
import Analytics from "../../components/Analytics/Analytics";
import QuizForm from "../../components/QuizForm/QuizForm";
import styles from "./HomePage.module.css";
import QuizSuccess from "../../components/QuizForm/QuizSuccess"
import { getQuizById } from "../../apis/quiz";
export default function HomePage() {
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showQuizSuccess, setShowQuizSuccess] = useState(false);
  const [quizToEdit, setQuizToEdit] = useState()
  const handleOpenQuizForm = () => {
    setQuizToEdit(null)
    setShowQuizForm(true);
  };
  const handleCloseQuizForm = () => {
    setShowQuizForm(false);
  };
  const handleQuizSuccess = () => {
    setShowQuizForm(false)
    setShowQuizSuccess(true);
  }
  const hanldePopupClose = () => {
    setShowQuizSuccess(false)
  }
  const handleEditQuiz = async(quizId) => {
    try{
      const quizData = await getQuizById(quizId)
      setQuizToEdit(quizData)
      setShowQuizForm(true)
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className={styles.homepage}>
      <Navbar onQuizClick={handleOpenQuizForm} />
      <div className={styles.content}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics onEditQuiz={handleEditQuiz} />} />
        </Routes>
      </div>
      {showQuizForm && (
        <>
          <QuizForm 
          quizData={quizToEdit}
          onCancel={handleCloseQuizForm}
          onSuccess={handleQuizSuccess} />
        </>
      )}
      {showQuizSuccess && (
        <QuizSuccess onClose={hanldePopupClose} />
      )}
    </div>
  );
}
