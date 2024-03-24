import { Task } from "../../context/DataProvider";
import useDataProvider from "../../hooks/useDataProvider";

const HighPriorityTasks = () => {
  const { allTasks } = useDataProvider();
  const highPriorityTasks = allTasks?.filter(
    (task) => task.priority === "high"
  );
  return (
    <div className="bg-white h-full p-3 rounded-xl">
      <h2 className="font-bold my-2 text-lg text-red-500">
        High Priority Tasks
      </h2>
      <div className=" h-36 overflow-y-scroll flex flex-col gap-y-3 overflow-scroll scroll">
        {highPriorityTasks && highPriorityTasks?.length > 0 ? (
          highPriorityTasks?.map((task: Task) => (
            <div
              className="bg-red-100 flex items-center gap-x-2   rounded-md  p-2"
              key={task._id}
            >
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <h3 className="text-xs line-clamp-1"> {task.title}</h3>
              {/* <p className="text-xs text-gray-400 line-clamp-1">
                {task.content}
              </p> */}
            </div>
          ))
        ) : (
          <p className="text-xs text-center opacity-50 my-6">
            No high priority tasks
          </p>
        )}
      </div>
    </div>
  );
};

export default HighPriorityTasks;
