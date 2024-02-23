import axios, { AxiosError } from "axios";
import { useState } from "react";
import useAuthProvider from "./useAuthProvider";
import { URL } from "../context/AuthProvider";
const useLogin = () => {

  const { getUserData } = useAuthProvider();
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${URL}/login`, {
        email: email,
        password: password,
      });
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
     
      getUserData();
      return true;
    } catch (error: AxiosError | any) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  };
    return { login };
};

export default useLogin;
