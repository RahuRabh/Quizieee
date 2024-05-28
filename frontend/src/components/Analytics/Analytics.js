import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import share from "../../utils/share.png";
import delte from "../../utils/del.png";
import edit from "../../utils/uil_edit.png";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";
import { getQuizByUser } from '../../apis/quiz'

export default function Analytics() {
  const [quizAnalytics, setquizAnalytics] = useState([])
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // Add your delete logic here
    console.log('Item deleted');
    setIsModalOpen(false);
  };

  const userId = localStorage.getItem('userId')
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizByUser(userId);
        setquizAnalytics(response.quizAnalytics)
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [userId]);

  const convertDate = (dateString) => {
    const date = new Date(dateString)
    const option = {day: 'numeric', month: 'long', year: 'numeric'}
    return date.toLocaleDateString('en-Us', option)
  }

  return (
    <div className={styles.analyticsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Quiz Analysis</h1>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
                <tr >
                <th className={styles.tableCell}>S.No</th>
                <th className={styles.tableCell}>Quiz Name</th>
                <th className={styles.tableCell}>Created on</th>
                <th className={styles.tableCell}>Impression</th>
                <th className={styles.tableCell}></th>
                <th className={styles.tableCell}></th>
              </tr>
             
            </thead>
            <tbody className={styles.tableBody}>
              {quizAnalytics.map((quiz, index) => (
                <tr
                  key={quiz.id}
                  className={`${styles.tableRow} ${
                    index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
                  }`}
                >
                  <td className={styles.tableCell}>{index +1}</td>
                  <td className={styles.tableCell}>{quiz.name}</td>
                  <td className={styles.tableCell}>{convertDate(quiz.createdAt)}</td>
                  <td className={styles.tableCell}>10</td>
                  <td className={`${styles.tableCell} ${styles.tableActions}`}>
                    <img src={edit} alt="edit" className={styles.tableIcon} />
                    <img
                      onClick={handleDeleteClick}
                      src={delte}
                      alt="delete"
                      className={styles.tableIcon}
                    />
                    <img src={share} alt="share" className={styles.tableIcon} />
                  </td>
                  <td
                    onClick={() => navigate(`/question-analysis?quizId=${quiz.quizId}`)}
                    className={`${styles.tableCell} ${styles.tableAnalysis}`}
                  >
                    Question Wise Analysis
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <DeleteModal onClose={handleCloseModal} onConfirm={handleCloseModal}/>
        )}
      </div>
      </div>
  );
}
