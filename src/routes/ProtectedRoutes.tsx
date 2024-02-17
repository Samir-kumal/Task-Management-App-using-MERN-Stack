import { PropsWithChildren, useEffect } from "react";
import useAuthProvider from "../hooks/useAuthProvider";
import { useNavigate } from "react-router-dom";

type ProtectedRoutesProps = PropsWithChildren;
export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const { isLoggedIn } = useAuthProvider();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login",{replace:true});
    } 
  }, [isLoggedIn, navigate]);
  return children;
}
