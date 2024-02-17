// useTasks.ts
import { useState, useEffect } from "react";
import { getTasksData } from "../helper/getTasksData";
interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
  }
export const useFetchTasks = (boardID: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchTasksData = async () => {
      const tasksData = await getTasksData(boardID, token);
      setTasks(tasksData);
    };

    fetchTasksData();
  }, [boardID]);

  return tasks;
};