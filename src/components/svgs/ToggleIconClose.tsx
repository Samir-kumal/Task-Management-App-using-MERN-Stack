import { ToggleIconProps } from "./ToggleIconOpen";
import { memo } from "react";
const ToggleIconClose: React.FC<ToggleIconProps> = memo(
  ({ height, width, fill }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ? width : "26"}
        height={height ? width : "26"}
        viewBox="0 0 56 56"
        fill="none"
      >
        <rect width="56" height="56" rx="28" fill="#7994F2" />
        <path
          d="M32.2424 34.7947L24.9004 27.4366L32.2424 20.0785L29.9821 17.8182L20.3636 27.4366L29.9821 37.0551L32.2424 34.7947Z"
          fill={fill ? fill : "white"}
        />
      </svg>
    );
  }
);
export default ToggleIconClose;
