import axios, { AxiosError } from "axios";
import { URL, UserDataProps } from "../../../context/AuthProvider";

export const createBoard = async (
  boardName: string,
  token: string,
  user: UserDataProps
) => {
  try {
    if (user && token && boardName) {
      const response = await axios.post(
        `${URL}/createBoard/${user?.userId}`,
        {
          title: boardName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      console.log(data);
      return {data, status: response.status, success: true};
    }
  }  catch (error) {
    if (error instanceof AxiosError){
      console.log("error response", error.response);
    return {error, status:error.response?.status, success: false};

    }else {
      return {error, status: 500, success: false};
    }
  }
};
