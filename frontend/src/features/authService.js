import axios from "axios";

const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;

export const login = async (userData) => {
  const response = await axios.post(AUTH_API_URL + "/login", userData);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(AUTH_API_URL + "/register", userData);
  return response.data;
};
