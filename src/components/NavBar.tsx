import { useState } from "react";
import Button from "./Button";
import useAuthProvider from "../hooks/useAuthProvider";
import UserProfileDropDown from "./UserProfileDropDown";
import Logo from "../assets/Images/TaskFlow.png"
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const {user} = useAuthProvider();
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate("/")
  }
 

  return (
    <>
    <div className="h-16 w-full font-poppins text-black bg-white  relative border-b-2 border-black/20 flex flex-row justify-between px-6 items-center">
      <div className="flex flex-row items-center">
        <div className="">
           <Button onClick={handleClick}>
          <img
            src={Logo}
            alt="task"
            className="h-10 w-auto"
          />
          </Button>
        </div>
       
      </div>
      <div className="">
        <Button
          
          style={`flex flex-row items-center gap-x-2`}
          onClick={() => setProfileModalVisible(!profileModalVisible)}
        >
          <p className="rounded-full text-sm  h-fit w-fit p-2 bg-primary text-white">
          
          {user && user.userName.includes(" ")
                  ? user?.userName[0] + " "+ user?.userName.split(" ")[1]?.[0]
                  : user?.userName[0]}
          </p>
          <p>
            {user?.userName}
          </p>
        </Button>
        {profileModalVisible && <div className="absolute right-2 -bottom-24 z-50"><UserProfileDropDown /></div>}
      </div>
      
    </div>
   
    </>
  );
};

export default NavBar;
