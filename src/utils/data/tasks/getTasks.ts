import axios, { AxiosError } from "axios";
import { URL } from "../../../context/AuthProvider";

export const getTasks = async (boardID: string, token: string) => {
  if (boardID && token) {
    try {
      const response = await axios.get(`${URL}/tasks/${boardID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      console.log("task data", data);
      return {data, status: response.status, success: true};
    } catch (error: AxiosError | any) {
      console.log(error);
      console.log("error occurred in the task data");
      return {error, status:error.response.status, success: false};
    }
  }
};
