import { useEffect } from "react";
import useDataProvider from "../hooks/useDataProvider";
import useAuthProvider from "../hooks/useAuthProvider";
import useFetchAllTasks from "../hooks/useFetchAllTasks";
import TaskProgressComponent from "./dashboard/TaskProgressComponent";
import TaskTrackRecord from "./dashboard/TaskTrackRecord";
import ClockComponent from "./dashboard/ClockComponent";
import LineGraphComponent from "./dashboard/LineGraphComponent";

const Main = () => {
  const { getAllTaskItems, data, getBoardItems } = useDataProvider();
  const { token } = useAuthProvider();
  const { tasks, tasksPercentage } = useFetchAllTasks("allTasks");

  useEffect(() => {
    if (token) {
      getAllTaskItems(token);
      getBoardItems();
    }
  }, []);

  return (
    <div className=" w-full flex flex-row font-poppins ">
      <div className="w-full flex flex-col items-center  gap-y-6 mt-8">
        <TaskTrackRecord {...tasks} {...tasksPercentage} />
        <section className="md:w-11/12 w-10/12 flex lg:flex-row md:flex-row  flex-col md:gap-x-6 gap-6 justify-between">
          <LineGraphComponent data={data} />
          <ClockComponent />
        </section>
        <TaskProgressComponent data={data} />
      </div>
    </div>
  );
};

export default Main;
