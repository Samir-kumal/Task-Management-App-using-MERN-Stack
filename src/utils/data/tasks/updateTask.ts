import axios, { AxiosError } from "axios";
import { URL } from "../../../context/AuthProvider";

export const updateTask = async (
  taskID: string,
  title: string,
  content: string,
  status: string,
  token: string
) => {
  try {
    const response = await axios.put(
      `${URL}/updateTask/${taskID}`,
      {
        title: title,
        content: content,
        status: status,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = response.data;
    console.log(data);
    return { data, status: response.status, success: true };
  } catch (error: AxiosError | any) {
    console.log(error);
    return { error, status: error.response.status, success: false };
  }
};
