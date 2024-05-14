import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Signup.css";
import { BASE_URL } from "../constants";
import useAuth from "../hooks/useAuth";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Signup() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [enabled, setEnabled] = useState(false)

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const {setAuth} = useAuth()
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const click = useCallback((e) => {
    e.preventDefault();
    const HandleNavigate = (path) => {
      navigate(path);
    };
    HandleNavigate("/login");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {
      email: email.trim(),
      password: pwd.trim(),
    };
    setSuccess(true);
    console.log(userDetails);

    try {
      fetch(`${BASE_URL}/add-user`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userDetails),
    }).then(async (res) => {
      const response = await res.json();
      console.log("wababade", response);
      if (res.ok) {
        setAuth(response)
        navigate(from, { replace: true });
        console.log("new user added");
      } else {
        console.log('error');
      }
     
    });
    } catch (error) {
      console.log(error)
    }

    
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-blue-500">
      <div className="w-[400px] rounded p-5">
        {success ? (
          <section>
            <h1>Success!</h1>
            <p>
              <a onClick={click} className="underline cursor-pointer">Sign In</a>
            </p>
          </section>
        ) : (
          <section className="mt-[200px] mb-[200px]">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Sign Up</h1>
            <form>
              {/* <label htmlFor="username">
                Username:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validName || !user ? "hide" : "invalid"}
                />
              </label>
              <input
                type="text"
                id="username"
                className="txt-color"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p> */}

              <label htmlFor="email">
                Email:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validEmail ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validEmail || !email ? "hide" : "invalid"}
                />
              </label>
              <input
                type="text"
                id="email"
                className="txt-color"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Email must be of vaid format
                <br />
                Must look like email@example.com.
              </p>

              <label htmlFor="password">
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !pwd ? "hide" : "invalid"}
                />
              </label>
              <input
                type="password"
                id="password"
                className="txt-color"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>

              <label htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </label>
              <input
                type="password"
                id="confirm_pwd"
                className="txt-color"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>

              <button
                onClick={handleSubmit}
                disabled={!validPwd || !validMatch ? true : false}
                className={`bg-white text-black mt-7 h-8`}
              >
                Sign Up
              </button>
            </form>
            <p>
              Already signed up?
              <br />
              <span className="line">
                {/*put router link here*/}
                <a onClick={click} className="underline cursor-pointer">
                  Sign In
                </a>
              </span>
            </p>
          </section>
        )}
        {/* <div className='pt-5'>
        <p>First name</p>
         <div className='border w-full p-2 rounded'>
         <input className='outline-none w-full'
                type='text'
                ref={userRef}
                autoComplete='off'
                onChange={(e)=> setUser(e.target.value)}required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={()=> setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                placeholder='First name' />
         </div>
        </div>
        <div className='pt-3'>
        <p>Last name</p>
         <div className='border w-full p-2 rounded'>
         <input className=' outline-none w-full' placeholder='Last name' />
         </div>
        </div>
        <div className='pt-3'>
        <p>Email address</p>
         <div className='border w-full p-2 rounded'>
         <input className='outline-none w-full' placeholder='Email address' type='email' />
         </div>
        </div>
        <div className='pt-3'>
        <p>Password</p>
         <div className='border w-full p-2 rounded'>
         <input className=' outline-none w-full' placeholder='Password' type='password' />
         </div>
        </div>
        <button className='p-2 mt-7 bg-amber-100 rounded'>Create Account</button>
      */}{" "}
      </div>
    </div>
  );
}

export default Signup;
