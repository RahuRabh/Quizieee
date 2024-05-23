import React from 'react'
import styles from './Dashboard.module.css'
import eye from '../../utils/eye.png'
export default function Dashboard() {
  return (
    <main className={styles.main}>
        <div className={styles.heading}>
            <div className={styles.quiz}>
                <p className={styles.no}>12</p>
                <p className={styles.title}>Quiz</p>
                <p className={styles.text}>Created</p>
            </div>
            <div className={styles.questions}>
                <p className={styles.no}>100</p>
                <p className={styles.title}>questions</p>
                <p className={styles.text}>Created</p>
            </div>
            <div className={styles.impressions}>
                <p className={styles.no}>1.4k</p>
                <p className={styles.title}>Total</p>
                <p className={styles.text}>Impressions</p>
            </div>
        </div>
        <div className={styles.content}>
            <h2>Trending Quizes</h2>
            <div className={styles.quizList}>
                <div className={styles.tquiz}>
                    <p className={styles.name}>Quiz 1</p>
                    <p className={styles.eye}>600 <img alt='eye' src={eye} /></p>
                    <p className={styles.date}>Created on: 04 Sep, 2023</p>
                </div>
            </div>
        </div>
    </main>
  )
}
