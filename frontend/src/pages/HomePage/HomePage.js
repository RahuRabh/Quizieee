import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Dashboard from '../../components/Dashboard/Dashboard';
import Analytics from '../../components/Analytics/Analytics';
import CreateQuiz from '../../components/CreateQuiz/CreateQuiz'
import Modal from '../../components/Modal/Modal';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [isCreateQuizOpen, setCreateQuizOpen] = useState(false);

  const toggleCreateQuiz = () => {
    setCreateQuizOpen(!isCreateQuizOpen);
};

  return (
    <div className={styles.homepage}>
      <Navbar toggleCreateQuiz={toggleCreateQuiz} />
      <div className={styles.content}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
      {isCreateQuizOpen && (
        <Modal onClose={() => setCreateQuizOpen(false)}>
          <CreateQuiz />
        </Modal>
      )}
    </div>
  );
}
