
import { useLayoutEffect } from "react";
import useAuthProvider from "../hooks/useAuthProvider";


import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoutes() {
  const { isLoggedIn } = useAuthProvider();
  const location = useLocation();
  useLayoutEffect(()=>{
    window.scrollTo(0,0);
  },[location.pathname])
  return isLoggedIn  ? <Outlet context={isLoggedIn} /> : <Navigate to="/login" state={{from:location}}  replace />;
}
