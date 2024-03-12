import {useState } from "react";
import TaskBox from "./Common/TaskBox";
import useDataProvider from "../hooks/useDataProvider";
import UpdateTaskModal from "./Common/UpdateTaskModal";

import Button from "./Button";
import TaskModal from "./Common/TaskModal";
import useFetchAllTasks from "../hooks/useFetchAllTasks";
import LoadingComponent from "./Common/LoadingComponent";
import { Task } from "../context/DataProvider";
import { useParams } from "react-router-dom";



const TaskList = () => {
  const { tasksData } = useDataProvider();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [createTaskModalVisible, setCreateTaskModalVisible] = useState(false);
  const {boardID} = useParams();


  const handleClick = (task: Task) => {
    setModalVisible(true);
    setSelectedTask(task);
  };
  const { tasks } = useFetchAllTasks("boardTask");
  const { todoTasks, doingTasks, doneTasks } = tasks;

  return (
    <div className="flex flex-col w-full  p-4 font-poppins">
      <div className="px-8">
        <h1 className="text-2xl text-black font-semibold font-poppins">
          Task Lists
        </h1>
      </div>
      <div className=" text-black  h-[calc(100vh-4rem)] overflow-y-scroll relative px-4 grid lg:grid-cols-3 gap-x-1 md:grid-cols-2 grid-cols-1">
        {(tasksData && tasksData.length > 0) ||
        (tasksData?.length == 0 ) ? (
          <>
            <div className="  bg-red-500/5 h-fit m-4 flex flex-col  px-2 justify-start rounded-xl">
              <div className="flex flex-row items-center  px-4 py-2">
                <div className={`h-3 w-3 rounded-full ${"bg-red-500"}`}></div>
                <h2 className="font-semibold text-lg px-3 ">
                  Todo ({todoTasks?.length}){" "}
                </h2>
              </div>
              {todoTasks?.map((task: Task) => (
                <TaskBox handleClick={handleClick} key={task._id} task={task} />
              ))}
              <Button
                onClick={() =>
                  setCreateTaskModalVisible(!createTaskModalVisible)
                }
                style="shadow-xl rounded-xl bg-primary text-white"
              >
                + Add task
              </Button>
            </div>
            <div className="bg-yellow-500/5 h-fit  m-4 flex flex-col  px-2 justify-start rounded-xl">
              <div className="flex flex-row items-center  px-4 py-2">
                <div
                  className={`h-3 w-3 rounded-full ${"bg-yellow-500"}`}
                ></div>
                <h2 className="font-semibold text-lg px-3">
                  Doing ({doingTasks?.length})
                </h2>
              </div>
              {doingTasks?.map((task: Task) => (
                <TaskBox handleClick={handleClick} key={task._id} task={task} />
              ))}
            </div>
            <div className="bg-green-500/5 h-fit m-4 flex flex-col  px-2 justify-start rounded-xl">
              <div className="flex flex-row items-center jutify-center px-4 py-2">
                <div className={`h-3 w-3 rounded-full ${"bg-green-500"}`}></div>
                <h2 className="font-semibold text-lg px-3">
                  Done ({doneTasks?.length})
                </h2>
              </div>
              {doneTasks?.map((task: Task) => (
                <TaskBox handleClick={handleClick} key={task._id} task={task} />
              ))}
            </div>
          </>
        ) : (
          <div>
            <LoadingComponent content="Loading Tasks" />
          </div>
        )}
      </div>
      {modalVisible && (
        <UpdateTaskModal
        boardID = {boardID ? boardID : ""} 
          setModalVisible={setModalVisible}
          selectedTask={selectedTask}
        />
      )}
      {createTaskModalVisible &&  (
        <TaskModal setModalVisible={setCreateTaskModalVisible} boardID = {boardID ? boardID : ""}  />
      )}
    </div>
  );
};

export default TaskList;
