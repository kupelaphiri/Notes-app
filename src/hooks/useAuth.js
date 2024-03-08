import { useContext } from "react";
import AuthContext from "../context/AuthProvide";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return { auth, setAuth };
};

export default useAuth;
