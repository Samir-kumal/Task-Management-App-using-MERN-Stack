import { memo } from "react";

interface NoItemsFoundProps {
  content: string;
  width?: string;
  height?: string;
}
const NoItemsFound: React.FC<NoItemsFoundProps> = memo(
  ({ content, width, height }) => {
    return (
      <div
        className={` ${width ? width : "w-[50vw]"} ${
          height ? height : "h-[50vh]"
        }  flex items-center justify-center`}
      >
        <p className="font-poppins font-semibold">{content}</p>
      </div>
    );
  }
);

export default NoItemsFound;
