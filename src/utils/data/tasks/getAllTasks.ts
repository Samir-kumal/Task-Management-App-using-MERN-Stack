import axios, { AxiosError } from "axios";
import { URL, UserDataProps } from "../../../context/AuthProvider";

export const getAllTasks = async(token:string, user:UserDataProps)=>{
    if(token && user){
        try {
            const response = await axios.get(`${URL}/${user?._id}/allTasks`, {
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
}