import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";




const useAuthProvider = ()=> {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthProvider must be used within an AuthProvider");
      }
      return context;
};

export default useAuthProvider;
