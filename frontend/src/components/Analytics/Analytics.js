import React, { useState } from "react";
import styles from "./Analytics.module.css";
import share from "../../utils/share.png";
import delte from "../../utils/del.png";
import edit from "../../utils/uil_edit.png";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";
const quizzes = [
  { id: 1, name: "Quiz 1", date: "01 Sep, 2023", impressions: "345" },
  { id: 2, name: "Quiz 2", date: "04 Sep, 2023", impressions: "667" },
  { id: 3, name: "Quiz 3", date: "06 Sep, 2023", impressions: "1.6K" },
];

export default function Analytics() {
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
  return (
    <div className={styles.analyticsPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Quiz Analysis</h1>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableCell}>S.No</th>
                <th className={styles.tableCell}>Quiz Name</th>
                <th className={styles.tableCell}>Created on</th>
                <th className={styles.tableCell}>Impression</th>
                <th className={styles.tableCell}></th>
                <th className={styles.tableCell}></th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {quizzes.map((quiz, index) => (
                <tr
                  key={quiz.id}
                  className={`${styles.tableRow} ${
                    index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
                  }`}
                >
                  <td className={styles.tableCell}>{quiz.id}</td>
                  <td className={styles.tableCell}>{quiz.name}</td>
                  <td className={styles.tableCell}>{quiz.date}</td>
                  <td className={styles.tableCell}>{quiz.impressions}</td>
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
                    onClick={() => navigate("/question-wise")}
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
