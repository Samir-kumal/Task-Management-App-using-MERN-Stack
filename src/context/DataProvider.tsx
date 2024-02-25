import axios, { AxiosError } from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { URL } from "./AuthProvider";
import useAuthProvider from "../hooks/useAuthProvider";
import { getTasksData } from "../helper/getTasksData";
interface DataContextValue {
  data: Data[] | null;
  tasksData: Task[] | null;
  boardID: string;
  createBoard: (boardName: string) => Promise<void>;
  updateBoard: (boardID: string, boardName: string) => Promise<void>;
  deleteBoard: (boardID: string) => Promise<void>;
  createTask: (
    boardID: string,
    title: string,
    content: string,
    status: string,
    token: string
  ) => Promise<void>;
  deleteTask: (taskID: string, token: string) => Promise<void>;
  updateTask: (
    taskID: string,
    title: string,
    content: string,
    status: string,
    token: string
  ) => Promise<void>;
  getTaskData: (boardID: string, token: string) => Promise<void>;
  setBoardID: (boardID: string) => void;
}
interface Data {
  _id: string;
  title: string;
  tasks: string[];
}
export interface Task {
  _id: string;
  title: string;
  content: string;
  status: string;
}

interface childrenProps {
  children: React.ReactNode;
}
const token = localStorage.getItem("token");
export const DataContext = createContext<DataContextValue | null>(null);

const DataProvider: React.FC<childrenProps> = ({ children }) => {
  const [data, setData] = useState<Data[] | null>([]);
  const [tasksData, setTasksData] = useState<Task[] | null>([]);
  const [boardID, setBoardID] = useState<string>("");
  const { user } = useAuthProvider();
  console.log(user);


  // This function creates the board and updates the state with the new board data
  const createBoard = async (boardName: string) => {
    try {
      if (user) {
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
        getBoardData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // This function gets the board data and updates the state with the new board data
  const getBoardData = useCallback( async () => {
    if (user && token) {
      try {
        const response = await axios.get(`${URL}/boards/${user?.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        console.log(response);
        setData(data);

        if (data.length > 0 && boardID.length === 0) {
          setBoardID(data[0]?._id);
          getTaskData(data[0]?._id, token);
        } else if (boardID.length > 0) {
          getTaskData(boardID, token);
        } else if (data.length === 0) {
          setData([]);
        }
      } catch (error) {
        console.log(error);
        setData(null);
      }
    }
  },[user, boardID]);
  // This function updates the board and updates the state with the new board data
  const updateBoard = async (boardID: string, boardName: string) => {
    try {
      if (user !== null && token !== null && boardID !== "" && boardName !== "") { 
        const response = await axios.put(
          `${URL}/updateBoard/${boardID}`,
          {
            title: boardName,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log(data);
        getBoardData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // This function deletes the board and updates the state with the new board data
  const deleteBoard = async (boardID: string) => {
    try {
      const response = await axios.delete(`${URL}/deleteBoard/${boardID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      console.log(data);
      getBoardData();
      setTasksData([]);
    } catch (error) {
      console.log(error);
    }
  };
  const createTask = async (
    boardID: string,
    title: string,
    content: string,
    status: string,
    token: string
  ) => {
    try {
      const response = await axios.post(
        `${URL}/createTask/${boardID}`,
        {
          title: title,
          content: content,
          status: status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      if (!boardID) {
        getTaskData(data[0]._id, token);
      } else {
        getTaskData(boardID, token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTaskData = async (boardID: string, token: string) => {
    if (user) {
      try {
        const data = await getTasksData(boardID, token);
        console.log("task data", data);
        setTasksData(data);
      } catch (error) {
        console.log(error);
        console.log("error occurred in the task data")
        setTasksData(null);
      }
    }
  };

  // This function deletes the task and updates the state with the new task data
  const deleteTask = async (taskID: string, token: string) => {
    try {
      const response = await axios.delete(`${URL}/deleteTask/${taskID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      console.log(data);
      getTaskData(boardID, token);
    } catch (error: AxiosError | any) {
      console.log(error);
    }
  };
  const updateTask = async (
    taskID: string,
    title: string,
    content: string,
    status: string,
    token: string
  ) => {
    try {
      const response = await axios.put(
        `${URL}/updateTask/${taskID}`,
        {
          title: title,
          content: content,
          status: status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      console.log(data);
      getTaskData(boardID, token);
    } catch (error: AxiosError | any) {
      console.log(error);
    }
  };
 // This function gets the task data and updates the state with the new task data
  
  useEffect(() => {
    getBoardData();
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        data,
        tasksData,
        boardID,
        createBoard,
        updateBoard,
        deleteBoard,
        createTask,
        getTaskData,
        setBoardID,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
