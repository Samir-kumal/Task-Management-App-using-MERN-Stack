import axios, { AxiosError } from "axios";
import { URL, UserDataProps } from "../../../context/AuthProvider";

export const getAllTasks = async(token:string, userID:string)=>{
        try {
            const response = await axios.get(`${URL}/${userID}/allTaskItems`, {
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