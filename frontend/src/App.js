import React from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import Register from "./pages/Register.js"
import Login from "./pages/Login.js"
import Home from "./pages/Home.js"
import {useContext} from "react"
import {AuthContext} from "./Context/AuthContext.js"

import "./App.css"
const App = () => {
  const {currentuser}=useContext(AuthContext)
  console.log("00" +currentuser)

  const Protected=({children})=>
  {
    console.log(currentuser)
    //cant use useNavigate outside router component ...so we use Navigate
    if(!currentuser) return <Navigate to="/login" />
    
    return children

  }
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={
         <Protected>
          <Home />
          </Protected>
        
          
          }/>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
