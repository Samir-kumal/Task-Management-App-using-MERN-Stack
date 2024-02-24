import { memo } from "react";
const LoadingComponent = memo(() => {
  return (
    <div className=" flex flex-row items-center justify-center gap-x-2">
      <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      <p className="text-xs">Loading</p>
    </div>
  );
});

export default LoadingComponent;
