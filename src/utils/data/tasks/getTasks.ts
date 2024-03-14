import axios, { AxiosError } from "axios";
import { URL } from "../../../context/AuthProvider";
const abortController = new AbortController();
const signal = abortController.signal;
export const getTasks = async (boardID: string, token: string) => {
  if (boardID && token) {
    try {
      const response = await axios.get(`${URL}/tasks/${boardID}`, {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      });
      const data = response.data;
      console.log("task data", data);
      return { data, status: response.status, success: true };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error response", error.response);
        console.log("error status", error.response?.status);
        return { error, status: error.response?.status, success: false };
      } else {
        return { error, status: 500, success: false };
      }
    }
  }
};
export const cancelRequest = () => {
  abortController.abort();
};
