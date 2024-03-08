import React, { memo } from "react";
import { IconProps } from "./DashboardIcon";

const TaskBoardsIcon: React.FC<IconProps> = memo(({ fill }) => {
  return (
    <svg
      width="21"
      height="18"
      viewBox="0 0 21 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.226929 0V17.5H17.851V8.525L15.3333 11.025V15H2.74466V2.5H11.7833L14.301 0H0.226929ZM17.851 0L10.2979 7.5L7.78012 5L5.26239 7.5L10.2979 12.5L20.3688 2.5L17.851 0Z"
        fill={fill ? fill : "black"}
      />
    </svg>
  );
});

export default TaskBoardsIcon;
