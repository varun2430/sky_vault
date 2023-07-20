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

export const getObjectUrl = async (objectKey, token) => {
  const response = await axios.get(API_URL + `/aws/${objectKey}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const uploadFile = async (userId, token, data) => {
  const response = await axios.post(API_URL + `/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteFile = async (fileId, token) => {
  const response = await axios.delete(API_URL + `/${fileId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
