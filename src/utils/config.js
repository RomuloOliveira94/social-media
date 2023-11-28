import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
  },
});

export const apiWithFiles = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
  },
});

export const uploads = import.meta.env.VITE_UPLOADS_URL;
