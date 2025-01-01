import { useLocation, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "./constants";

const RequireAuth = ({ children }) => {
  const { auth, setAuth } = useAuth();

  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const getCookie = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/get-cookies`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
        withCredentials: true,
        credentials: "include",
      });

      const response = await res.json();

      if (res.ok) {
        setAuth(response);

      } else {
        setAuth(null);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // const refreshToken = async () => {
  //   try {
  //     const refresh = await fetch(`${BASE_URL}/refresh-token`, {
  //       method: "POST",
  //       headers: { "Content-type": "application/json" },
  //       withCredentials: true,
  //       credentials: "include",
  //     });

  //     const res = refresh.json();

  //     if (res.ok) {
  //       setAuth(res);
  //     } else {
  //       setAuth(null);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getCookie();
  }, []);

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
