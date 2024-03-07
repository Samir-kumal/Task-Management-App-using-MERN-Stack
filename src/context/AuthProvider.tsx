import axios, { AxiosError } from "axios";
import React, { createContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
// import useLogin from "../hooks/useLogin";

export interface AuthContextProps {
  user: UserDataProps | null;
  token: string | null;
  logout: () => void;
  login: ( email: string, password: string ) => Promise<{success:boolean,error: any}>;
  getUserData: () => void;
  isLoggedIn: boolean;
  verifyEmail: (
    token: string
  ) => Promise<{ message: string; success: boolean } | undefined>;
}

interface AuthProps {
  children: React.ReactNode;
}
export interface UserDataProps {
  _id: string;
  userName: string;
  userId: string;
  userEmail: string;
  iat: number;
  exp: number;
}
export const AuthContext = createContext<AuthContextProps | null>(null);

export const URL = "http://localhost:9001";
// export const URL = "https://backend-service-for-task-management.onrender.com";
const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const [user, setUser] = useState<UserDataProps | null>(null);

  const [token,setToken] = useLocalStorage("token", null);
  const [isLoggedIn,setIsLoggedIn] = useState(()=>{
    if(token){
      return true;
    }else{
      return false;
    }
  
  });

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);
  console.log(isLoggedIn);
 

  // Function to get user data
  const getUserData = useCallback(async () => {
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
  },[token]);
  const verifyEmail = async (emailToken: string) => {
    console.log(emailToken);
    if (emailToken) {
      try {
        const response = await axios.post(`${URL}/verify-email`, {
          emailToken,
        });
        const data = response.data;
        console.log(data);
        return { message: data.message, success: true };
      } catch (error: AxiosError | any) {
        console.log(error);
        return { message: error.response.data.message, success: false };
      }
    }
  };
  const logout = () => {
    setToken(null)
    setUser(null);
   
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${URL}/login`, {
        email: email,
        password: password,
      });
      console.log(response.data.token);
      setToken(response.data.token);
        return {success:true, error:""};

    } catch (error: AxiosError | any) {
      console.log(error.response.data.message);
      return {success:false,error:error.response.data.message};
    }
  };

  useEffect(() => {
    getUserData();
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        logout,
        login,
        getUserData,
        isLoggedIn,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
