import React, { useEffect, useState } from "react";

const ClockComponent = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    useEffect(()=>{
        const interval = setInterval(()=>{
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    })
  return (
    <div className="h-40 lg:w-1/2 md:w-1/2 w-full m-auto bg-white rounded-xl p-4 font-poppins font-semibold">
     <h1 className="text-xl"> Clock</h1>
      <div className = "w-full h-full flex flex-row items-start justify-start">
      <p className = "text-4xl  mt-6">
        {time}
      </p>
      </div>
    </div>
  );
};

export default ClockComponent;
