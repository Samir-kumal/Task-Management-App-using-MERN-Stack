import { createContext, useCallback, useEffect, useState } from "react";
import useAuthProvider from "../hooks/useAuthProvider";
import { createBoard } from "../utils/data/boards/createBoard";
import { getBoards } from "../utils/data/boards/getBoards";
import { updateBoard } from "../utils/data/boards/updateBoard";
import { deleteBoard } from "../utils/data/boards/deleteBoard";
import { createTask } from "../utils/data/tasks/createTask";
import { getTasks } from "../utils/data/tasks/getTasks";
import { deleteTask } from "../utils/data/tasks/deleteTask";
import { updateTask } from "../utils/data/tasks/updateTask";
import { getAllTasks } from "../utils/data/tasks/getAllTasks";
interface DataContextValue {
  data: Data[] | null;
  tasksData: Task[] | null;
  allTasks: Task[] | null;
  boardID: string;
  isLoading: boolean;
  createBoardItem: (boardName: string) => Promise<void>;
  getBoardItems: () => Promise<void>;
  updateBoardItem: (boardID: string, boardName: string) => Promise<void>;
  deleteBoardItem: (boardID: string) => Promise<void>;
  createTaskItem: (
    boardID: string,
    title: string,
    content: string,
    status: string,
    priority: Priority,
    token: string
  ) => Promise<void>;
  deleteTaskItem: (
    taskID: string,
    boardID: string,
    token: string
  ) => Promise<void>;
  updateTaskItem: (
    taskID: string,
    boardID: string,
    title: string,
    content: string,
    status: string,
    priority: Priority,
    token: string
  ) => Promise<void>;
  getTaskItems: (boardID: string, token: string) => Promise<void>;
  getAllTaskItems: (token: string) => Promise<void>;
  setBoardID: (boardID: string) => void;
  setTasksData: (tasksData: Task[] | null) => void;
}
export interface Data {
  _id: string;
  title: string;
  tasks: Task[];
  created: Date;
}
export interface Task {
  _id: string;
  title: string;
  content: string;
  status: string;
  priority: Priority;
}

export type Priority = "low" | "normal" | "high";

export interface childrenProps {
  children: React.ReactNode;
}
export const DataContext = createContext<DataContextValue | null>(null);

const DataProvider: React.FC<childrenProps> = ({ children }) => {
  const [data, setData] = useState<Data[] | null>(null);
  const [tasksData, setTasksData] = useState<Task[] | null>(null);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [boardID, setBoardID] = useState<string>("");
  const { user, token } = useAuthProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // This function creates the board and updates the state with the new board data

  const createBoardItem = async (boardName: string) => {
    if (user && token) {
      const result = await createBoard(boardName, token, user);
      console.log(result?.data);
      if (result?.data && result.success === true) {
        getBoardItems();
      }
    }
  };
  // This function gets the board data and updates the state with the new board data
  const getBoardItems = useCallback(async () => {
    if (user && token) {
      setIsLoading(true);
      const result = await getBoards(user, token);
      if (result?.data && result.success === true) {
        console.log(result.data);
        const data = result.data;
        setData(data);
        setIsLoading(false);
      }
    } else {
      setData(null);
    }
  }, [user,boardID, token]);
  // This function updates the board and updates the state with the new board data
  const updateBoardItem = async (boardID: string, boardName: string) => {
    if (token && boardID.length > 0 && boardName) {
      const result = await updateBoard(boardID, token, boardName);
      if (result?.data && result.success === true) {
        getBoardItems();
      }
    }
  };
  // This function deletes the board and updates the state with the new board data
  const deleteBoardItem = async (boardID: string) => {
    if (boardID !== "" && token !== null) {
      const result = await deleteBoard(boardID, token);
      if (result?.data && result.success === true) {
        getBoardItems();
        console.log("board deleted");
      }
      const deleteBoardItemIndex = data?.findIndex(
        (board) => board._id === boardID
      );
      console.log("deletedBoard Index", deleteBoardItemIndex);
      if (
        data &&
        data.length > 0 &&
        deleteBoardItemIndex &&
        deleteBoardItemIndex !== -1
      ) {
        const nextBoardIndex = deleteBoardItemIndex - 1;
        console.log(nextBoardIndex);
        if (nextBoardIndex !== -1 && nextBoardIndex > 0) {
          setBoardID(data[nextBoardIndex]._id);
          const selectedBoard = data.find(
            (board: Data) => board._id === data[nextBoardIndex]._id
          );
          if (selectedBoard && selectedBoard.tasks.length > 0) {
            getTaskItems(data[nextBoardIndex]._id, token);
          } else {
            setTasksData([]);
          }
        }
      }
    }
  };
  const createTaskItem = async (
    boardID: string,
    title: string,
    content: string,
    status: string,
    priority: Priority,
    token: string
  ) => {
    const result = await createTask(
      boardID,
      title,
      content,
      status,
      priority,
      token
    );
    if (result?.data && result.success === true) {
      getTaskItems(boardID, token);
    }
    if (!boardID && data && data.length > 0) {
      getTaskItems(data[0]._id, token);
    } else {
      getTaskItems(boardID, token);
    }
  };
  const getTaskItems = async (boardID: string, token: string) => {
    if (boardID && token) {
      setIsLoading(true);
      const result = await getTasks(boardID, token);
      if (result?.data && result.success === true) {
        setTasksData(result.data);
        setIsLoading(false);
      }
    }
  };
  const getAllTaskItems = async () => {
    if (token && user) {
      const result = await getAllTasks(token, user?.userId);
      if (result?.data && result.success === true) {
        setAllTasks(result.data);
        // setTasksData(result.data);
        console.log(result.data);
      }
    }
  };

  // This function deletes the task and updates the state with the new task data
  const deleteTaskItem = async (
    taskID: string,
    boardID: string,
    token: string
  ) => {
    const result = await deleteTask(taskID, boardID, token);
    if (result?.data && result.success === true) {
      getTaskItems(boardID, token);
    }
  };
  const updateTaskItem = async (
    taskID: string,
    boardID: string,
    title: string,
    content: string,
    status: string,
    priority: Priority,
    token: string
  ) => {
    const result = await updateTask(
      taskID,
      boardID,
      title,
      content,
      status,
      priority,
      token
    );
    if (result?.data && result.success === true) {
      getTaskItems(boardID, token);
    }
  };
  // This function gets the task data and updates the state with the new task data

  useEffect(() => {
    getBoardItems();

    getAllTaskItems();
  }, [token, user]);

  return (
    <DataContext.Provider
      value={{
        data,
        tasksData,
        allTasks,
        boardID,
        isLoading,
        createBoardItem,
        getBoardItems,
        updateBoardItem,
        deleteBoardItem,
        createTaskItem,
        getTaskItems,
        getAllTaskItems,
        setBoardID,
        setTasksData,
        deleteTaskItem,
        updateTaskItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
