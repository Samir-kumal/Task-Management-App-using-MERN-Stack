import SideBar from "./SideBar";
import TaskList from "./TaskLists";

const Main = () => {
  return (
    <div className="flex flex-row bg-blue-100">
      <SideBar />
      <TaskList />
    </div>
  );
};

export default Main;
