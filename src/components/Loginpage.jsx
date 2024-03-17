import React, { useCallback } from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Signup.css";
import useAuth from "../hooks/useAuth";
import Cookies from "js-cookie";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Loginpage() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const locate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [loginMsg, setLoginMsg] = useState("");
  const [failedLogin, setFailedLogin] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //  useEffect(()=> {
  //   setUser(EMAIL_REGEX.test(user))
  //  }, [user])

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  
  
 const click = useCallback((e)=> {
  e.preventDefault()
   const HandleNavigate = (path) => {
     locate(path);
     
   };
HandleNavigate('/signup')
 }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginDetails = { email: user.trim(), password: pwd.trim() };
      console.log("details", loginDetails);
      setAuth(loginDetails);

      fetch("http://localhost:5000/auth", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        withCredentials: true,
        credentials: "include",
        body: JSON.stringify(loginDetails),
      }).then(async (res) => {
        try {
          const response = await res.json();

          console.log("yoohoo", response);
          if (res.ok) {
            const cookie = Cookies.get("seddfcfcfcfcfcgygytrerrer");
            console.log(cookie);
            setUser("");
            setPwd("");
            setLoginMsg(response);
            navigate(from, { replace: true });
            setAuth(response);
          } else {
            setFailedLogin(response);
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 500) {
        setErrMsg("Missing Email or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorised");
      } else {
        setErrMsg("Login failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-white h-[100vh]">
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <div className="w-full bg-red-600 text-xs">
          <h1>{failedLogin}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="username"
            className="text-black"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="text-black"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button className="bg-white text-black mt-7 h-8">Sign In</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            {/*put router link here*/}
            <div className="underline cursor-pointer" onClick={click}>
              Sign Up
            </div>
          </span>
        </p>
      </section>
    </div>
  );
}

export default Loginpage;
