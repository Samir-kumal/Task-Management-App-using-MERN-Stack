import React, { useEffect, useState } from "react";
import TaskBox from "./Common/TaskBox";
import useDataProvider from "../hooks/useDataProvider";
import CreateTaskModal from "./Common/TaskModal";
import UpdateTaskModal from "./Common/UpdateTaskModal";

const TaskList = () => {
  const [tasksByStatus, setTasks] = useState<any[] | null>([]);
  const { tasksData } = useDataProvider();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const newTasks =
      tasksData &&
      tasksData.reduce((acc, task) => {
        acc[task.status] = acc[task.status] || [];
        acc[task.status].push(task);
        return acc;
      }, {});
    setTasks(newTasks);
  }, [tasksData]);

  const handleClick = (task) => {
    setModalVisible(true);
    console.log(task);
    setSelectedTask(task);
  };
  return (
    <>
      <div className="w-full  h-[calc(100vh-4rem)] overflow-y-scroll grid lg:grid-cols-3 gap-x-4 md:grid-cols-2 grid-cols-1">
        {Object.entries(tasksByStatus).length > 0 ? (
          Object.entries(tasksByStatus).map(([status, tasks]) => (
            <div key={status} className="w-full pt-2 ">
              <div className="flex flex-row items-center jutify-center px-4">
                <div
                  className={`h-3 w-3 rounded-full ${
                    (status.toString() === "todo" && "bg-red-500") ||
                    (status.toString() === "doing" && "bg-orange-500") ||
                    (status.toString() === "done" && "bg-green-500")
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
          ))
        ) : (
          <div className=" p-2">No tasks are assigned to this board</div>
        )}
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
