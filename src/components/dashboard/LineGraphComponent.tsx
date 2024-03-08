import  { memo } from "react";
import { LineChart } from "@mui/x-charts";
import LoadingComponent from "../Common/LoadingComponent";
import taskLength from "../../helper/TasksLength";
import { Data } from "../../context/DataProvider";

const LineGraphComponent = memo(({ data }: { data: Data[] | null }) => {

  return (
    <section className="h-fit md:w-1/2 w-full m-auto bg-white rounded-xl p-4">
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
          height={150}
        />
      ) : (
        <LoadingComponent content="Loading Chart" height="h-32" width="w-full" />
      )}
    </section>
  );
});

export default LineGraphComponent;
