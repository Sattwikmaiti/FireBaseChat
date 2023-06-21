import React from 'react'
import "./styles.css"
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import {  Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

const Login = () => {
  const navigate=useNavigate()
  const [err, setErr] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[1].value;
    const password = e.target[2].value;
console.log(email+" "+password)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigate('/home')
      // ...
    })
    .catch((error) => {
      //const errorCode = error.code;
      //const errorMessage = error.message;
      alert(error.message)
      setErr(true)
    });
  };
  return (
    <div>
        <div className="registerbox">

            <form className="form" onSubmit={handleSubmit}>
                      <div className="formcomponent">
                      <input type="text" placeholder="UserName" />
                      </div>
               <div className="formcomponent">
               <input type="email" placeholder="email" />
               </div>
                <div className="formcomponent">
                <input type="password" placeholder="Enter Your Password" />
                </div>
               
                <div className="formcomponent">
                <button>Sign in</button>
                </div>
                
            </form>
            <p onClick={()=>navigate('/')}> Dont Have an Account ? Register</p>
            {err && <span>Something went wrong</span>}
        </div>
      
    </div>
  )
}

export default Login
