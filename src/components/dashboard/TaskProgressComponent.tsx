import React from "react";
import { Paper } from "@mui/material";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import { Data } from "../../context/DataProvider";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import taskLength from "../../helper/TasksLength";
const TaskProgressComponent = ({
  data,
}: {
  data: Data[] | null;
}) => {
    const navigate = useNavigate();
    const boardTitle = "font-poppins font-bold text-md font-semibold mt-1 mb-2"
    const handleClick = ()=>{
        navigate("/dashboard/boards")
    }
  return (
    <Paper className="w-full h-fit rounded-2xl bg-white p-4 ">
      <div className = "flex flex-row items-center justify-between">
        <h1 className="font-poppins font-bold text-xl">Task</h1>
        <Button onClick={handleClick} style="btn bg-primary btn-sm text-white">
            View All
        </Button>
      </div>
     
      <div className="flex lg:flex-row flex-col w-full   justify-start gap-x-20">
        <section className="lg:w-1/3 w-full">
          <h1 className={boardTitle}>Board Name</h1>
          {data && data.map((item) => <div key={item._id}>{item.title}</div>)}
        </section>
        <section className="lg:w-1/3 w-full">
          <h1 className={boardTitle}>Created</h1>
          {data &&
            data.map((item) => (
              <div key={item._id}>{item.created.toString().split("T")[0]}</div>
            ))}
        </section>
        <section className="lg:w-1/3 w-full">
          <h1 className={boardTitle}>Task Progress</h1>
          {data &&
            data.map((item) => {
                const {progress} = taskLength(item)
              
              return <LinearProgressWithLabel key={item._id} value={progress} />;
            })}
        </section>
      </div>
    </Paper>
  );
};

export default TaskProgressComponent;
