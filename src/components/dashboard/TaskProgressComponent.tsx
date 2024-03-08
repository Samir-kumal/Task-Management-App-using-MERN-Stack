import { Data } from "../../context/DataProvider";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import taskLength from "../../helper/TasksLength";
import LoadingComponent from "../Common/LoadingComponent";
import NoItemsFound from "../Common/NoItemsFound";
const TaskProgressComponent = ({ data }: { data: Data[] | null }) => {
  const navigate = useNavigate();
  const boardTitle = "font-poppins font-bold text-md font-semibold mt-1 mb-2";
  const handleClick = () => {
    navigate("/dashboard/boards");
  };
  return (
    <section className="md:w-11/12 w-10/12 h-fit rounded-xl bg-white p-4 ">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-poppins font-bold text-xl">Task</h1>
        <Button onClick={handleClick} style="btn bg-primary btn-sm text-white">
          View All
        </Button>
      </div>

     {data && data.length > 0 ?  <div className="grid lg:grid-cols-3  md:grid-cols-2  grid-cols-1 w-full rounded-4xl    justify-start gap-x-20">
        <section className=" bg-white w-full">
          <h1 className={boardTitle}>Board Name</h1>
          {data && data.map((item) => <p key={item._id}>{item.title}</p>)}
        </section>
        <section className=" w-full">
          <h1 className={boardTitle}>Created</h1>
          {data &&
            data.map((item) => (
              <p  key={item._id}>{item.created.toString().split("T")[0]}</p>
            ))}
        </section>
        <section className=" w-full">
          <h1 className={boardTitle}>Task Progress</h1>
          <div className=" flex flex-col ">
            {data &&
            data.map((item) => {
              const { progress } = taskLength(item);

              // return <LinearProgressWithLabel key={item._id} value={progress} />;
              return (
               <div className = "flex flex-row  gap-x-2 ">
                 <progress
                key={item._id}
                  className="progress progress-primary  lg:w-full w-full mt-2"
                  value={progress}
                  max="100"
                ></progress>
                <p>{Math.round(progress)}%</p>
               </div>
                
              );
            })}
            </div>
        </section>
      </div>: data && data.length === 0 ? <NoItemsFound content="No Boards" width="w-full h-20"/> : 
      <LoadingComponent content="Loading Boards" height="h-20"/>
      
      }
    </section>
  );
};

export default TaskProgressComponent;
