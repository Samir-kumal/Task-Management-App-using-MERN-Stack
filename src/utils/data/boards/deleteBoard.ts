import axios, { AxiosError } from "axios";
import { URL } from "../../../context/AuthProvider";

export const deleteBoard = async (boardID: string, token: string) => {
  try {
    const response = await axios.delete(`${URL}/deleteBoard/${boardID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    console.log(data);
    return { data, status: response.status, success: true};
  } catch (error: AxiosError | any) {
    console.log(error);
    return { error, status: error.response.status, success : false};
  }
};
