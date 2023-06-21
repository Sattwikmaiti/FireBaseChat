import React,{useContext} from 'react'
import "./styles.css"
import person1 from "../images/person1.jpg";
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import {auth} from "../Firebase.js"
import { AuthContext } from '../Context/AuthContext';
const Navbar = () => {
  const {currentuser}=useContext(AuthContext)
  //console.log(currentuser)
  const navigate=useNavigate()
  return (
    <div>
      <div className="navbar">
              <div className="websitename">
                     Connecticut
              </div>
              <div className="navbarinfo">
                <div className="navimg">
                      <img src={currentuser.photoURL} alt=""/>
                </div>
                <div className="navnam">
                  {currentuser.displayName}

                </div>
                <button className="logbutton" onClick={()=>{signOut(auth);navigate('/login')}} >
                      Logout
                </button>
              </div>
    </div>
    </div>
  )
}

export default Navbar
