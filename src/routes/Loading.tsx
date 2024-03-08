import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthProvider from "../hooks/useAuthProvider";
const Loading = () => {
  const navigate = useNavigate();
  const {token} = useAuthProvider();
  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 3000);
    } else {
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    }
  }, []);
  return (
    <div className="h-lvh  w-lvw bg-white flex flex-row items-center justify-center">
      <Player
        autoplay
        loop
        src="https://lottie.host/9a68572d-aca6-44a2-92f3-09b0a9249570/03YthDAahM.json"
        style={{ height: "300px", width: "300px" }}
      ></Player>
    </div>
  );
};

export default Loading;
