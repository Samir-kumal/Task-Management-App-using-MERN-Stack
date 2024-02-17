import axios from "axios";
import { URL } from "../context/AuthProvider";

// tasks.ts
export const getTasksData = async (boardID: string, token: string) => {
    const response = await axios.get(`${URL}/tasks/${boardID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };