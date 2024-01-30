import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import './Signup.css'
import AuthContext from './context/AuthProvide';
import axios from './api/axios';

function Loginpage() {
    const { setAuth } = useContext(AuthContext)
   const userRef = useRef()
   const errRef = useRef()

   const [user, setUser] = useState('')
   const [pwd, setPwd] = useState('')
   const [errMsg, setErrMsg] = useState('')
   const [success, setSuccess] = useState(false)
   const [loginMsg, setLoginMsg] = useState('')
   const [failedLogin, setFailedLogin] = useState('')

   useEffect(()=>{
    userRef.current.focus();
   }, [])

   useEffect(()=>{
    setErrMsg('')
   }, [user, pwd])

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const loginDetails = {email: user.trim(), password: pwd.trim() }
        console.log('details', loginDetails);
        setAuth(loginDetails);
       
        
  
        fetch('http://localhost:5000/auth', {
          method: 'POST',
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(loginDetails)
        }).then(async(res) => {
          try {
            console.log(res);
         const response =  await res.json()
        
         console.log('yoohoo', response);
         if (res.ok) {
           setUser('')
           setPwd('')
           setLoginMsg(response)
           setSuccess(true) 

         } else {
          setFailedLogin(response)
          setSuccess(false)
         }
      
         
        }catch (error) {
          console.log(error);
          setSuccess(false)
        }
          
        })
        
      } catch (error) {
        if (!error?.response) {
            setErrMsg('No server response')

        } else if (error.response?.status === 500){
            setErrMsg('Missing Email or Password')
        } else if (error.response?.status === 401){
            setErrMsg('Unauthorised')
        } else {
            setErrMsg('Login failed')
        }
      }
     
   }

  return (
    <div className='flex justify-center items-center bg-blue-500 h-[100vh]'>
    {success ? (
        <section>
            <h1>{loginMsg}</h1>
            
            <br />
            <p>
                <a href="#">Go to Home</a>
            </p>
        </section>
    ) : (
        <section>
          
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <div className='w-full bg-red-600 text-xs'>
            <h1>{failedLogin}</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
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