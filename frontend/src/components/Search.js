import React, { useContext, useState } from 'react'
import "./styles.css"
import {  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc, } from "firebase/firestore";
import { db } from "../Firebase";
import { AuthContext } from "../Context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentuser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        {setUser(null); setErr(true)}// Set user state to null when no documents are found
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
          setErr(false)
        });
      }
    } catch (err) {
      setErr(true);
      setUser(null)
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentuser.uid > user.uid
        ? currentuser.uid + user.uid
        : user.uid + currentuser.uid;
        console.log(combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
 
      if (!res.exists()) {
        //create a chat in chats collection
        console.log("not found")
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentuser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentuser.uid,
            displayName: currentuser.displayName,
            photoURL: currentuser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      console.log("here")
    } catch (err) {
      
    }

    setUser(null);
    setUsername("")
  };
  return (
    <div>
      <div className="searchbar">
        <input type="text" placeholder="Find a User"   onKeyDown={handleKey}
          onChange={(e) => {setUsername(e.target.value)}}
          value={username}/>
      </div>
      {err && <span className="msgpart searchmsg"style={{backgroundColor:'white',padding:'1rem',zIndex:'99'}}  onClick={()=>setErr(false)}>User not found!</span>}
      {user!=null && (
        <div className="msgpart searchmsg"  onClick={handleSelect}>
          <div className="msgimg">
          <img src={user.photoURL} alt="" />
          </div>
          
          <div className="msgdetails">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
