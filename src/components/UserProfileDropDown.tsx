import Button from './Button';
import SignoutIcon from './svgs/SignoutIcon';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from './svgs/ProfileIcon';
import useAuthProvider from '../hooks/useAuthProvider';
import { replace } from 'formik';

const UserProfileDropDown = () => {
    const navigate = useNavigate();
    const {logout} = useAuthProvider();
  return (
    <div className="bg-black/10 rounded-lg absolute h-fit w-11/12 mx-2 -top-24 shadow-2xl">
    <Button
      style="w-full bg-black/5 text-black/50 flex flex-row justify-center gap-x-2 text-sm hover:bg-black/10"
      onClick={() => {
        logout();
        navigate("/login",{replace:true});
      }}
    >
      <div>
     <SignoutIcon/>
      </div>
      Signout
    </Button>
    <Button
      style="w-full bg-black/5 text-black/50 text-sm flex flex-row items-center justify-center gap-x-2 hover:bg-black/10"
      onClick={() => {
        //   localStorage.removeItem("token");
        //   window.location.reload();
        navigate("/profile");
      }}
    >
      <div>
      <ProfileIcon/>
      </div>
      Profile
    </Button>
  </div>
  )
}

export default UserProfileDropDown;