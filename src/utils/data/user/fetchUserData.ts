import axios, { AxiosError } from "axios";
import { URL } from "../../../context/AuthProvider";
export const fetchUserData = async (token: string) => {
  if (token) {
    try {
      const response = await axios.get(`${URL}/getUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      console.log(data.data);
      return { data: data.data, success: true };
    } catch (error: AxiosError | any) {
      console.log(error);
      return { error: error.response.data.message, success: false };
    }
  }
};
