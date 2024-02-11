import { useLocation, Navigate } from "react-router-dom";
import useAuth from "./hooks/useOutsideClickDetector/useAuth";
import RootLayout from "./Layout/RootLayout";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthProvide";

const RequireAuth = ({children}) => {
  // const { auth, setAuth } = useAuth();
  const [auth, setAuth] = useState(null);
  console.log(auth);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // setAuth('lol')
  const getCookie = async () => {
  try {
    setLoading(true)
    const res = await fetch("http://localhost:5000/get-cookies", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      withCredentials: true,
      credentials: "include",
    });
    
    const response = await res.json()
              
    if (res.ok) {
       setAuth(response)
       console.log('auth', auth)
       
    } else {
        setAuth(null)
    }
    setLoading(false)
  } catch (error) {
    setLoading(false)
    
  }
  };
  useEffect(() => {
    getCookie()
  }, []);

  useEffect(() => {
    console.log("newauth", auth);
  }, [auth]);
  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <p>Loading</p>
      </div>
    );
  }
  return auth? (
      children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
