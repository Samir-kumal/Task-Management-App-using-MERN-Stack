import axios, { AxiosError } from "axios";
import { URL } from "../../../context/AuthProvider";

export const deleteTask = async (taskID: string, boardID:string, token: string) => {
  try {
    const response = await axios.delete(`${URL}/deleteTask/${boardID}/${taskID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    console.log(data);
    return {data, status: response.status, success: true};
  } catch (error: AxiosError | any) {
    return {error, status:error.response.status, success: false};
  }
};
