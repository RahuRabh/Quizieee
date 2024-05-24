import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Dashboard from "../../components/Dashboard/Dashboard";
import Analytics from "../../components/Analytics/Analytics";
import QuizForm from "../../components/QuizForm/QuizForm";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [showQuizForm, setShowQuizForm] = useState(false);
  const handleOpenQuizForm = () => {
    setShowQuizForm(true);
  };
  const handleCloseQuizForm = () => {
    setShowQuizForm(false);
  };
  return (
    <div className={styles.homepage}>
      <Navbar onQuizClick={handleOpenQuizForm} />
      <div className={styles.content}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
      {showQuizForm && (
        <>
          <QuizForm onCancel={handleCloseQuizForm} />
        </>
      )}
    </div>
  );
}
