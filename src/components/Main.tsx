import SideBar from "./SideBar";
import TaskList from "./TaskLists";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import useDataProvider from "../hooks/useDataProvider";
import useAuthProvider from "../hooks/useAuthProvider";
import useFetchAllTasks from "../hooks/useFetchAllTasks";
import { useLocation } from "react-router-dom";
import { Paper } from "@mui/material";
function CircularProgressWithLabel(
  props: CircularProgressProps & { type: string; value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        color={props.type === "success" ? "primary" : "error"}
        size={70}
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const Main = () => {
  const [progress, setProgress] = useState(10);
  // const {getAllTaskItems} = useDataProvider();
  const {tasks, tasksPercentage} = useFetchAllTasks("allTasks");
  const {todoTasks, doingTasks, doneTasks} = tasks;
  const { todoTasksPercentage, doingTasksPercentage} = tasksPercentage;
 

  return (
    <div className="flex flex-row ">
      {/* <TaskList /> */}
      <div className="flex flex-col items-center  gap-y-6 mt-8">
        <section className="flex justify-center gap-x-10">
          <div className="h-32 w-60 bg-blue-300 rounded-xl flex flex-row items-center justify-center">
            <CircularProgressWithLabel type={"success"} value={doingTasksPercentage? doingTasksPercentage: 0} />
            <div className="flex flex-col items-center text-black justify-center">
              <h2>This week</h2>
              <h1 className="text-3xl font-bold">{doingTasks?.length}</h1>
              <h3>Ongoing task</h3>
            </div>
          </div>
          <div className="h-32 w-60 bg-red-500/20 flex flex-row items-center justify-center rounded-xl">
            <CircularProgressWithLabel type={"error"} value={todoTasksPercentage ? todoTasksPercentage : 0} />
            <div className="flex flex-col text-black items-center justify-center">
              <h2>TODO</h2>
              <h1 className="text-3xl font-bold">{todoTasks?.length}</h1>
              <h3>Pending task</h3>
            </div>
          </div>
          <div className="h-32 w-60 bg-green-400/90 rounded-xl flex flex-col items-center justify-center ">
            <h1 className="text-white">Task Completed</h1>
            <h1 className="text-white text-3xl font-bold">{doneTasks?.length}</h1>
            <h1 className="text-white ">Well done</h1>
          </div>
        </section>
        <section className="w-full flex flex-row gap-x-6 justify-between">
          <Paper className="h-fit w-full bg-white rounded-xl p-4">
            <h1>Peformance Chart</h1>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={500}
              height={150}
            />
          </Paper>
          <div className="h-40 w-1/2 bg-white rounded-xl">Schedule</div>
        </section>
        <Paper   className="w-full h-40 rounded-2xl bg-white p-4">
          Task
          <LinearProgressWithLabel value={progress} />
        </Paper>
      </div>
    </div>
  );
};

export default Main;
