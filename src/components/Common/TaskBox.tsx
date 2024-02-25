import { Task } from "../TaskLists";

interface TaskBoxProps {
  task: {
    _id: string;
    status: string;
    title: string;
    content: string;
  };
  handleClick: (task: Task) => void;

}

const TaskBox:React.FC<TaskBoxProps> = ({ task,handleClick }) => {
  return (
    <button onClick={()=> handleClick(task)} className="mb-2 mx-auto bg-white shadow-xl m-2 w-full rounded-lg p-3">
      <h3 className="text-md text-left font-semibold">{task.title}</h3>
      <p className="text-xs text-left text-gray-400 px-2 overflow-hidden">{task.content}</p>
    </button>
  );
};

export default TaskBox;
