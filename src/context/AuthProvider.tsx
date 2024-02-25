import axios, { AxiosError } from "axios";
import React, { createContext, useState, useEffect } from "react";

export interface AuthContextProps {
  user: UserDataProps | null;
  responseMessage: ResponseMessageType | null;
  logout: () => void;
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
  userEmail: string;
  iat: number;
  exp: number;
}
export const AuthContext = createContext<AuthContextProps | null>(null);

const token = localStorage.getItem("token");
export const URL = "http://localhost:9001";
// export const URL = "https://backend-service-for-task-management.onrender.com";
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


// Function to get user data
  const getUserData =  async () => {
    if (token) {
      try {
        const response = await axios.get(`${URL}/getUser`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        console.log(data.data);
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data.userId));
      } catch (error: AxiosError | any) {
        console.log(error);
      }
    }
  };
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setResponseMessage({
      message:"",
      isSuccess:undefined
    })
  };

 

  return (
    <AuthContext.Provider
      value={{ user, logout, responseMessage, getUserData, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
