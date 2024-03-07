import Button from "./Button";
import SignoutIcon from "./svgs/SignoutIcon";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "./svgs/ProfileIcon";
import useAuthProvider from "../hooks/useAuthProvider";
import { useEffect, useRef } from "react";

const UserProfileDropDown = () => {
  const navigate = useNavigate();
  const { logout } = useAuthProvider();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        ref.current.style.display = "none";
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <div
      ref={ref}
      className="bg-white rounded-lg  h-fit w-fit mx-2 -top-28 shadow-2xl"
    >
      <Button
        style="w-full  text-black/90 border-b-2 border-black/10 py-4 flex flex-row justify-center gap-x-2 text-sm hover:bg-black/10 rounded-lg"
        onClick={() => {
          logout();
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 2000);
        }}
      >
        <>
          <SignoutIcon />
        </>
        Signout
      </Button>
      <Button
        style="lg:w-32 md:w-32 w-10/12    text-black/90 text-sm flex flex-row items-center justify-center gap-x-2 hover:bg-black/10 rounded-lg"
        onClick={() => {
          navigate("/profile");
        }}
      >
        <div>
          <ProfileIcon />
        </div>
        Profile
      </Button>
    </div>
  );
};

export default UserProfileDropDown;
