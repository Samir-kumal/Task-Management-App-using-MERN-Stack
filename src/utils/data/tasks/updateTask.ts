import axios, { AxiosError } from "axios";
import { URL } from "../../../context/AuthProvider";

export const updateTask = async (
  taskID: string,
  boardID:string,
  title: string,
  content: string,
  status: string,
  priority: string,
  token: string
) => {

  try {
    const response = await axios.put(
      `${URL}/updateTask/${boardID}/${taskID}`,
      {
        title: title,
        content: content,
        status: status,
        priority: priority,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = response.data;
    console.log(data);
    return { data, status: response.status, success: true };
  }   catch (error) {
    if (error instanceof AxiosError){
      console.log("error response", error.response);
      console.log("error status", error.response?.status);
    return {error, status:error.response?.status, success: false};

    }else {
      return {error, status: 500, success: false};
    }
  }
};
