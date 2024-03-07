import React from "react";
import { Paper } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import LoadingComponent from "../Common/LoadingComponent";
import taskLength from "../../helper/TasksLength";
import { Data } from "../../context/DataProvider";

const LineGraphComponent = ({ data }: { data: Data[] | null }) => {
  return (
    <Paper className="h-fit w-full bg-white rounded-xl p-4">
      <h1 className="font-poppins font-semibold text-lg">Performance Chart</h1>
      {data ? (
        <LineChart
          series={[
            {
              data: data?.map((item) => item.tasks.length),
            },
          ]}
          xAxis={[
            {
              data: data?.map((item) => {
                const { completedTasks } = taskLength(item);
                return completedTasks;
              }),
            },
          ]}
          width={500}
          height={150}
        />
      ) : (
        <LoadingComponent />
      )}
    </Paper>
  );
};

export default LineGraphComponent;
