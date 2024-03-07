import axios, { AxiosError } from "axios";
import { URL } from "../../../context/AuthProvider";
import { Priority } from "../../../context/DataProvider";
export const createTask = async (
  boardID: string,
  title: string,
  content: string,
  status: string,
  priority:Priority,
  token: string
) => {
  try {
    if (boardID && title && content && status && priority && token) {
      const response = await axios.post(
        `${URL}/createTask/${boardID}`,
        {
          title: title,
          content: content,
          status: status,
          priority:priority
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      return {data, status: response.status, success: true};
    }
  } catch (error:AxiosError | any) {
    console.log(error);
    return {error, status:error.response.status, success: false};
  }
};
