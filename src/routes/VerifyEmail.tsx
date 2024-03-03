import Email from "../assets/Images/email.png";
import { useEffect, useState } from "react";
import EmailVerify from "../assets/Images/email-verification-icon.png";
import { Player } from "@lottiefiles/react-lottie-player";

import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthProvider from "../hooks/useAuthProvider";
const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const emailToken = searchParams.get("emailToken");
  console.log(emailToken);
  const { verifyEmail } = useAuthProvider();

  const navigate = useNavigate();
  const verifyEmailToken = async () => {
    if (emailToken) {
      const result = await verifyEmail(emailToken);
      console.log(result?.message, result?.success);

      if (result?.success) {
        setIsVerified(true);
      }
    }
  };
  useEffect(() => {
    verifyEmailToken();
     const timeOut = setTimeout(() => {
        if(isVerified){
        navigate("/login");
      };
    },2000)
    

    return () =>clearTimeout(timeOut);

  }, [isVerified]);

  return (
    <div className="w-full h-lvh flex flex-row items-center  ">
      <div className="w-full h-full flex flex-col items-center gap-y-6 mt-20 ">
        <h1 className="text-6xl">Verify your email</h1>
        <p className="text-black/50 flex flex-row  items-center gap-x-2">
          Check your email & click the link to activate your account
          <img src={Email} alt="email" width={20} height={20} />
        </p>
        <img src={EmailVerify} alt="email" width={100} height={100} />
        {/* <Button style="border-2 border-primary font-bold">
            Go back
        </Button> */}
      </div>
      {isVerified && (
        <div className="inset-0 absolute bg-black/80 h-full w-full">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Player
              autoplay
              loop
              src="https://lottie.host/875fa04e-fd5a-4cb2-822f-ed7605a863b8/F4F047lzQB.json"
              style={{ height: "300px", width: "300px" }}
            ></Player>
            <h1 className="text-6xl text-white">Email Verified</h1>
            <p className="text-white">You can now login to your account</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
