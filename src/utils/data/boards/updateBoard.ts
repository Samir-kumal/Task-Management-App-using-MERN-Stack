import axios, { AxiosError } from "axios";
import { URL } from "../../../context/AuthProvider";

export const updateBoard = async (
  boardID: string,
  token: string,
  boardName: string
) => {
  try {
    if (token  && boardID !== "" && boardName !== "") {
      const response = await axios.put(`${URL}/updateBoard/${boardID}`,
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
