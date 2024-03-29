import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { Task } from "../../context/DataProvider";
import React from "react";

interface TasksPercentageProps {
  todoTasksPercentage: number | undefined | null;
  doingTasksPercentage: number | undefined | null;
}

interface TasksProps extends TasksPercentageProps {
  todoTasks: Task[] | undefined;
  doingTasks: Task[] | undefined;
  doneTasks: Task[] | undefined;
}

const TaskTrackRecord: React.FC<TasksProps> = ({ ...props }) => {
  const {
    todoTasks,
    doingTasks,
    doneTasks,
    todoTasksPercentage,
    doingTasksPercentage,
  } = props;
  return (
    <section className="grid w-11/12  lg:grid-cols-3 md:grid-cols-2 grid-cols-1   lg:gap-10  md:gap-6 gap-6">
      <div className="h-32 lg:w-72 md:w-60 w-10/12 m-auto bg-blue-300 rounded-xl flex flex-row items-center justify-center">
        <CircularProgressWithLabel
          type={"success"}
          value={doingTasksPercentage ? doingTasksPercentage : 0}
        />
        <div className="flex flex-col items-center text-black justify-center">
          <h2>This week</h2>
          <h1 className="text-3xl font-bold">{doingTasks?.length}</h1>
          <h3>Ongoing task</h3>
        </div>
      </div>
      <div className="h-32 lg:w-72 md:w-60 w-10/12 m-auto bg-red-500/20 flex flex-row items-center justify-center rounded-xl">
        <CircularProgressWithLabel
          type={"error"}
          value={todoTasksPercentage ? todoTasksPercentage : 0}
        />
        <div className="flex flex-col text-black items-center justify-center">
          <h2>TODO</h2>
          <h1 className="text-3xl font-bold">
            {todoTasks ? todoTasks?.length : 0}
          </h1>
          <h3>Pending task</h3>
        </div>
      </div>
      <div className="h-32 lg:w-72 md:w-60 w-10/12 m-auto bg-green-400/90 rounded-xl flex flex-col items-center justify-center ">
        <h1 className="text-white">Task Completed</h1>
        <h1 className="text-white text-3xl font-bold">
          {doneTasks ? doneTasks?.length : 0}
        </h1>
        <h1 className="text-white ">Well done</h1>
      </div>
    </section>
  );
};

export default TaskTrackRecord;
