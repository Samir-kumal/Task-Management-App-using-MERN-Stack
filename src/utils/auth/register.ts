import axios, { AxiosError } from "axios";
import { URL } from "../../context/AuthProvider";
export const register = async (values: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${URL}/register`, {
      name: values.username,
      email: values.email,
      password: values.password,
    });
    console.log(response.data.message);
    return { message: response.data.message, success: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
      return { message: error.response?.data.message, success: false };
    }
    return { message: "Error while registering the user", success: false };
  }
};
