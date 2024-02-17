import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

interface User {
  userId: any;
  _id: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
}
export interface AuthContextProps {
  user: User | null;
  responseMessage: ResponseMessageType | null;
  logout: () => void;
  login: (values: { email: string; password: string }) => void;
  getUserData: () => void;
  isLoggedIn: boolean;
}
interface ResponseMessageType {
  message: string;
  isSuccess: boolean | undefined;
}
interface AuthProps {
  children: React.ReactNode;
}
interface UserDataProps {
  _id: string;
  userName: string;
  userId: string;
  iat: number;
  exp: number;
}
export const AuthContext = createContext<AuthContextProps | null>(null);

const token = localStorage.getItem("token");
export const URL = "http://localhost:9001";
const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const [user, setUser] = useState<UserDataProps | null>(null);
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    isSuccess: undefined as boolean | undefined,
  });
  const isLoggedIn = token ? true : false;
  console.log(isLoggedIn);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    if (token) {
      try {
        const response = await axios.get(`${URL}/getUser`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        console.log(data.data);
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data.userId));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };
  const login = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post("http://localhost:9001/login", {
        email: values.email,
        password: values.password,
      });
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      setResponseMessage({
        message: "Login Successful",
        isSuccess: true,
      });

      window.location.replace("/dashboard");
    } catch (error) {
      console.log(error.response.data.message);
      setResponseMessage({
        message: error.response.data.message,
        isSuccess: false,
      });
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, logout, login, responseMessage, getUserData, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
