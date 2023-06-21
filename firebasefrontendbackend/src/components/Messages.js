
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../Firebase";
import { AuthContext } from "../Context/AuthContext";
import "./styles.css"
import person5 from "../images/person5.jpg";
import person6 from "../images/person6.jpg";
import Message from "./Message.js"
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentuser } = useContext(AuthContext);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

const messagess=[
  /*{
    id:"owner",
    message:"Hello  background-color: #3c5050; background-color: #3c5050; background-color: #3c5050; background-color: #3c5050; background-color: #3c5050; background-color: #3c5050;,lorem loemrefjsfisifnismimfis;mifsofimsiofmsiofmsimfsiofmspfmdsifj this is me Bravo owner If you get the warning prop spreading is forbidden, click on the link and follow the instructions.",
    img:person5,
    picture:person6,
  },
  {
    id:"receiver",
    message:'If you get the warning prop spreading is forbidden, click on the link and follow the instructions.If you get the warning prop spreading is forbidden, click on the link and follow the instructions.If you get the warning prop spreading is forbidden, click on the link and follow the instructions.If you get the warning prop spreading is forbidden, click on the link and follow the instructions.',
    img:person6,
    picture:null,
  },
  {
    id:"owner",
    message:null,
    img:person5,
    picture:person6,
  },
  {
    id:"owner",
    message:"Hello , this is me Bravo owner",
    img:person5,
    picture:person6,
  },
  {
    id:"receiver",
    message:'This is Receiverend bravo',
    img:person6,
    picture:null,
  },*/

]

  return (
    <div  className="messages">
      {
        messages.map((e,i)=>
        {
          console.log(`${e.senderId===currentuser.uid && "owner"}`)
          return (
            <div >
                    <Message  key={i} prop={e}/>
            </div>
            
          )

        })
      }

      
    </div>
  )
}

export default Messages
