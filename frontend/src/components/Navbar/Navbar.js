import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ toggleCreateQuiz }) {
    const navigate = useNavigate()
  return (
    <nav className={styles.navbar}>
    <h1 className={styles.title}>QUIZZE</h1>
    <div>
    <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        {/* <li><Link to="/createQuiz">Create Quiz</Link></li> */}
        <li onClick={toggleCreateQuiz}>Create Quiz</li>
    </ul>
    </div>
    <div>
        <hr className={styles.hrline}/>
        <button className={styles.logOut} onClick={() => navigate('/auth')}>LOGOUT</button>
    </div>
    </nav>
  )
}
