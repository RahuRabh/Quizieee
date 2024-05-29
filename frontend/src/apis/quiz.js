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

export const getQuizById = async (id) => {
  try {
    const reqUrl = `${backendUrl}/quiz/playQuiz/${id}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getQuizByUser = async (userId) => {
  try {
    const reqUrl = `${backendUrl}/quiz/getQuizByUser/${userId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const questionWiseAnalysis = async (quizId) => {
  try {
    const reqUrl = `${backendUrl}/quiz/questionWiseAnalysis/${quizId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuizById = async (quizId) => {
  try {
    const reqUrl = `${backendUrl}/quiz/deleteQuizById/${quizId}`;
    const response = await axios.put(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestionStats = async (quizId, slideId, stats) => {
  try{
    const reqUrl = `${backendUrl}/quiz/${quizId}/slide/${slideId}`
    const response = await axios.post(reqUrl, stats);
    console.log(response);
  }catch(error){
    console.log(error);
  }
};
