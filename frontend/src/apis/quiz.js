import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const createQuiz = async (quizData) => {
  try {
    const reqUrl = `${backendUrl}/quiz/createQuiz`;
    const response = await axios.post(reqUrl, quizData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
