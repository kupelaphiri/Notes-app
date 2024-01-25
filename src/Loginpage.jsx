import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import './Signup.css'
import AuthContext from './context/AuthProvide';
// import axios from './api/axios';

function Loginpage() {
    const { setAuth } = useContext(AuthContext)
   const userRef = useRef()
   const errRef = useRef()

   const [user, setUser] = useState('')
   const [pwd, setPwd] = useState('')
   const [errMsg, setErrMsg] = useState('')
   const [success, setSuccess] = useState(false)

   useEffect(()=>{
    userRef.current.focus();
   }, [])

   useEffect(()=>{
    setErrMsg('')
   }, [user, pwd])

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(user, pwd);
      setUser('')
      setPwd('')
      setSuccess(true)
   }

  return (
    <div className='flex justify-center items-center bg-blue-500 h-[100vh]'>
    {success ? (
        <section>
            <h1>You are logged in!</h1>
            <br />
            <p>
                <a href="#">Go to Home</a>
            </p>
        </section>
    ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    className='text-black'
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
                    className='text-black'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button className='bg-white text-black mt-7 h-8'>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    {/*put router link here*/}
                    <a href="#" className='underline'>Sign Up</a>
                </span>
            </p>
        </section>
    )}
</div>
  )
}

export default Loginpage