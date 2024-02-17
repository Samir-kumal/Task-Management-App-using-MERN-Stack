import { useEffect, useState } from "react";
import TaskBox from "./Common/TaskBox";
import useDataProvider from "../hooks/useDataProvider";
import UpdateTaskModal from "./Common/UpdateTaskModal";

interface Task {
  _id: string; // Assuming _id is a string
  status: string; // Assuming status is a string
}

interface TasksByStatus {
  [status: string]: Task[];
}

const TaskList = () => {
  const [tasksByStatus, setTasks] = useState<TasksByStatus | null>(null);
  const { tasksData } = useDataProvider();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const newTasks: TasksByStatus = {};
    if (tasksData) {
      tasksData.forEach((task: Task) => {
        const { status } = task;
        if (!newTasks[status]) {
          newTasks[status] = [];
        }
        newTasks[status].push(task);
      });

      Object.keys(newTasks).forEach((status) => {
        newTasks[status].sort((a, b) => {
          const order = { todo: 0, doing: 1, done: 2 };
          return order[a.status] - order[b.status];
        });
      });
  
      setTasks(newTasks);
    }
  }, [tasksData]);

  const handleClick = (task: Task) => {
    setModalVisible(true);
    setSelectedTask(task);
  };

  return (
    <>
      <div className="w-full  h-[calc(100vh-4rem)] overflow-y-scroll grid lg:grid-cols-3 gap-x-4 md:grid-cols-2 grid-cols-1">
        {tasksByStatus &&
          Object.entries(tasksByStatus).map(([status, tasks]) => (
            <div key={status} className="w-full pt-2 ">
              <div className="flex flex-row items-center jutify-center px-4">
                <div
                  className={`h-3 w-3 rounded-full ${
                    status === "todo"
                      ? "bg-red-500"
                      : status === "doing"
                      ? "bg-orange-500"
                      : "bg-green-500"
                  }`}
                ></div>
                <h2 className="font-semibold text-lg px-3 font-sans">
                  {status}
                </h2>
              </div>
              <ul>
                {tasks.map((task) => (
                  <TaskBox
                    handleClick={handleClick}
                    key={task._id}
                    task={task}
                  />
                ))}
              </ul>
            </div>
          ))}
      </div>
      {modalVisible && (
        <UpdateTaskModal
          setModalVisible={setModalVisible}
          selectedTask={selectedTask}
        />
      )}
    </>
  );
};

export default TaskList;
