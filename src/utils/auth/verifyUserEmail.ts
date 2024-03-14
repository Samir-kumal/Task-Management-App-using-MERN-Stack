import axios, { AxiosError } from "axios";
import { URL } from "../../context/AuthProvider";
export const verifyUserEmail = async (emailToken: string) => {
    if (emailToken) {
      try {
        const response = await axios.post(`${URL}/verify-email`, {
          emailToken,
        });
        const data = response.data;
        console.log(data);
        return { message: data.message, success: true };
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data.message);
          return { message: error.response?.data.message, success: false };
        }
        return { message: "Error while registering the user", success: false };
      }
    }
  };