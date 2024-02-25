import { useState } from "react";
import Button from "./Button";
import CreateTaskModal from "./Common/TaskModal";
import useDataProvider from "../hooks/useDataProvider";

const NavBar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { boardID } = useDataProvider();

  return (
    <div className="h-16 w-full shadow-2xl flex flex-row justify-between px-3 items-center">
      <div className="flex flex-row items-center">
        <div>
          <img
            src="https://img.icons8.com/ios/452/task.png"
            alt="task"
            className="h-6 w-6"
          />
        </div>
        <h1 className="font-bold lg:text-[16px] font-mono ">
          Task Management App
        </h1>
      </div>
      <div>
        <Button
          disabled={!boardID}
          style={`rounded-full text-xs p-3 ${
            !boardID ? "bg-black/50" : "bg-primary text-white"
          }`}
          onClick={() => setModalVisible(true)}
        >
          <p className="lg:flex md:flex sm:flex xs:flex hidden">
            {" "}
            + Add new Task
          </p>
          <p className="xs:hidden sm:hidden md:hidden lg:hidden flex">+Add</p>
        </Button>
      </div>
      {modalVisible && <CreateTaskModal setModalVisible={setModalVisible} />}
    </div>
  );
};

export default NavBar;
