import axios from "axios";
import { VITE_API_URL } from "../config/env";
import {  useNavigate } from "react-router";


export const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
  // timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] =
        `Bearer ` + localStorage.getItem("token");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (config) {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] =
        `Bearer ` + localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    const navigate = useNavigate();
    console.log(error.status);
    if(error.status === 401){
      alert("Login Please")
      navigate("/login")
    }
    return Promise.reject(error);
  }
);

// export const postApi = ({url : string , })=>{

// }
