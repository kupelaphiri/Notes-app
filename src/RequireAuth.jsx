import { useLocation, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import RootLayout from "./Layout/RootLayout";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthProvide";

const RequireAuth = ({ children }) => {
  const { auth, setAuth } = useAuth();
  // const [auth, setAuth] = useState(null);

  console.log(auth);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // setAuth('lol')
  const getCookie = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_REACT_BASE_URL}/get-cookies`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
        withCredentials: true,
        credentials: "include",
      });

      const response = await res.json();

      if (res.ok) {
        const accessToken = response.accessToken;
        console.log("accessToken", accessToken);
        setAuth(response);

        console.log("auth", auth);
      } else {
        setAuth(null);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const refresh = await fetch(`${import.meta.env.VITE_REACT_BASE_URL}/refresh-token`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        withCredentials: true,
        credentials: "include",
      });

      const res = refresh.json();

      if (res.ok) {
        setAuth(res);
      } else {
        setAuth(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCookie();
  }, []);

  // useEffect(()=> {
  //  refreshToken()

  //  console.log('checking if this effect is running')
  // }, [auth])

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
  return auth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
