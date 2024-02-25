import {  useState } from "react";
import TaskBox from "./Common/TaskBox";
import useDataProvider from "../hooks/useDataProvider";
import UpdateTaskModal from "./Common/UpdateTaskModal";
import LoadingComponent from "./Common/LoadingComponent";

export interface Task {
  _id: string;
  status: string;
  title: string;
  content: string;
}


const TaskList = () => {
  const { tasksData } = useDataProvider();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  console.log(tasksData ?? tasksData);

 

  const handleClick = (task: Task) => {
    setModalVisible(true);
    setSelectedTask(task);
  };

  return (
    <>
      <div className="w-full  h-[calc(100vh-4rem)] overflow-y-scroll px-4 grid lg:grid-cols-3 gap-x-4 md:grid-cols-2 grid-cols-1">
        {tasksData ? (
          <>
            <div className="">
              <div className="flex flex-row items-center jutify-center px-4">
                <div className={`h-3 w-3 rounded-full ${"bg-red-500"}`}></div>
                <h2 className="font-semibold text-lg px-3 font-sans">Todo</h2>
              </div>
              {tasksData
                .filter((task: Task) => task.status === "todo")
                .map((task: Task) => (
                  <TaskBox
                    handleClick={handleClick}
                    key={task._id}
                    task={task}
                  />
                ))}
            </div>
            <div className="">
              <div className="flex flex-row items-center jutify-center px-4">
                <div
                  className={`h-3 w-3 rounded-full ${"bg-yellow-500"}`}
                ></div>
                <h2 className="font-semibold text-lg px-3 font-sans">Doing</h2>
              </div>
              {tasksData
                .filter((task: Task) => task.status === "doing")
                .map((task: Task) => (
                  <TaskBox
                    handleClick={handleClick}
                    key={task._id}
                    task={task}
                  />
                ))}
            </div>
            <div className="">
              <div className="flex flex-row items-center jutify-center px-4">
                <div className={`h-3 w-3 rounded-full ${"bg-green-500"}`}></div>
                <h2 className="font-semibold text-lg px-3 font-sans">Done</h2>
              </div>
              {tasksData
                .filter((task: Task) => task.status === "done")
                .map((task: Task) => (
                  <TaskBox
                    handleClick={handleClick}
                    key={task._id}
                    task={task}
                  />
                ))}
            </div>
          </>
        ) : tasksData && tasksData.length === 0 && tasksData !== null ? (
          <div className="w-full h-full flex justify-center items-start py-20">
            <LoadingComponent />
          </div>
        ) : (
          <div className="w-full h-full flex justify-center  items-start py-20 ">
            No tasks found Create a new task
          </div>
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
