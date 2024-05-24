import React, { useState } from "react";
import styles from "./Auth.module.css";
import Register from "./Register/Register";
import Login from "./Login/Login";
export default function Auth() {
  const [currentView, setcurrentView] = useState(null);
  return (
    <main className={styles.mainContainer}>
      <div className={styles.authContainer}>
        <h1 className={styles.title}>QUIZZIE</h1>
        <div className={styles.authButton}>
          <button onClick={() => setcurrentView("register")}>Sign Up</button>
          <button onClick={() => setcurrentView("login")}>Log In</button>
        </div>
        {currentView === "register" && <Register setCurrentView={setcurrentView} />}
        {currentView === "login" && <Login />}
      </div>
    </main>
  );
}
