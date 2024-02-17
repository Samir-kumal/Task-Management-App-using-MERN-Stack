import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    if (location.pathname === "/") {
        navigate("/login");
      }
  },[location.pathname,navigate])
  return (
    <div className=" w-lvw h-lvh bg-white flex items-center justify-center">
      <h1 className="text-6xl font-bold">Loading.....</h1>
    </div>
  );
};

export default Root;
