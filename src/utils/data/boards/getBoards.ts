import axios, { AxiosError } from "axios";
import { URL, UserDataProps } from "../../../context/AuthProvider";

export const getBoards = async (user: UserDataProps, token: string) => {
  if (user && token) {
    try {
      const response = await axios.get(`${URL}/boards/${user?.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      console.log(response);
      return { data, status: response.status, success: true };
    } catch (error) {
      if (error instanceof AxiosError){
        console.log("error response", error.response);
      return {error, status:error.response?.status, success: false};

      }else {
        return {error, status: 500, success: false};
      }
    }
  }
};
