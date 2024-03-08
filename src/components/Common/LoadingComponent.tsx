import { memo } from "react";
interface LoadingComponentProps {
  content: string;
  width?: string;
  height?: string;
}
const LoadingComponent: React.FC<LoadingComponentProps> = memo(
  ({ content, width, height }) => {
    return (
      <div
        className={`${width ? width : "w-[50vw]"} ${height ? height : "h-[50vh]"} flex flex-row items-center justify-center gap-x-4 font-poppins`}
      >
        <span className="loading loading-bars bg-primary loading-lg"></span>
        <p>{content}</p>
      </div>
    );
  }
);

export default LoadingComponent;
