import axios, { AxiosError } from "axios";
import { URL } from "../../context/AuthProvider";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${URL}/login`, {
      email: email,
      password: password,
    });
    console.log(response.data.token);
    return { success: true, error: "", data : response.data.token};
  } catch (error: AxiosError | any) {
    console.log(error.response.data.message);
    return { success: false, error: error.response.data.message };
  }
};
