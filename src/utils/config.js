import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
  },
});

export const uploads = axios.create({
  baseURL: "http://localhost:5000/uploads",
});


