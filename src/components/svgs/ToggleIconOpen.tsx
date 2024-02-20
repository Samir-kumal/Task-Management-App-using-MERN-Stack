export interface ToggleIconProps {
  height?: number;
  width?: number;
  fill?: string;
}
const ToggleIconOpen: React.FC<ToggleIconProps> = ({ height, width, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "26"}
      height={width ? width : "26"}
      viewBox="0 0 56 56"
      fill="none"
    >
      <rect
        x="56"
        y="56"
        width="56"
        height="56"
        rx="28"
        transform="matrix(-1 0 0 -1 112 112)"
        fill="#7994F2"
      />
      <path
        d="M23.7577 21.2051L31.0998 28.5632L23.7577 35.9213L26.018 38.1817L35.6365 28.5632L26.018 18.9448L23.7577 21.2051Z"
        fill={fill ? fill : "white"}
      />
    </svg>
  );
};

export default ToggleIconOpen;
