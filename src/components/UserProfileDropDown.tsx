import Button from "./Button";
import SignoutIcon from "./svgs/SignoutIcon";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "./svgs/ProfileIcon";
import useAuthProvider from "../hooks/useAuthProvider";

const UserProfileDropDown = () => {
  const navigate = useNavigate();
  const { logout } = useAuthProvider();
  return (
    <div className="bg-primary/40 rounded-lg  h-fit w-11/12 mx-2 -top-28 shadow-2xl">
      <Button
        style="w-full bg-black/5 text-black/90 border-b-2 border-black/10 py-4 flex flex-row justify-center gap-x-2 text-sm hover:bg-black/10"
        onClick={() => {
          logout();
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 2000);
        }}
      >
        <div>
          <SignoutIcon />
        </div>
        Signout
      </Button>
      <Button
        style="w-full bg-black/5 text-black/90 text-sm flex flex-row items-center justify-center gap-x-2 hover:bg-black/10"
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