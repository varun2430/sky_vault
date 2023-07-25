import axios from "axios";
import { AES, enc } from "crypto-js";

const FILE_API_URL = import.meta.env.VITE_FILE_API_URL;

export const getFiles = async (userId, token) => {
  const response = await axios.get(FILE_API_URL + `/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getObjectUrl = async (objectKey, token) => {
  const response = await axios.get(FILE_API_URL + `/aws/${objectKey}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const downloadFile = async (
  objectKey,
  fileName,
  token,
  encryption_key
) => {
  const resData = await getObjectUrl(objectKey, token);
  const objectUrl = resData.url;
  const response = await axios.get(objectUrl, { responseType: "arraybuffer" });
  const decoder = new TextDecoder();
  const base64String = decoder.decode(response.data);
  const bytes = AES.decrypt(base64String, encryption_key);
  const decryptedString = bytes.toString(enc.Utf8);
  const binaryString = atob(decryptedString);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  const url = URL.createObjectURL(new Blob([byteArray]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const readFileAsync = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      resolve(binaryString);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsBinaryString(file);
  });
};

export const uploadFile = async (userId, file, token, encryption_key) => {
  const binaryString = await readFileAsync(file);
  const base64String = btoa(binaryString);
  const encryptedString = AES.encrypt(base64String, encryption_key).toString();
  const formData = new FormData();
  formData.append("file", encryptedString);
  formData.append("name", file.name);
  formData.append("size", file.size);
  const response = await axios.post(FILE_API_URL + `/${userId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteFile = async (fileId, token) => {
  const response = await axios.delete(FILE_API_URL + `/${fileId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
