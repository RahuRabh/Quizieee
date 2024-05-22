import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  try {
    const reqUrl = `${backendUrl}/auth/register`;
    const response = await axios.post(reqUrl, { name, email, password, confirmPassword });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/login`;
    const response = await axios.post(reqUrl, { email, password });
    return response.data;
    // if (response.data.errorMessage) {
    //   throw new Error(response.data.errorMessage);
    // }

    // return response.data.message;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};
