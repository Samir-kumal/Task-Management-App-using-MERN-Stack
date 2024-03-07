import useDataProvider from "./useDataProvider";
import { Task } from "../context/DataProvider";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import useAuthProvider from "./useAuthProvider";

const useFetchAllTasks = (fetchType: string) => {
  const {allTasks, tasksData, getTaskItems } = useDataProvider();
  const { token } = useAuthProvider();
  const params = useParams();

  if (fetchType !== "boardTask") {
    const tasks = useMemo(() => {
      const todoTasks = allTasks?.filter(
        (task: Task) => task.status === "todo"
      );
      const doingTasks = allTasks?.filter(
        (task: Task) => task.status === "doing"
      );
      const doneTasks = allTasks?.filter(
        (task: Task) => task.status === "done"
      );

      return { todoTasks, doingTasks, doneTasks };
    }, [allTasks]);

    const { todoTasks, doingTasks, doneTasks } = tasks;

    const tasksPercentage = useMemo(() => {
      const todoTasksPercentage =
        todoTasks && allTasks && (todoTasks?.length / allTasks?.length) * 100;
      const doingTasksPercentage =
        doingTasks && allTasks && (doingTasks?.length / allTasks?.length) * 100;
      const doneTasksPercentage =
        doneTasks && allTasks && (doneTasks?.length / allTasks?.length) * 100;
      return { todoTasksPercentage, doingTasksPercentage, doneTasksPercentage };
    }, [todoTasks, doingTasks, doneTasks, allTasks]);

    return { tasks, tasksPercentage };
  } else {
    useEffect(() => {
      if (params.boardID && token) {
        getTaskItems(params.boardID, token);
      }
    }, [params.boardID]);
    const tasks = useMemo(() => {
      const todoTasks = tasksData?.filter(
        (task: Task) => task.status === "todo"
      );
      const doingTasks = tasksData?.filter(
        (task: Task) => task.status === "doing"
      );
      const doneTasks = tasksData?.filter(
        (task: Task) => task.status === "done"
      );

      return { todoTasks, doingTasks, doneTasks };
    }, [tasksData]);

    const { todoTasks, doingTasks, doneTasks } = tasks;

    const tasksPercentage = useMemo(() => {
      const todoTasksPercentage =
        todoTasks && tasksData && (todoTasks?.length / tasksData?.length) * 100;
      const doingTasksPercentage =
        doingTasks &&
        tasksData &&
        (doingTasks?.length / tasksData?.length) * 100;
      const doneTasksPercentage =
        doneTasks && tasksData && (doneTasks?.length / tasksData?.length) * 100;
      return { todoTasksPercentage, doingTasksPercentage, doneTasksPercentage };
    }, [todoTasks, doingTasks, doneTasks, tasksData]);

    return { tasks, tasksPercentage };
  }
};

export default useFetchAllTasks;
