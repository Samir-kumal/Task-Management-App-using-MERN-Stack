import { useState } from "react";
import Button from "./Button";

const SideBar = () => {
  const [visible, setVisible] = useState(false);
  const handleToggle = () => {
    console.log("Toggle");
    setVisible((previous) => !previous);
  };
  return (
    <div
      className={` h-[calc(100vh-4rem)] w-40 bg-blue-300 relative transition-all ${
        visible ? "w-40" : "w-0"
      }`}
    >
      <Button
        style="absolute -right-8 top-1/2 rounded-full"
        onClick={handleToggle}
      >
        <p>Toggle</p>
      </Button>
    </div>
  );
};

export default SideBar;
