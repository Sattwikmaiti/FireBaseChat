import {createContext,useState,useEffect} from "react"
import {auth} from "../Firebase.js"
import {onAuthStateChanged} from "firebase/auth"
export const AuthContext=createContext()

export const AuthContextProvider=({children})=>
{

    const [currentuser,setcurrentuser]=useState({})
useEffect(()=>{
   const run= onAuthStateChanged(auth,(user)=>
    {
        setcurrentuser(user);
        console.log(currentuser);

    })
    //clean up function to prevent memory
    return ()=>{
        run()
    }

},[])
   

return (
    <AuthContext.Provider value={{ currentuser }}>
      {children}
    </AuthContext.Provider>
  );
}