import React from 'react'
import person6 from "../images/upload.jpg";
import "./styles.css"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext, useState } from "react";

import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../Firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text,setText]=useState("");
  const [img ,setImg]=useState(null);
  const {currentuser}=useContext(AuthContext)
  const {data}=useContext(ChatContext)
  const handlesend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentuser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          }).catch((err)=>console.log("Error"+err));
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentuser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentuser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  console.log(data.user.uid)
  return (
    <div>
      {
        data.user.uid && (<div className="chatinput">
        <input type="text" placeholder="Chat message" value={text} onChange={(e)=>setText(e.target.value)}/>
        <div className="send">
          <input type="file" style={{display:'none'}} id="file"  onChange={(e)=>setImg(e.target.files[0])}/>
          <label htmlFor="file">
            <img src={person6}  style={{height:'3rem',width:'3rem'}}/>
          </label>
          <button onClick={handlesend}>Send</button>
        </div>
      </div>)
      }
        
    </div>
  )
}

export default Input
