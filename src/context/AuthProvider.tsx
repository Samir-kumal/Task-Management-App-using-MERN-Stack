import React, { createContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { login } from "../utils/auth/login";
import { fetchUserData } from "../utils/data/user/fetchUserData";
import { verifyUserEmail } from "../utils/auth/verifyUserEmail";
import { register } from "../utils/auth/register";
import { AxiosError } from "axios";

export interface AuthContextProps {
  user: UserDataProps | null;
  token: string | null;
  logout: () => void;
  registerUser: (values: {
    username: string;
    email: string;
    password: string;
  }) => Promise<{ message: string; success: boolean } | undefined>;
  loginUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error: AxiosError | string }>;
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

// export const URL = "http://localhost:9001";

export const URL = "https://node-js-backend-task-management-app-ten.vercel.app";
const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const [user, setUser] = useState<UserDataProps | null>(null);
  const [token, setToken] = useLocalStorage("token", null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (token) {
      return true;
    } else {
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

  // Function to get user data
  const getUserData = useCallback(async () => {
    const result = await fetchUserData(token);
    if (result?.data && result.success === true) {
      setUser(result.data);
    }
  }, [token]);

  // Function to register User

  const registerUser = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    const result = await register(values);
    if (result.message) {
      return result;
    }
  };
  // Function to verify User Email

  const verifyEmail = async (emailToken: string) => {
    console.log("email Token", emailToken);
    const result = await verifyUserEmail(emailToken);
    return result;
  };

  // Function to Login User

  const loginUser = async (email: string, password: string) => {
    const result = login(email, password);
    setToken((await result).data);
    return result;
  };

  // Function to logout User
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    let ismounted = true;
    if (ismounted) {
      getUserData();
    }
    return ()=> {
      ismounted = false;
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        logout,
        registerUser,
        loginUser,
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
