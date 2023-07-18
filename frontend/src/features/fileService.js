import axios from "axios";

// development
const API_URL = "http://localhost:5000/api/files";

// production
// const API_URL = "";

export const getFiles = async (userId, token) => {
  const response = await axios.get(API_URL + `/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const uploadFile = async (userId, token, file) => {
  const reqBody = {
    userId: userId,
    name: file.name,
    size: file.size,
  };
  const response = await axios.post(API_URL + "/upload", reqBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteFile = async (fileId, token) => {
  const response = await axios.delete(API_URL + `/delete/${fileId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
