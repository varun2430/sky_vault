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

export const downloadFile = async (objectKey, fileName, token) => {
  const resData = await getObjectUrl(objectKey, token);
  const objectUrl = resData.url;
  const response = await axios({
    url: objectUrl,
    method: "GET",
    responseType: "arraybuffer",
  });
  const url = URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const uploadFile = async (userId, file, token) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(API_URL + `/${userId}`, formData, {
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
