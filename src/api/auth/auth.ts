import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../handler";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {  setCredentials } from "../../redux/User/userSlice";
import type { AppDispatch } from "../../redux/store";

export const useLogin = async () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      axiosInstance.post("/auth/login", payload),
    onSuccess: (responseData) => {
      dispatch(setCredentials(responseData.data));
    },
  });
};

export const useRegister = async () => {
  // const user = await usePostAxios("/login",data,)
  return useMutation({
    mutationFn: (payload: {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
    }) => axiosInstance.post("/user/register", payload),
    onSuccess: (responseData) => {
      localStorage.setItem("token", responseData.data.token);
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
};
