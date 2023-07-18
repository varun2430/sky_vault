import axios from "axios";

// development
const API_URL = "http://localhost:5000/api/auth";

// production
// const API_URL = "";

export const login = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData);
  return response.data;
};
