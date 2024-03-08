import { Priority, Task } from "../../context/DataProvider";

interface TaskBoxProps {
  task: {
    _id: string;
    status: string;
    title: string;
    content: string;
    priority: Priority;
  };
  handleClick: (task: Task) => void;
}

const TaskBox: React.FC<TaskBoxProps> = ({ task, handleClick }) => {
  return (
    <button
      onClick={() => handleClick(task)}
      className="mb-2 mx-auto relative bg-white shadow-xl m-2 w-full rounded-lg p-3"
    >
      <h3 className="text-md text-left font-semibold overflow-hidden px-2">
        {task.title}
      </h3>
      <p className="text-xs text-left text-gray-400  overflow-hidden px-2 ">
        {task.content}
      </p>
      <button 
        className={` btn btn-outline ${
          task.priority === "low"
            ? "btn-success"
            : task.priority === "normal"
            ? "btn-primary"
            : "btn-error"
        }  btn-xs text-[10px] absolute top-2 right-2`}
      >
        {task.priority}
      </button>
    </button>
  );
};

export default TaskBox;
