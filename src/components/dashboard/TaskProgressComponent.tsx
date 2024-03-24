import { Data } from "../../context/DataProvider";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import taskLength from "../../helper/TasksLength";
import LoadingComponent from "../Common/LoadingComponent";
import NoItemsFound from "../Common/NoItemsFound";
import { Fragment } from "react";
const TaskProgressComponent = ({ data }: { data: Data[] | null }) => {
  const navigate = useNavigate();
  const boardTitle = "font-poppins font-bold text-md font-semibold mt-1 mb-2";
  const handleClick = () => {
    navigate("/dashboard/boards");
  };
  return (
    <section className="md:w-11/12 w-10/12 h-fit rounded-xl bg-white p-4 ">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-poppins font-bold text-xl">Boards</h1>
        <Button onClick={handleClick} style="btn bg-primary btn-sm text-white">
          View All
        </Button>
      </div>

      {data && data.length > 0 ? (
        <div className="grid lg:grid-cols-3  md:grid-cols-2  grid-cols-1 w-full rounded-4xl    justify-start gap-x-20">
          <h1 className={boardTitle}>Board Name</h1>
          <h1 className={boardTitle}>Created</h1>
          <h1 className={boardTitle}>Task Progress</h1>
          {data &&
            data.slice(0,5).map((item) => {
              const { progress } = taskLength(item);

              return (
                <Fragment key={item._id}>
                  <p >{item.title}</p>
                  <p >{item.created.toString().split("T")[0]}</p>
                  <div className="flex flex-row  gap-x-2 ">
                    <progress
                      className="progress progress-primary  lg:w-full w-full mt-2"
                      value={progress}
                      max="100"
                    ></progress>
                    <p>{Math.round(progress)}%</p>
                  </div>
                </Fragment>
              );
            })}
        </div>
      ) : data && data.length === 0 ? (
        <div className="flex flex-col ">
          <NoItemsFound
            content="No Boards found Click  below to create one"
            width="w-full"
            height="h-20"
          />
          <button
            onClick={handleClick}
            className=" btn bg-primaryColor text-white mx-auto w-fit"
          >
            Go to boards
          </button>
        </div>
      ) : (
        <LoadingComponent content="Loading Boards" height="h-20" />
      )}
    </section>
  );
};

export default TaskProgressComponent;
