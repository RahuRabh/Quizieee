// import React, { useState } from 'react';
// import styles from './QuizForm2.module.css';

// export default function QuizForm2({ onSubmit, onCancel }) {
//   const [slides, setSlides] = useState([{ slideNumber: 1, question: '', options: [{ text: '', image: '' }] }]);
//   const [currentSlide, setCurrentSlide] = useState(1);

//   const handleAddSlide = () => {
//     if (slides.length < 6) {
//       setSlides([...slides, { slideNumber: slides.length + 1, question: '', options: [{ text: '', image: '' }] }]);
//     }
//   };

//   const handleRemoveSlide = (index) => {
//     setSlides(slides.filter((_, i) => i !== index));
//     setCurrentSlide(1); // Reset current slide to 1 if the removed slide was active
//   };

//   const handleQuestionChange = (e, index) => {
//     const updatedSlides = [...slides];
//     updatedSlides[index].question = e.target.value;
//     setSlides(updatedSlides);
//   };

//   const handleOptionChange = (e, slideIndex, optionIndex) => {
//     const updatedSlides = [...slides];
//     updatedSlides[slideIndex].options[optionIndex].text = e.target.value;
//     setSlides(updatedSlides);
//   };

//   const handleImageChange = (e, slideIndex, optionIndex) => {
//     const updatedSlides = [...slides];
//     updatedSlides[slideIndex].options[optionIndex].image = e.target.value;
//     setSlides(updatedSlides);
//   };

//   const handleSubmit = () => {
//     onSubmit(slides);
//   };

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.container}>
//         <div className={styles.slides}>
//           {slides.map((slide, index) => (
//             <div
//               key={slide.slideNumber}
//               className={styles.slideButtonContainer}
//             >
//               <button
//                 key={slide.slideNumber}
//                 className={`${styles.slideButton} ${
//                   slide.slideNumber === currentSlide ? styles.active : ""
//                 }`}
//                 onClick={() => setCurrentSlide(slide.slideNumber)}
//               >
//                 Slide {slide.slideNumber}
//               </button>
//               {index > 0 && (
//                 <img
//                   className={styles.closeSlide}
//                   // src={cross}
//                   alt="close"
//                   onClick={() => handleRemoveSlide(index)}
//                 />
//               )}
//             </div>
//           ))}
//           {slides.length < 6 && (
//             <button onClick={handleAddSlide} className={styles.slideButton}>
//               Add+
//             </button>
//           )}
//         </div>
//         <div className={styles.slideContent}>
//           <input
//             type="text"
//             placeholder="Question"
//             value={slides[currentSlide - 1].question}
//             onChange={(e) => handleQuestionChange(e, currentSlide - 1)}
//           />
//           {slides[currentSlide - 1].options.map((option, optionIndex) => (
//             <div key={optionIndex}>
//               <input
//                 type="text"
//                 placeholder="Option"
//                 value={option.text}
//                 onChange={(e) => handleOptionChange(e, currentSlide - 1, optionIndex)}
//               />
//               <input
//                 type="text"
//                 placeholder="Image URL"
//                 value={option.image}
//                 onChange={(e) => handleImageChange(e, currentSlide - 1, optionIndex)}
//               />
//             </div>
//           ))}
//         </div>
//         <div className={styles.actions}>
//           <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
//           <button onClick={handleSubmit} className={styles.createButton}>Create Quiz</button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import styles from "./QuizForm2.module.css";
import cross from "../../utils/cross.png";
export default function QuizForm2({ onSubmit, onCancel }) {
  const [slides, setSlides] = useState([
    { slideNumber: 1, question: "", options: [{ text: "", image: "" }] },
  ]);
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleAddSlide = () => {
    if (slides.length < 6) {
      setSlides([
        ...slides,
        {
          slideNumber: slides.length + 1,
          question: "",
          options: [{ text: "", image: "" }],
        },
      ]);
    }
  };

  const handleRemoveSlide = (index) => {
    setSlides(slides.filter((_, i) => i !== index));
    setCurrentSlide(1); // Reset current slide to 1 if the removed slide was active
  };

  const handleQuestionChange = (e, index) => {
    const updatedSlides = [...slides];
    updatedSlides[index].question = e.target.value;
    setSlides(updatedSlides);
  };

  const handleOptionChange = (e, slideIndex, optionIndex) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].options[optionIndex].text = e.target.value;
    setSlides(updatedSlides);
  };

  const handleImageChange = (e, slideIndex, optionIndex) => {
    const updatedSlides = [...slides];
    updatedSlides[slideIndex].options[optionIndex].image = e.target.value;
    setSlides(updatedSlides);
  };

  const handleSubmit = () => {
    onSubmit(slides);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.slides}>
          <div className={styles.slide}>
            {slides.map((slide, index) => (
              <div
                key={slide.slideNumber}
                className={styles.slideButtonContainer}
              >
                <button
                  key={slide.slideNumber}
                  className={`${styles.slideButton} ${
                    slide.slideNumber === currentSlide ? styles.active : ""
                  }`}
                  onClick={() => setCurrentSlide(slide.slideNumber)}
                >
                  {slide.slideNumber}
                </button>
                {index > 0 && (
                  <img
                    className={styles.closeSlide}
                    src={cross}
                    alt="close"
                    onClick={() => handleRemoveSlide(index)}
                  />
                )}
              </div>
            ))}
            {slides.length < 6 && (
              <button onClick={handleAddSlide} className={styles.plus}>
                +
              </button>
            )}
          </div>
          <div>
            <p>Max 5 questions</p>
          </div>
        </div>
        <div className={styles.questions}>
          <input
            type="text"
            placeholder="Question"
            value={slides[currentSlide - 1].question}
            onChange={(e) => handleQuestionChange(e, currentSlide - 1)}
            className={styles.questionInput}
          />
        </div>
        <div className={styles.optionType}>
          <label>Option Type</label>
          <div className={styles.radioButtons}>
            <label>
              <input type="radio" name="optionType" value="text" />
              Text
            </label>
            <label>
              <input type="radio" name="optionType" value="imageUrl" />
              Image URL
            </label>
            <label>
              <input type="radio" name="optionType" value="textImageUrl" />
              Text & Image URL
            </label>
          </div>
        </div>
        <div>
          {slides[currentSlide - 1].options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="text"
                placeholder="Option"
                value={option.text}
                onChange={(e) =>
                  handleOptionChange(e, currentSlide - 1, optionIndex)
                }
                className={styles.optionInput}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={option.image}
                onChange={(e) =>
                  handleImageChange(e, currentSlide - 1, optionIndex)
                }
                className={styles.optionInput}
              />
            </div>
          ))}
          <div className={styles.timerOptions}>
            <label>Timer:</label>
            <div className={styles.radioButtons}>
              <label>
                <input type="radio" name="timer" value="off" checked />
                Off
              </label>
              <label>
                <input type="radio" name="timer" value="5sec" />5 sec
              </label>
              <label>
                <input type="radio" name="timer" value="10sec" />
                10 sec
              </label>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSubmit} className={styles.createButton}>
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
