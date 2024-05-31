import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
export default function Navbar({ onQuizClick }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleDashboard = () => {
    navigate("/home/dashboard");
  };
  const handleAnalytics = () => {
    navigate("/home/analytics");
  };

  const handleQuizClick = () => {
    onQuizClick();
  }

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>QUIZZE</h1>
      <div>
        <ul>
          <li onClick={handleDashboard}>Dashboard</li>
          <li onClick={handleAnalytics}>Analytics</li>
          <li onClick={handleQuizClick}>Create Quiz</li>
        </ul>
      </div>
      <div>
        <hr className={styles.hrline} />
        <button className={styles.logOut} onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </nav>
  );
}
