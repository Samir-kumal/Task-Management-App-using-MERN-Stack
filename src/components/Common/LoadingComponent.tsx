import { memo } from "react";
const LoadingComponent = memo(({ content }: { content: string }) => {
  return (
    <div className="w-[50vw]    h-[50vh] flex flex-row items-center justify-center gap-x-4 font-poppins">
      <span className="loading loading-bars bg-primary loading-lg"></span>
      {content}
    </div>
  );
});

export default LoadingComponent;
